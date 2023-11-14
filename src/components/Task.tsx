import React from "react";
import { TaskModel } from "../core/Task.model";
import ToDoList from "./ToDoList";

type Props = {
    task: TaskModel;
    removeAction: (element: TaskModel) => void;
}

const ToDoElement: React.FC<Props> = (props: Props) => {

    const [changeState, setChangeState] = React.useState<number>(0);
    const [editMode, setEditMode] = React.useState<number>(0);

    const elementcollapseId = "collapse" + String(props.task.id); 

    const toogleEditMode = () => {
        if(editMode == 0) setEditMode(1);
        else setEditMode(0);
    }

    const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value:boolean = event.target.checked;
        props.task.isDone = value;
        setChangeState(changeState + 1);
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value:string = event.target.value;
        props.task.title = value;
        setChangeState(changeState + 1);
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        let value:string = event.target.value;
        props.task.description = value;
        setChangeState(changeState + 1);
    }

    const removeElement = () => {
        props.removeAction(props.task);
    }
    
    return (
        <div className="d-flex flex-column">
            
        {
            editMode == 0 ?
            <>
                <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                        <input className="form-check-input me-3" type="checkbox" defaultChecked={props.task.isDone} onChange={handleCheckChange}/>

                        <button className="ToDoElementTitle" type="button" data-bs-toggle="collapse" data-bs-target={"#"+elementcollapseId} aria-expanded="false" aria-controls={elementcollapseId}>
                            {
                                props.task.isDone ?
                                <del>{props.task.title}</del>
                                :
                                props.task.title
                            }
                        </button>
                    </div>
                    
                    <div>
                        <button type="button" className="btn" onClick={toogleEditMode}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                        </button>

                        <button type="button" className="btn" onClick={removeElement}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                            </svg>
                        </button>
                    </div>
                    

                </div>

                <div className="collapse mb-3" id={elementcollapseId}>
                    <div className="card card-body mb-3">
                        {props.task.description}
                    </div>
                    <div className="card card-body mb-3">
                        <ToDoList toDoList={props.task.subTasks}/>
                    </div>
                </div>
            </>
            :
            <>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="floatingInput" defaultValue={props.task.title} onChange={handleTitleChange}/>
                    <label htmlFor="floatingInput">Task name</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea className="form-control" id="floatingTextarea2" defaultValue={props.task.description} onChange={handleDescriptionChange} ></textarea>
                    <label htmlFor="floatingTextarea2">Comments</label>
                </div>

                <button className="btn btn-primary mb-3" onClick={toogleEditMode}>Submit</button>
            </>
        }
        </div>
    );
};

export default ToDoElement;