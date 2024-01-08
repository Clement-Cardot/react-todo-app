import { useNavigate, useParams } from 'react-router-dom';
import { ToDoListModel } from '../models/ToDoList.model';
import KanbanSelector from '../components/KanbanSelector';
import PrioritySelector from '../components/PrioritySelector';
import TagSelector from '../components/TagSelector';
import { TaskModel } from '../models/Task.model';
import { Tag } from '../models/Tag.model';
import React from 'react';

const findTaskById = (id: string) => {
  let data = localStorage.getItem("toDoLists");
  if (data) {
    let parsedData = JSON.parse(data);
    let toDoLists = parsedData as Array<ToDoListModel>;
    let task = toDoLists.flatMap((toDoList) => toDoList.tasks).find((task) => task.id === id);
    return task;
  }
  else return null;
}

const save = (taskToSave: TaskModel) => {
  let data = localStorage.getItem("toDoLists");
  if (data) {
    let parsedData = JSON.parse(data);
    let toDoLists = parsedData as Array<ToDoListModel>;
    let toDoList = toDoLists.find((toDoList) => toDoList.tasks.find((task) => task.id === taskToSave.id));
    if (toDoList) {
      let index = toDoList.tasks.findIndex((task) => task.id === taskToSave.id);
      toDoList.tasks[index] = taskToSave;
      localStorage.setItem("toDoLists", JSON.stringify(toDoLists));
      console.log(toDoList);
    }
  }
};

function TaskPage() {
  const [changeState, setChangeState] = React.useState<number>(0);
  let { id } = useParams();

  const navigate = useNavigate();

  
    let task = findTaskById(id!);

    if (task){

      const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value:boolean = event.target.checked;
        task!.isDone = value;

        if (value) task!.status = "done";
        else task!.status = "todo";

        setChangeState(changeState + 1);
        save(task!);
    }

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value:string = event.target.value;
        task!.title = value;
        setChangeState(changeState + 1);
        save(task!);
    }

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        let value:string = event.target.value;
        task!.description = value;
        setChangeState(changeState + 1);
        save(task!);
    }

      const setPriority = (priority: "High" | "Medium" | "Low" | null) => {
        task!.priority = priority;
        setChangeState(changeState + 1);
        save(task!);
      };
    
      const setStatus = (status: "todo" | "in-progress" | "testing" | "done") => {
        task!.status = status;
        if (status == "done") task!.isDone = true;
        else task!.isDone = false;
        setChangeState(changeState + 1);
        save(task!);
      }
    
      const setTag = (tag: Tag | null) => {
        task!.tag = tag;
        setChangeState(changeState + 1);
        save(task!);
      };

      return (
        <div className='body'>
          <div className='card w-75 d-flex'>
            <div className='card-body'>
              <div className='d-flex flex-row align-items-baseline'>
                <input className="form-check-input me-3" type="checkbox" defaultChecked={task.isDone} onChange={handleCheckChange}/>
                <h2 className='card-title'>{task.title}</h2>
              </div>
              
              <p className="card-text">{task.description}</p>

              <div className="d-flex flex-row align-items-baseline">
                <p className="me-1">Status :</p>
                <KanbanSelector actualStatus={task.status} setStatus={setStatus}/>
              </div>

              <div className="d-flex flex-row align-items-baseline">
                <p className="me-1">Priority :</p>
                <PrioritySelector actualPriority={task.priority} setPriority={setPriority}/>
              </div>

              <div className="d-flex flex-row align-items-baseline">
                <p className="me-1">Tag :</p>
                <TagSelector actualTag={task.tag} setTag={setTag}/>
              </div>
              
            </div>
          </div>
        </div>
      )
    }
  
    else {
      navigate(-1);
  }  
}

export default TaskPage
