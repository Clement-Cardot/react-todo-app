import React from "react";
import { TaskModel } from "../models/Task.model";

type Props = {
    AddToDoMethod: (task: TaskModel) => void;
}

const AddTask: React.FC<Props> = (props: Props) => {

    const [newTaskTitle, setNewTaskTitle] = React.useState('');

    const handleClick = () => {
        if(checkForm()) {
            props.AddToDoMethod(new TaskModel(newTaskTitle));
            setNewTaskTitle('');
        }
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.target.value);
    };

    const checkForm = () => {
        if(newTaskTitle == "") return false;
        else return true;
    };

    return (
        <form className="d-flex justify-content-between" action="#" onSubmit={handleClick}>
            <div className="d-flex align-items-center w-100 me-2">
                <div className="form w-100">   
                    <input className="form-control" type="text" placeholder="New task name" value={newTaskTitle} onChange={handleTitleChange} required/>
                    <div className="invalid-feedback">
                        Please enter the name of the task.
                    </div>
                </div>
            </div>
            
            <div>
                <button type="submit" className="btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>
            </div>
        </form>
    );
}

export default AddTask;