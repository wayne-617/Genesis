// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Project {
    struct Project {
        uint256 id;
        address payable creator;
        string title;
        string description;
        uint256 goalAmount;
        uint256 raisedAmount;
        uint256 deadline;
        bool isActive;
    }

    Projects[] projects; // list of all projects

    // signal new project
    event ProjectCreated(uint256 projectId, address creator, string title, uint256 goalAmount, uint256 deadline);

    function createProject(string memory _title, string memory _description, uint256 _goalAmount, uint256 _duration) public {
        require(_goalAmount > 0, "Goal amount must be greater than 0");
        require(_duration > 0, "Duration must be greater than 0");

        uint256 newId = projects.length;
        projects.push(Project({
            id: newId;
            creator: payable(msg.sender),
            title: _title,
            description: _description,
            goalAmount: _goalAmount,
            raisedAmount: 0,
            deadline: block.timestamp + _duration,
            isActive: true
        }));

        emit ProjectCreated(id, msg.sender, _title, _goalAmount, block.timestamp + _duration);
    }

}