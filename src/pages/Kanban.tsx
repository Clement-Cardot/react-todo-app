import React, { ChangeEvent, useEffect } from "react";
import { ToDoListModel } from "../models/ToDoList.model";
import TaskCard from "../components/TaskCard";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { TaskModel } from "../models/Task.model";


function Kanban() {

    const [toDoLists, setToDoLists] = React.useState<Array<ToDoListModel>>();
    const [toDoListId, setToDoListId] = React.useState<string>();

    useEffect(() => {
        if (!toDoLists) {
            let data = localStorage.getItem("toDoLists");
            if (data) {
                let parsedData = JSON.parse(data);
                setToDoLists(parsedData as Array<ToDoListModel>);
                setToDoListId(parsedData[0].id);
            }
            else setToDoLists([]);
        }
        else {
            localStorage.setItem("toDoLists", JSON.stringify(toDoLists));
        }
    }, [toDoLists]);

    const autoSave = (toDoListToSave: ToDoListModel) => {
        let index = toDoLists?.findIndex((toDoList) => toDoList.id === toDoListToSave.id);
        if(index !== undefined && index !== -1){
        let newToDoLists = [...(toDoLists ?? [])]; // Add null check here
        newToDoLists[index] = toDoListToSave;
        setToDoLists(newToDoLists);
        }
        console.log(toDoLists);
    };

    const autoSaveTask = (taskToSave: TaskModel) => {
        console.log(taskToSave);
        let toDoListsToSave = toDoLists
        if (toDoListsToSave === undefined) return;
        toDoListsToSave.forEach((toDoList) => {
            let index = toDoList.tasks.findIndex((task) => task.id === taskToSave.id);
            if(index !== undefined && index !== -1){
                toDoList.tasks[index] = taskToSave;
                autoSave(toDoList);
            }
        });
        
    };

    const move = (source: "todo" | "in-progress" | "testing" | "done", index: number, destination: "todo" | "in-progress" | "testing" | "done") => {

        let toDoListToSave = toDoLists?.find((toDoList) => toDoList.id === toDoListId);
        if (toDoListToSave === undefined) return;
        const tasks = toDoListToSave.tasks.filter((task) => task.status === source);
        
        if (tasks === undefined) return;
        tasks[index].status = destination;
        
        if (destination === "done") tasks[index].isDone = true;
        else tasks[index].isDone = false;

        autoSave(toDoListToSave);
      };

    const onDragEnd = (result: any) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
        return;
        }
        const sList = source.droppableId;
        const sIndex = source.index;
        const dList = destination.droppableId;

        if (sList !== dList) {
            console.log(source, dList);
            move(sList, sIndex, dList);
        }
    };

    const selectList = (event: ChangeEvent<HTMLSelectElement>) => {
        console.log(event.currentTarget.value);
        setToDoListId(event.currentTarget.value);
    };


    return (
        <div className='body'>

            <div className="mb-3">
                <h3>TodoList Selector</h3>
                <select className="form-select" onChange={selectList}>
                    {
                        toDoLists?.map((toDoList) => (
                            <option value={toDoList.id} key={toDoList.id}>{toDoList.title}</option>
                        ))
                    }
                </select>
            </div>

            <div className="kanban card">
                <DragDropContext onDragEnd={onDragEnd}>
                    
                    <div className="quarter">
                        <div className="d-flex justify-content-center mt-2">
                            <h2 id="todo">TO-DO</h2>
                        </div>
                        <hr className="m-0"/>
                        <Droppable droppableId="todo">
                            { provided => (
                                <div ref={provided.innerRef} {...provided.droppableProps} className="kanban-list">
                                    {
                                        toDoLists?.find((toDoList) => toDoList.id === toDoListId)?.tasks
                                            .filter((task) => task.status === "todo").map((task, index) => (
                                                <Draggable draggableId={task.id} index={index} key={task.id}>
                                                    { (provided) => (
                                                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                            <TaskCard task={task} autoSaveTask={autoSaveTask} key={task.id}/>
                                                        </div>
                                                    )}
                                                </Draggable>
                                        ))
                                    }
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                    

                    <div className="d-flex">
                        <div className="vr"></div>
                    </div>

                    <div className="quarter">
                        <div className="d-flex justify-content-center mt-2">
                            <h2 id="in-progress">In-Progress</h2>
                        </div>
                        <hr className="m-0"/>
                        <Droppable droppableId="in-progress">
                            { provided => (
                                <div ref={provided.innerRef} {...provided.droppableProps} className="kanban-list">
                                    {
                                        toDoLists?.find((toDoList) => toDoList.id === toDoListId)?.tasks
                                            .filter((task) => task.status === "in-progress").map((task, index) => (
                                                <Draggable draggableId={task.id} index={index} key={task.id}>
                                                    { (provided) => (
                                                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                            <TaskCard task={task} autoSaveTask={autoSaveTask} key={task.id}/>
                                                        </div>
                                                    )}
                                                </Draggable>
                                        ))
                                    }
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>

                    <div className="d-flex">
                        <div className="vr"></div>
                    </div>

                    <div className="quarter">
                        <div className="d-flex justify-content-center mt-2">
                            <h2 id="testing">Testing</h2>
                        </div>
                        <hr className="m-0"/>
                        <Droppable droppableId="testing">
                            { provided => (
                                <div ref={provided.innerRef} {...provided.droppableProps} className="kanban-list">
                                    {
                                        toDoLists?.find((toDoList) => toDoList.id === toDoListId)?.tasks
                                            .filter((task) => task.status === "testing").map((task, index) => (
                                                <Draggable draggableId={task.id} index={index} key={task.id}>
                                                    { (provided) => (
                                                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                            <TaskCard task={task} autoSaveTask={autoSaveTask} key={task.id}/>
                                                        </div>
                                                    )}
                                                </Draggable>
                                        ))
                                    }
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>

                    <div className="d-flex">
                        <div className="vr"></div>
                    </div>

                    <div className="quarter">
                        <div className="d-flex justify-content-center mt-2">
                            <h2 id="done">Done</h2>
                        </div>
                        <hr className="m-0"/>
                        <Droppable droppableId="done">
                            { provided => (
                                <div ref={provided.innerRef} {...provided.droppableProps} className="kanban-list">
                                    {
                                        toDoLists?.find((toDoList) => toDoList.id === toDoListId)?.tasks
                                            .filter((task) => task.status === "done").map((task, index) => (
                                                <Draggable draggableId={task.id} index={index} key={task.id}>
                                                    { (provided) => (
                                                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                            <TaskCard task={task} autoSaveTask={autoSaveTask} key={task.id}/>
                                                        </div>
                                                    )}
                                                </Draggable>
                                        ))
                                    }
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>

                </DragDropContext>
            </div>
            
        </div>
      )
  }
  
export default Kanban
  