// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract EnviFund {
    uint private contractBalance;
    uint256 private projectId;

    struct Project {
        uint256 projectId;
        address owner;
        uint256 fundingGoal;
        uint currentBalance;
        uint lockedFunds;
        address[] investors;
    }

    mapping(address => Project[]) public ownerToProjects;
    mapping(address => Project[]) public investorToProjects;
    Project[] public AllProjects;

    event ProjectCreated(uint256 projectId, address owner, uint256 fundingGoal);
    event ProjectFunded(uint256 projectId, address investor, uint256 amount);
    event FundsReleased(uint256 projectId, address investor, uint256 amount);

    function createProject(
        uint256 _fundingGoal
    ) public returns (uint256, address, uint256, uint) {
        Project memory newProject;
        newProject.projectId = projectId;
        newProject.owner = msg.sender;
        newProject.fundingGoal = _fundingGoal;
        projectId++;

        ownerToProjects[msg.sender].push(newProject);
        AllProjects.push(newProject);
        emit ProjectCreated(projectId, msg.sender, _fundingGoal);

        return (
            newProject.projectId,
            newProject.owner,
            newProject.fundingGoal,
            newProject.currentBalance
        );
    }

    function getAllProjectsByOwner(
        address _owner
    ) public view returns (Project[] memory) {
        return ownerToProjects[_owner];
    }

    //for public and investor view
    function getAllProjects() public view returns (Project[] memory) {
        return AllProjects;
    }

    function fundProject(uint256 _projectId) public payable {
        require(_projectId < AllProjects.length, "Invalid project ID");

        Project storage project = AllProjects[_projectId];
        require(msg.value > 0, "Invalid investment amount");

        uint256 amountToOwner = msg.value / 2;
        uint256 amountToContract = msg.value - amountToOwner;

        // Transfer funds to owner
        payable(project.owner).transfer(amountToOwner);
        project.currentBalance += amountToOwner;

        // Lock funds in contract
        project.lockedFunds += amountToContract;

        // Emit event
        emit ProjectFunded(_projectId, msg.sender, msg.value);
    }

    function withdraw(uint256 _projectId) public {
        require(_projectId < AllProjects.length, "Invalid project ID");

        Project storage project = AllProjects[_projectId];
        uint256 lockedFunds = 0;

        // Calculate locked funds for the sender in this project
        for (uint256 i = 0; i < project.investors.length; i++) {
            if (project.investors[i] == msg.sender) {
                lockedFunds = project.lockedFunds / project.investors.length;
                break;
            }
        }

        require(lockedFunds > 0, "No locked funds for this project");

        // Transfer locked funds to investor
        payable(msg.sender).transfer(lockedFunds);

        // Reduce locked funds for this project
        project.lockedFunds -= lockedFunds;

        // Emit event
        emit FundsReleased(_projectId, msg.sender, lockedFunds);
    }
}
