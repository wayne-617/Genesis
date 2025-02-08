// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Funding {
    struct Project {
        uint256 id;
        address payable creator;
        string title;
        string description;
        uint256 goalAmount;
        uint256 raisedAmount;
        uint256 amountWithdrawn; // how much the creator has taken from the goal
        uint256 supportingVotes; // how many support votes
        uint256 deadline;
        bool isActive;
    }

    Project[] public projects; // list of all projects

    // Mapping to store contributions for each address, for each project
    // projectContributions[projectId][contributorAddress] = amount contributed by the address
    mapping(uint256 => mapping(address => uint256)) public projectContributions;
    mapping(uint256 => address[]) public projectContributors;
    mapping(uint256 => mapping(address => bool)) public voteChoice;


    // Mapping 

    // check for valid project id
    modifier validIndex(uint256 _index) {
        require(_index < projects.length, "Invalid Project Id");
        _;
    }

    modifier projectIsActive(uint256 _index) {
        require(projects[_index].isActive, "Project is not active");
        _;
    }

    // signal new project
    event ProjectCreated(uint256 projectId, address creator, string title, uint256 goalAmount, uint256 deadline);
    event ContributionMade(uint256 projectId, address contributor, uint256 amount);
    event Withdraw(uint256 projectId, address creator, uint256 amount);
    event VoteChange(uint256 projectId, address contributor, bool vote);
    event RefundIssued(uint256 projectId, address contributor, uint256 amount);
    event Debug(string message, uint256 supportingVotes, uint256 raisedAmount, uint256 ratio);


    function createProject(string memory _title, string memory _description, uint256 _goalAmount, uint256 _duration) public {
        require(_goalAmount > 0, "Goal amount must be greater than 0");
        require(_duration > 0, "Duration must be greater than 0");

        uint256 newId = projects.length;
        projects.push(Project({
            id: newId,
            creator: payable(msg.sender),
            title: _title,
            description: _description,
            goalAmount: _goalAmount,
            raisedAmount: 0,
            amountWithdrawn: 0,
            supportingVotes: 0,
            deadline: block.timestamp + _duration,
            isActive: true
        }));

        emit ProjectCreated(newId, msg.sender, _title, _goalAmount, block.timestamp + _duration);
    }

    function fundProject(uint256 _projectId) public payable 
        validIndex(_projectId)
        projectIsActive(_projectId)
    {
        require(projects[_projectId].creator != msg.sender, "You are the owner of the project");
        require(msg.value > 0, "You must send value greater than 0");

        Project storage project = projects[_projectId];

        project.raisedAmount += msg.value;
        if (project.raisedAmount >= project.goalAmount) {
            project.isActive = false;
        }
        if (projectContributions[_projectId][msg.sender] == 0) {
            // new contributor
            projectContributors[_projectId].push(msg.sender);
        }
        projectContributions[_projectId][msg.sender] += msg.value;
        voteChoice[_projectId][msg.sender] = true; // default supporting vote
        project.supportingVotes += msg.value;

        emit ContributionMade(_projectId, msg.sender, msg.value);
    }

    function withdrawFunds(uint256 _projectId) public 
        validIndex(_projectId)
    {
        Project storage project = projects[_projectId];
        require(project.creator == msg.sender, "You are not the owner of the project");

        uint256 amountToWithdraw;

        if (!project.isActive) {
            // project already finished
            amountToWithdraw = project.raisedAmount - project.amountWithdrawn;
        } else if (project.raisedAmount < project.goalAmount) {
            // goal not reached yet
            amountToWithdraw = (project.raisedAmount - project.amountWithdrawn) / 2;
        } else {
            // goal achieved
            amountToWithdraw = project.raisedAmount - project.amountWithdrawn;
            project.isActive = false; // Deactivate the project
        }
        
        project.creator.transfer(amountToWithdraw);
        emit Withdraw(_projectId, msg.sender, amountToWithdraw);
    }

    function vote(uint256 id, bool _vote) public 
        validIndex(id)
        projectIsActive(id)
    {
        require (projectContributions[id][msg.sender] > 0, "You must contribute to the project in order to vote");
        require (voteChoice[id][msg.sender] != _vote, "You have already voted this");

        Project storage project = projects[id];
        voteChoice[id][msg.sender] = _vote;
        uint256 votes = projectContributions[id][msg.sender];

        if (_vote) {
            project.supportingVotes += votes;
        } else {
            project.supportingVotes -= votes;
        }

        uint256 currVotes = getVoteRatio(id);
        if (currVotes < 50) {
            refund(id);
        }

        emit VoteChange(id, msg.sender, _vote);
    }

    function refund(uint256 id) internal {
        Project storage project = projects[id];

        for (uint i = 0; i < projectContributors[id].length; i++) {
            address contributor = projectContributors[id][i];
            uint256 proportion = projectContributions[id][contributor] * 100 / project.raisedAmount;
            uint256 refundAmount = proportion * (project.raisedAmount - project.amountWithdrawn) / 100;
            payable(contributor).transfer(refundAmount);
            emit RefundIssued(id, contributor, refundAmount);
        }

        project.isActive = false;
    }

    // get goal ratio
    function getGoalRatio(uint256 id) public view returns (uint256) {
        Project memory project = projects[id];
        return (project.raisedAmount * 100) / project.goalAmount;
    }

    // get current vote ratio
    function getVoteRatio(uint256 id) public view returns (uint256) {
        Project memory project = projects[id];
        if (project.raisedAmount == 0) {
            return 0;
        }

        // uint ratio = (uint) (project.supportingVotes * 100) / (uint) (project.raisedAmount);
        uint256 ratio = division(project.supportingVotes, project.raisedAmount);

        return ratio;
    }
    
    function division(uint256 num1, uint256 num2) public pure returns (uint256) {
        return num1 * 100 / num2;
    }
}