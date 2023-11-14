import React from "react";
import { TaskModel } from "../models/Task.model";
import Task from "./Task";
import AddToDo from "./AddTask";
import { ToDoListModel } from "../models/ToDoList.model";

type Props = {
    toDoList: ToDoListModel;
}

const ToDoList: React.FC<Props> = (props: Props) => {

    const [change, setChange] = React.useState<number>(0);

    const removeFromList = (task: TaskModel) => {
        let index = props.toDoList.tasks.indexOf(task);
        props.toDoList.tasks.splice(index, 1);
        setChange(change + 1);
    }

    const addToList = (task: TaskModel) => {
        props.toDoList.tasks.push(task);
        setChange(change + 1);
    }

    return (
        <div className="card">
            <div className="card-header">
                <h2>{props.toDoList.title}</h2>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    <li className="list-group-item">
                        <AddToDo AddToDoMethod={addToList}/>
                    </li>
                    {
                        props.toDoList.tasks.map((task) => (
                            <li className="list-group-item" key={task.id}>
                                <Task task={task} removeAction={removeFromList}/>
                            </li>
                        )
                        )
                    }
                </ul>
            </div>
            
        </div>
    );
};

export default ToDoList;