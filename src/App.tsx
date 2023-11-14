import './App.css'
import { TaskModel } from './models/Task.model';
import ToDoList from './components/ToDoList';
import { ToDoListModel } from './models/ToDoList.model';
import NavBar from './components/NavBar';
import React from 'react';

let mockedData : ToDoListModel = new ToDoListModel("My To-Do List");
mockedData.tasks.push(new TaskModel("Task 1"));
mockedData.tasks.push(new TaskModel("Task 2"));
mockedData.tasks.push(new TaskModel("Task 3"));

mockedData.tasks[0].addSubTask(new TaskModel("SubTask 1"));

function App() {

  const [toDoLists, setToDoLists] = React.useState<Array<ToDoListModel>>([mockedData]);

  const addToDoList = (newToDoList: ToDoListModel) => {
    setToDoLists(toDoLists.concat(newToDoList));
    console.log(toDoLists);
  }

  const removeToDoList = (toDoListToDelete: ToDoListModel) => {
    setToDoLists(toDoLists.filter((toDoList) => toDoList.id != toDoListToDelete.id));
    console.log(toDoLists);
  };
  
  return (
    <>
      <NavBar AddToDoMethod={addToDoList}/>

      {
        toDoLists.map((toDoList) => (
          <ToDoList key={toDoList.id} toDoList={toDoList} removeToDoList={removeToDoList}/>
        ))
      }
      
    </>
  )
}

export default App
