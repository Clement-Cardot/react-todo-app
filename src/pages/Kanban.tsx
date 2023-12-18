import React, { useEffect } from "react";
import { ToDoListModel } from "../models/ToDoList.model";
import TaskCard from "../components/TaskCard";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { TaskModel } from "../models/Task.model";


function Kanban() {

    const [toDoLists, setToDoLists] = React.useState<Array<ToDoListModel>>();

    useEffect(() => {
        if (!toDoLists) {
        let data = localStorage.getItem("toDoLists");
        if (data) {
            let parsedData = JSON.parse(data);
            setToDoLists(parsedData as Array<ToDoListModel>);
        }
        else setToDoLists([]);
        }
        else {
        localStorage.setItem("toDoLists", JSON.stringify(toDoLists));
        }
    }, [toDoLists]);

    const autoSave = (toDoListToSave: ToDoListModel | Array<ToDoListModel>) => {
        if (Array.isArray(toDoListToSave)) {
            setToDoLists(toDoListToSave);
        }
        else {
            let index = toDoLists?.findIndex((toDoList) => toDoList.id === toDoListToSave.id);
            if(index !== undefined && index !== -1){
                let newToDoLists = [...(toDoLists || [])]; // Add null check here
                newToDoLists[index] = toDoListToSave;
                setToDoLists(newToDoLists);
            }
        }
        console.log(toDoLists);
    };

    const autoSaveTask = (taskToSave: TaskModel) => {
        let toDoListsToSave = toDoLists
        if (toDoListsToSave === undefined) return;
        toDoListsToSave.forEach((toDoList) => {
            let index = toDoList.tasks.findIndex((task) => task.id === taskToSave.id);
            if(index !== undefined && index !== -1){
                toDoList.tasks[index] = taskToSave;
            }
        });
        autoSave(toDoListsToSave);
    };

    // const reorder = (list: Array<ToDoListModel>, startIndex: number, endIndex: number) => {
    //     const result = Array.from(list);
    //     const [removed] = result.splice(startIndex, 1);
    //     result.splice(endIndex, 0, removed);
      
    //     return result;
    // };

    const move = (source: "backlog" | "in-progress" | "to-check" | "done", index: number, destination: "backlog" | "in-progress" | "to-check" | "done") => {

        let toDoListsToSave = toDoLists
        if (toDoListsToSave === undefined) return;
        const tasks = toDoListsToSave.flatMap((toDoList) => (
            toDoList.tasks.filter((task) => task.status === source)));
        
        if (tasks === undefined) return;
        tasks[index].status = destination;

        autoSave(toDoListsToSave);
        
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

        if (sList === dList) {
            // const items = reorder(state[sInd], source.index, destination.index);
            // const newState = [...state];
            // newState[sInd] = items;
            // setState(newState);
        } 
        else {
            console.log(source, dList);
            move(sList, sIndex, dList);
        }
    };


    return (
        <div className='body'>
            <div className="kanban">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="backlog">
                        { provided => (
                            <div className="quarter" id="backlog" ref={provided.innerRef} {...provided.droppableProps}>
                                {
                                    toDoLists?.map((toDoList) => (
                                        toDoList.tasks.filter((task) => task.status === "backlog").map((task, index) => (
                                            <Draggable draggableId={task.id} index={index} key={task.id}>
                                                { (provided) => (
                                                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                        <TaskCard task={task} autoSaveTask={autoSaveTask} key={task.id}/>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))
                                    ))
                                }
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="in-progress">
                        { provided => (
                            <div className="quarter" id="in-progress" ref={provided.innerRef} {...provided.droppableProps}>
                                {
                                    toDoLists?.map((toDoList) => (
                                        toDoList.tasks.filter((task) => task.status === "in-progress").map((task, index) => (
                                            <Draggable draggableId={task.id} index={index} key={task.id}>
                                                { (provided) => (
                                                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                        <TaskCard task={task} autoSaveTask={autoSaveTask} key={task.id}/>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))
                                    ))
                                }
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId="to-check">
                            { provided => (
                                <div className="quarter" id="to-check" ref={provided.innerRef} {...provided.droppableProps}>
                                    {
                                        toDoLists?.map((toDoList) => (
                                            toDoList.tasks.filter((task) => task.status === "to-check").map((task, index) => (
                                                <Draggable draggableId={task.id} index={index} key={task.id}>
                                                    { (provided) => (
                                                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                            <TaskCard task={task} autoSaveTask={autoSaveTask} key={task.id}/>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))
                                        ))
                                    }
                                    {provided.placeholder}
                                </div>
                            )}
                    </Droppable>
                    <Droppable droppableId="done">
                            { provided => (
                                <div className="quarter" id="done" ref={provided.innerRef} {...provided.droppableProps}>
                                    {
                                        toDoLists?.map((toDoList) => (
                                            toDoList.tasks.filter((task) => task.status === "done").map((task, index) => (
                                                <Draggable draggableId={task.id} index={index} key={task.id}>
                                                    { (provided) => (
                                                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                            <TaskCard task={task} autoSaveTask={autoSaveTask} key={task.id}/>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))
                                        ))
                                    }
                                    {provided.placeholder}
                                </div>
                            )}
                    </Droppable>
                </DragDropContext>
            </div>
            
        </div>
      )
  }
  
export default Kanban
  