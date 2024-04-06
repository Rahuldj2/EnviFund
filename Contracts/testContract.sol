// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract EnviFund {
    uint private contractBalance;
    uint256 private projectId;
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

    struct Project {
        uint256 projectId;
        string title;
        address owner;
        uint256 fundingGoal;
        uint currentBalance;
        uint lockedFunds;
        address[] investors;
    }

    mapping(address => Project[]) public ownerToProjects;
    mapping(address => Project[]) public investorToProjects;
    mapping(string => bool) public investmentsFlag;
    Project[] public AllProjects;

    event ProjectCreated(uint256 projectId, address owner, uint256 fundingGoal);
    event ProjectFunded(uint256 projectId, address investor, uint256 amount);
    event FundsReleased(uint256 projectId, address investor, uint256 amount);

    function createProject(
        uint256 _fundingGoal,
        string memory _title
    ) public returns (uint256, address, uint256, uint, string memory) {
        Project memory newProject;
        newProject.projectId = projectId;
        newProject.owner = msg.sender;
        newProject.fundingGoal = _fundingGoal;
        newProject.title = _title;
        projectId++;

        ownerToProjects[msg.sender].push(newProject);
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

    function getAllProjectsByOwner(
        address _owner
    ) external view returns (Project[] memory) {
        return ownerToProjects[_owner];
    }

    //for public and investor view
    function getAllProjects() external view returns (Project[] memory) {
        return AllProjects;
    }

    mapping(address => mapping(uint256 => uint256))
        public investorToProjIdToLocked;

    function fundProject(uint256 _projectId) public payable {
        require(_projectId < AllProjects.length, "Invalid project ID");

        Project storage project = AllProjects[_projectId];
        require(msg.value > 0, "Invalid investment amount");

        uint256 amountToOwner = msg.value / 2;
        uint256 amountToContract = msg.value - amountToOwner;
        investorToProjIdToLocked[msg.sender][_projectId] += amountToContract;

        // Transfer funds to owner
        payable(project.owner).transfer(amountToOwner);
        project.currentBalance += amountToOwner;

        // Lock funds in contract
        project.lockedFunds += amountToContract;
        string memory tempKey = string.concat(
            toString(msg.sender),
            toString(_projectId)
        );
        if (!investmentsFlag[tempKey]) {
            investmentsFlag[tempKey] = true;
            investorToProjects[msg.sender].push(project);
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

        project.lockedFunds -= lockedAmountToResend;
        emit FundsReleased(_projectId, msg.sender, lockedAmountToResend);
    }
    function getAllInvestmentsByOwner(
        address owner_Address
    ) public view returns (Project[] memory) {
        return investorToProjects[owner_Address];
    }
}
