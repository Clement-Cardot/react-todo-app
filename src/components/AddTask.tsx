import React from "react";
import { TaskModel } from "../core/Task.model";

type Props = {
    AddToDoMethod: (task: TaskModel) => void;
}

let newToDoElement = new TaskModel("", "");

const AddTask: React.FC<Props> = (props: Props) => {

    const [displayed, setDisplayed] = React.useState<boolean>(false);
    const [buttonDisabled, setbuttonDisabled] = React.useState<boolean>(true);

    const createNewToDoElement = () => {
        setDisplayed(!displayed);
        props.AddToDoMethod(newToDoElement);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value:string = event.target.value;
        newToDoElement.title = value;
        checkForm()
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        let value:string = event.target.value;
        newToDoElement.description = value;
        checkForm()
    };

    const toogleDisplay = () => {
        setDisplayed(!displayed);
    };

    const checkForm = () => {
        if(newToDoElement.title == "" || newToDoElement.description == "") setbuttonDisabled(true);
        else setbuttonDisabled(false);
    };

    return (
        <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center w-100">
                <div className="form w-100">   
                    <input className="form-control" type="text" placeholder="New task name" onChange={handleTitleChange} required/>
                    <div className="invalid-feedback">
                        Please enter the name of the task.
                    </div>
                </div>
            </div>
            
            <div>
                <button type="button" className="btn" onClick={createNewToDoElement}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" className="bi bi-plus-square-fill" viewBox="0 0 16 16">
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default AddTask;