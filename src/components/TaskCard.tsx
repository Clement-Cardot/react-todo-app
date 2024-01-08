import React from "react";
import { TaskModel } from "../models/Task.model";
import PrioritySelector from "./PrioritySelector";
import TagSelector from "./TagSelector";
import { Tag } from "../models/Tag.model";

type Props = {
    task: TaskModel;
    autoSaveTask: (task: TaskModel) => void;
}

const TaskCard : React.FC<Props> = (props: Props) => {
    const [changeState, setChangeState] = React.useState<number>(0);

    const setPriority = (priority: "High" | "Medium" | "Low" | null) => {
        props.task.priority = priority;
        setChangeState(changeState + 1);
        props.autoSaveTask(props.task);
    };
    
    const setTag = (tag: Tag | null) => {
        props.task.tag = tag;
        setChangeState(changeState + 1);
        props.autoSaveTask(props.task);
    };

    return (
        <div className="card m-2">
            <div className="card-body">
                <h5 className="card-title">{props.task.title}</h5>
                <PrioritySelector actualPriority={props.task.priority} setPriority={setPriority}/>
                <TagSelector actualTag={props.task.tag} setTag={setTag}/>
            </div>
        </div>
    );
};

export default TaskCard;