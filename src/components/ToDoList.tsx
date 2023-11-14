import React from "react";
import { TaskModel } from "../core/Task.model";
import Task from "./Task";
import AddToDo from "./AddTask";
import { ToDoListModel } from "../core/ToDoList.model";

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
        <>
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
        </>
    );
};

export default ToDoList;