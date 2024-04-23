// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

//test this

contract EnviFundtwo {
    uint private contractBalance;
    uint256 private projectId;
    string public mapKey;
    address[] public testInvestorArr;
    function toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }

        uint256 temp = value;
        uint256 digits;

        while (temp != 0) {
            digits++;
            temp /= 10;
        }

        bytes memory buffer = new bytes(digits);

        while (value != 0) {
            digits--;
            buffer[digits] = bytes1(uint8(48 + (value % 10)));
            value /= 10;
        }

        return string(buffer);
    }

    function toString(address _addr) internal pure returns (string memory) {
        bytes32 value = bytes32(uint256(uint160(_addr)));
        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(42);
        str[0] = "0";
        str[1] = "x";

        for (uint256 i = 0; i < 20; i++) {
            str[2 + i * 2] = alphabet[uint8(value[i + 12] >> 4)];
            str[3 + i * 2] = alphabet[uint8(value[i + 12] & 0x0f)];
        }

        return string(str);
    }

    //Given a projectId I want a list of investors;
    //uint256=>address[] mapping
    //however before adding to a particular uint256 I need to check if it is already there
    //Need to check i
    //So if (Set.map[project_id][msg.sender]==false) then add to ProjectToInvestors and set ==tru
    mapping(uint256 => mapping(address => bool)) public ProjectToInvestorDupmap;

    struct Project {
        uint256 projectId;
        string title;
        address owner;
        uint256 fundingGoal;
        uint currentBalance;
        uint lockedFunds;
        string description;
        string location;
        bool completionStatus;
        string imageUrL;
        string ownerEmail;
    }

    struct Updates {
        string update;
        string imageURL;
    }
    mapping(uint256 => Updates[]) public projectToUpdates;

    mapping(address => Project[]) public ownerToProjects;
    mapping(address => Project[]) public investorToProjects;

    mapping(uint256 => address[]) public ProjectToInvestors;

    mapping(string => bool) public investmentsFlag;
    mapping(uint256 => address) public ProjectsToOwner;
    Project[] public AllProjects;

    event ProjectCreated(uint256 projectId, address owner, uint256 fundingGoal);
    event ProjectFunded(uint256 projectId, address investor, uint256 amount);
    event FundsReleased(uint256 projectId, address investor, uint256 amount);

    function createProject(
        uint256 _fundingGoal,
        string memory _title,
        string memory _description,
        string memory _location,
        string memory _imageUrL,
        string memory _ownerEmail
    ) public returns (uint256, address, uint256, uint, string memory) {
        Project memory newProject;
        newProject.projectId = projectId;
        newProject.owner = msg.sender;
        newProject.fundingGoal = _fundingGoal;
        newProject.title = _title;
        newProject.description = _description;
        newProject.location = _location;
        newProject.ownerEmail = _ownerEmail;
        newProject.imageUrL = _imageUrL;
        projectId++;

        ownerToProjects[msg.sender].push(newProject);
        ProjectsToOwner[newProject.projectId] = msg.sender;
        AllProjects.push(newProject);
        emit ProjectCreated(projectId, msg.sender, _fundingGoal);

        return (
            newProject.projectId,
            newProject.owner,
            newProject.fundingGoal,
            newProject.currentBalance,
            newProject.title
        );
    }

    function giveUpdate(
        uint256 _projectId,
        string memory _update,
        string memory _imageUrl
    ) public {
        Updates memory newUpdate;
        newUpdate.update = _update;
        newUpdate.imageURL = _imageUrl;
        projectToUpdates[_projectId].push(newUpdate);
    }

    function getUpdatesByProject(
        uint256 _projectId
    ) external view returns (Updates[] memory) {
        return projectToUpdates[_projectId];
    }
    function getAllProjectsByOwner(
        address _owner
    ) external view returns (Project[] memory) {
        return ownerToProjects[_owner];
    }

    //for public and investor view
    function getAllProjects() external view returns (Project[] memory) {
        return AllProjects;
    }

    function getProjectbyId(
        uint256 _projectId
    ) external view returns (Project memory) {
        return AllProjects[_projectId];
    }

    // FUND LOGIC STARTS HERE
    mapping(address => mapping(uint256 => uint256))
        public investorToProjIdToLocked;

    mapping(address => mapping(uint256 => uint256))
        public investorToProjIdFunds;
    function fundProject(uint256 _projectId) public payable {
        require(_projectId < AllProjects.length, "Invalid project ID");

        Project storage project = AllProjects[_projectId];
        require(msg.value > 0, "Invalid investment amount");

        uint256 amountToOwner = msg.value / 2;
        uint256 amountToContract = msg.value - amountToOwner;
        investorToProjIdToLocked[msg.sender][_projectId] += amountToContract;
        investorToProjIdFunds[msg.sender][_projectId] += amountToOwner;

        // Transfer funds to owner
        payable(project.owner).transfer(amountToOwner);

        Project[] storage arr = ownerToProjects[project.owner];
        for (uint256 i = 0; i < arr.length; i++) {
            if (arr[i].projectId == _projectId) {
                arr[i].currentBalance += amountToOwner;
                arr[i].lockedFunds += amountToContract;
            }
        }
        project.currentBalance += amountToOwner;

        if (!ProjectToInvestorDupmap[_projectId][msg.sender]) {
            ProjectToInvestors[_projectId].push(msg.sender);
            ProjectToInvestorDupmap[_projectId][msg.sender] = true;
        }
        // Lock funds in contract
        project.lockedFunds += amountToContract;
        string memory tempKey = string.concat(
            toString(msg.sender),
            toString(_projectId)
        );
        mapKey = tempKey;
        if (!investmentsFlag[tempKey]) {
            //is investor investing on a project for the first time
            investmentsFlag[tempKey] = true;
            investorToProjects[msg.sender].push(project);
            investorToProjects[msg.sender][
                investorToProjects[msg.sender].length - 1
            ].currentBalance = amountToOwner;
            investorToProjects[msg.sender][
                investorToProjects[msg.sender].length - 1
            ].lockedFunds = amountToContract;
        } else {
            Project[] storage arr1 = investorToProjects[msg.sender];
            for (uint256 i = 0; i < arr1.length; i++) {
                if (arr1[i].projectId == _projectId) {
                    arr1[i].currentBalance += amountToOwner;
                    arr1[i].lockedFunds += amountToContract;
                }
            }
        }

        // Emit event
        emit ProjectFunded(_projectId, msg.sender, msg.value);
    }

    function withdraw(uint256 _projectId) public {
        require(_projectId < AllProjects.length, "Invalid Project ID");

        uint lockedAmountToResend = investorToProjIdToLocked[msg.sender][
            _projectId
        ];
        Project storage project = AllProjects[_projectId];

        require(lockedAmountToResend > 0, "No locked funds for this project");
        payable(msg.sender).transfer(lockedAmountToResend);

        Project[] storage arr = ownerToProjects[project.owner];
        for (uint256 i = 0; i < arr.length; i++) {
            if (arr[i].projectId == _projectId) {
                arr[i].lockedFunds -= lockedAmountToResend;
            }
        }

        Project[] storage arr1 = investorToProjects[msg.sender];

        project.lockedFunds -= lockedAmountToResend;

        for (uint256 i = 0; i < arr1.length; i++) {
            if (arr1[i].projectId == _projectId) {
                arr1[i].lockedFunds -= lockedAmountToResend;
            }
        }
        investorToProjIdToLocked[msg.sender][_projectId] = 0;
        emit FundsReleased(_projectId, msg.sender, lockedAmountToResend);
    }

    function releaseLockedFunds(uint256 _projectId) public {
        require(_projectId < AllProjects.length, "Invalid Project ID");
        uint lockedAmountToRelease = investorToProjIdToLocked[msg.sender][
            _projectId
        ];
        address ownerAddress = ProjectsToOwner[_projectId];
        Project storage project = AllProjects[_projectId];
        require(lockedAmountToRelease > 0, "No locked funds for this project");
        payable(ownerAddress).transfer(lockedAmountToRelease);

        Project[] storage arr = ownerToProjects[project.owner];
        for (uint256 i = 0; i < arr.length; i++) {
            if (arr[i].projectId == _projectId) {
                arr[i].lockedFunds -= lockedAmountToRelease;
            }
        }
        Project[] storage arr1 = investorToProjects[msg.sender];

        project.lockedFunds -= lockedAmountToRelease;

        for (uint256 i = 0; i < arr1.length; i++) {
            if (arr1[i].projectId == _projectId) {
                arr1[i].lockedFunds -= lockedAmountToRelease;
            }
        }
        investorToProjIdToLocked[msg.sender][_projectId] = 0;
        emit FundsReleased(_projectId, msg.sender, lockedAmountToRelease);
    }

    function getAllInvestmentsByOwner(
        address owner_Address
    ) public view returns (Project[] memory) {
        return investorToProjects[owner_Address];
    }
    //return investor and how much they have funded
    function getAllInvestorsByProject(
        uint256 _projectId
    ) public view returns (address[] memory) {
        return ProjectToInvestors[_projectId];
    }

    function getInvestorFundingForProject(
        address investor_address,
        uint256 _projectId
    ) public view returns (uint256, uint256) {
        uint256 funded = investorToProjIdFunds[investor_address][_projectId];
        uint256 locked = investorToProjIdToLocked[investor_address][_projectId];
        return (funded, locked);
    }
}
