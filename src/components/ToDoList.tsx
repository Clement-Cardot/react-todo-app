import React from "react";
import { TaskModel } from "../models/Task.model";
import Task from "./Task";
import AddTask from "./AddTask";
import { ToDoListModel } from "../models/ToDoList.model";
import ProgressSpan from "./ProgressSpan";

type Props = {
    toDoList: ToDoListModel;
    removeToDoList?: (toDoList: ToDoListModel) => void | undefined;
    autoSave?: (toDoListToSave: ToDoListModel) => void;
}

const ToDoList: React.FC<Props> = (props: Props) => {

    const [change, setChange] = React.useState<number>(0);
    const [editMode, setEditMode] = React.useState<number>(0);

    const elementcollapseId = "collapse" + String(props.toDoList.id);

    const removeFromList = (task: TaskModel) => {
        let index = props.toDoList.tasks.indexOf(task);
        props.toDoList.tasks.splice(index, 1);
        setChange(change + 1);
        if (props.autoSave) {
            props.autoSave(props.toDoList);
        }
    }

    const addToList = (task: TaskModel) => {
        console.log("AddTask.tsx: handleClick(): checkForm() == true => TodoList.tsx: addToList()");
        props.toDoList.tasks.push(task);
        setChange(change + 1);
        if (props.autoSave) {
            props.autoSave(props.toDoList);
        }
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

    const autoSave = () => {
        setChange(change + 1);
        if (props.autoSave) {
            props.autoSave(props.toDoList);
        }
    };

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

    const isAllListDone = () => {
        let isDone = true;
        props.toDoList.tasks.forEach((task) => {
            if(!task.isDone) isDone = false;
        });
        return isDone;
    }

    return (
        <div className="accordion mb-4 todolist">
            <div className="accordion-item">
                <div className="accordion-header d-flex align-items-center">
                    <button className="accordion-button w-auto me-2" type="button" data-bs-toggle="collapse" data-bs-target={"#"+elementcollapseId} aria-expanded="true" aria-controls={elementcollapseId}>
                        
                    </button>
                    <div className="d-flex justify-content-between w-100 me-4">
                        {
                            editMode === 1 ?
                                <input className="form-control w-50" type="text" defaultValue={props.toDoList.title} onBlur={submitNewTitle} />
                            :
                                <div className="d-flex gap-3">
                                    <h5 className="mt-2" onClick={toogleEditMode}>
                                    {
                                        isAllListDone() ?
                                            <del>{props.toDoList.title}</del>
                                        :
                                            props.toDoList.title
                                    }
                                    </h5>
                                    
                                </div>
                        }
                        <div className="d-flex flex-row gap-3">

                            <ProgressSpan nbTasks={props.toDoList.tasks.length} nbTasksDone={props.toDoList.tasks.filter((task) => task.isDone).length}/>

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
                                        <Task task={task} removeAction={removeFromList} autoSave={autoSave}/>
                                    </li>
                                )
                                )
                            }
                            <li className="list-group-item">
                                <AddTask AddToDoMethod={addToList}/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToDoList;