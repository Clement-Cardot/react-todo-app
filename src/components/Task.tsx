import React from "react";
import { TaskModel } from "../models/Task.model";

import { Tag } from "../models/Tag.model";
import PrioritySelector from "./PrioritySelector";
import TagSelector from "./TagSelector";
import KanbanSelector from "./KanbanSelector";

type Props = {
    task: TaskModel;
    removeAction: (element: TaskModel) => void;
    autoSave: () => void;
}

const ToDoElement: React.FC<Props> = (props: Props) => {

    const [changeState, setChangeState] = React.useState<number>(0);
    const [editMode, setEditMode] = React.useState<number>(0);
    const [isHovering, setIsHovering] = React.useState(false);

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    const toogleEditMode = () => {
        if(editMode == 0) setEditMode(1);
        else setEditMode(0);
    }

    const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value:boolean = event.target.checked;
        props.task.isDone = value;

        if (value) props.task.status = "done";
        else props.task.status = "todo";

        setChangeState(changeState + 1);
        props.autoSave();
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value:string = event.target.value;
        props.task.title = value;
        setChangeState(changeState + 1);
        props.autoSave();
        toogleEditMode();
    }

    const removeElement = () => {
        props.removeAction(props.task);
    }

    const setPriority = (priority: "High" | "Medium" | "Low" | null) => {
        props.task.priority = priority;
        setChangeState(changeState + 1);
        props.autoSave();
    };

    const setStatus = (status: "todo" | "in-progress" | "testing" | "done") => {
        props.task.status = status;
        if (status == "done") props.task.isDone = true;
        else props.task.isDone = false;
        setChangeState(changeState + 1);
        props.autoSave();
    }

    const setTag = (tag: Tag | null) => {
        props.task.tag = tag;
        setChangeState(changeState + 1);
        props.autoSave();
    };
    
    return (
        <div className="d-flex flex-column" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>            
            <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center gap-2">
                    <input className="form-check-input me-3" type="checkbox" defaultChecked={props.task.isDone} onChange={handleCheckChange}/>

                    {
                    editMode == 0 ?
                        <a className="no-css" href={"/task/" + props.task.id}>
                            <button className="ToDoElementTitle" type="button">
                                {
                                    props.task.isDone ?
                                    <del>{props.task.title}</del>
                                    :
                                    props.task.title
                                }
                            </button>
                        </a>
                        :
                        <input className="form-control w-50" type="text" defaultValue={props.task.title} onBlur={handleTitleChange} />
                    }

                    <KanbanSelector actualStatus={props.task.status} setStatus={setStatus}/>

                    <PrioritySelector actualPriority={props.task.priority} setPriority={setPriority}/>

                    <TagSelector actualTag={props.task.tag} setTag={setTag}/>

                </div>
                
                <div className={isHovering? undefined : 'hidden'}>
                    <button type="button" className="btn" onClick={toogleEditMode}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </button>

                    <button type="button" className="btn" onClick={removeElement}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>
                </div>
            </div>
            
        </div>
    );
};

export default ToDoElement;