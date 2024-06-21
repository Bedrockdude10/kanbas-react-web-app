import React, { useState } from "react";
import axios from 'axios';

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

interface Assignment {
    score: number;
    completed: boolean;
}

interface Module {
    description: string;
}

export default function WorkingWithObjects() {
    const [module, setModule] = useState({
        name: "Introduction to Programming",
        description: "Learn the basics of programming."
    });

    const [assignment, setAssignment] = useState({
        id: 1, title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-10-10", completed: false, score: 0,
    });

    const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;
    const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;

    const updateModuleDescription = () => {
        // API call to update module's description
    };

    const handleScoreChange = async (newScore: number) => {
        try {
            const response = await axios.post('/lab5/assignment/updateScore', { newScore });
            alert(response.data.message);
            setAssignment(prev => ({ ...prev, score: newScore }));
        } catch (error) {
            console.error('Failed to update score:', error);
            alert('Failed to update score');
        }
    };

    const handleCompletedChange = async (newCompleted: boolean) => {
        try {
            const response = await axios.post('/lab5/assignment/updateCompleted', { newCompleted });
            alert(response.data.message);
            setAssignment(prev => ({ ...prev, completed: newCompleted }));
        } catch (error) {
            console.error('Failed to update completion status:', error);
            alert('Failed to update completion status');
        }
    };

    const handleDescriptionChange = async (newDescription: string) => {
        try {
            const response = await axios.post('/lab5/module/updateDescription', { newDescription });
            alert(response.data.message);
            setModule(prev => ({ ...prev, description: newDescription }));
        } catch (error) {
            console.error('Failed to update description:', error);
            alert('Failed to update description');
        }
    };

    return (
        <div id="wd-working-with-objects">
            <h3>Working With Objects</h3>
            <h4>Module Properties</h4>
            <input className="form-control mb-2" value={module.name}
                onChange={(e) => setModule({ ...module, name: e.target.value })}
                placeholder="Module Name" />
            <a className="btn btn-primary" href={`${MODULE_API_URL}/updateName/${module.name}`}>Update Module Name</a>
            <input className="form-control mb-2" value={module.description}
                onChange={(e) => setModule({ ...module, description: e.target.value })}
                placeholder="Module Description" />
            <a className="btn btn-primary" onClick={updateModuleDescription}>Update Module Description</a>
            <hr />
    
            <h4>Assignment Properties</h4>
            <input className="form-control mb-2" type="number"
                value={assignment.score}
                onChange={(e) => setAssignment({ ...assignment, score: parseInt(e.target.value, 10) })}
                placeholder="Score" />
            <a className="btn btn-primary" href={`${ASSIGNMENT_API_URL}/updateScore/${assignment.score}`}>Update Score</a>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" id="wd-assignment-completed"
                    checked={assignment.completed}
                    onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })}
                />
                <label className="form-check-label" htmlFor="wd-assignment-completed">
                    Completed
                </label>
            </div>
            <a className="btn btn-primary" href={`${ASSIGNMENT_API_URL}/updateCompleted/${assignment.completed}`}>Update Completed</a>
            <hr />
        </div>
    );
    
}
