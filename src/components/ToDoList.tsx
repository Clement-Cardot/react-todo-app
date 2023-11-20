import React from "react";
import { TaskModel } from "../models/Task.model";
import Task from "./Task";
import AddToDo from "./AddTask";
import { ToDoListModel } from "../models/ToDoList.model";

type Props = {
    toDoList: ToDoListModel;
    removeToDoList?: (toDoList: ToDoListModel) => void | undefined;
}

const ToDoList: React.FC<Props> = (props: Props) => {

    const [change, setChange] = React.useState<number>(0);
    const [editMode, setEditMode] = React.useState<number>(0);

    const elementcollapseId = "collapse" + String(props.toDoList.id);

    const removeFromList = (task: TaskModel) => {
        let index = props.toDoList.tasks.indexOf(task);
        props.toDoList.tasks.splice(index, 1);
        setChange(change + 1);
    }

    const addToList = (task: TaskModel) => {
        props.toDoList.tasks.push(task);
        setChange(change + 1);
    }

    const toogleEditMode = () => {
        if(editMode == 0) setEditMode(1);
        else setEditMode(0);
    }

    const removeToDoList = () => {
        if (props.removeToDoList) {
            props.removeToDoList(props.toDoList);
        }
    }

    const submitNewTitle = (event: React.FocusEvent<HTMLInputElement>) => {
        if(event.target.value == ""){
            event.target.value = props.toDoList.title;
            toogleEditMode();
        }
        else{
            let value:string = event.target.value;
            props.toDoList.title = value;
            setChange(change + 1);
            toogleEditMode();
        }
    }

    return (
        <div className="accordion mb-4 todolist">
            <div className="accordion-item">
                <div className="accordion-header d-flex align-items-center">
                    <button className="accordion-button w-auto me-2" type="button" data-bs-toggle="collapse" data-bs-target={"#"+elementcollapseId} aria-expanded="true" aria-controls={elementcollapseId}>
                        
                    </button>
                    <div className="d-flex justify-content-between w-100 me-4">
                        {
                            editMode == 0 ?
                            <h5 className="mt-2">{props.toDoList.title}</h5>
                            :
                            <input className="form-control w-50" type="text" defaultValue={props.toDoList.title} onBlur={submitNewTitle}/>
                        }
                        <div>
                            <button type="button" className="btn" onClick={toogleEditMode}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </button>

                            {
                                (props.removeToDoList != undefined) &&
                                <button type="button" className="btn" onClick={removeToDoList}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                    </svg>
                                </button>
                            }
                        </div>
                    </div>
                </div>
                <div id={elementcollapseId} className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <ul className="list-group">
                            {
                                props.toDoList.tasks.map((task) => (
                                    <li className="list-group-item" key={task.id}>
                                        <Task task={task} removeAction={removeFromList}/>
                                    </li>
                                )
                                )
                            }
                            <li className="list-group-item">
                                <AddToDo AddToDoMethod={addToList}/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToDoList;