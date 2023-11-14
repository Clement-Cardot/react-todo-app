import './App.css';
import ToDoList from './components/ToDoList';
import { ToDoListModel } from './models/ToDoList.model';
import NavBar from './components/NavBar';
import React, { useEffect } from 'react';

function App() {

  const [toDoLists, setToDoLists] = React.useState<Array<ToDoListModel>>();

  useEffect(() => {
    if (!toDoLists) {
      let data = localStorage.getItem("data");
      if (data) {
        let parsedData = JSON.parse(data);
        setToDoLists(parsedData as Array<ToDoListModel>);
      }
      else setToDoLists([]);
    }
    else {
      localStorage.setItem("data", JSON.stringify(toDoLists));
    }
  }, [toDoLists]);

  const addToDoList = (newToDoList: ToDoListModel) => {
    setToDoLists(toDoLists?.concat(newToDoList));
    console.log(toDoLists);
  }

  const removeToDoList = (toDoListToDelete: ToDoListModel) => {
    setToDoLists(toDoLists?.filter((toDoList) => toDoList.id != toDoListToDelete.id));
    console.log(toDoLists);
  };
  
  return (
    <>
      <NavBar AddToDoMethod={addToDoList}/>

      {
        toDoLists?.map((toDoList) => (
          <ToDoList key={toDoList.id} toDoList={toDoList} removeToDoList={removeToDoList}/>
        ))
      }
      
    </>
  )
}

export default App
