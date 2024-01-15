import ToDoList from '../components/ToDoList';
import { ToDoListModel } from '../models/ToDoList.model';
import React, { useEffect } from 'react';

type Props = {
  newListEvent: () => void;
}

function App() {

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

  const removeToDoList = (toDoListToDelete: ToDoListModel) => {
    setToDoLists(toDoLists?.filter((toDoList) => toDoList.id !== toDoListToDelete.id));
    console.log(toDoLists);
  };

  const autoSave = (toDoListToSave: ToDoListModel) => {
    let index = toDoLists?.findIndex((toDoList) => toDoList.id === toDoListToSave.id);
    if(index !== undefined && index !== -1){
      let newToDoLists = [...(toDoLists || [])]; // Add null check here
      newToDoLists[index] = toDoListToSave;
      setToDoLists(newToDoLists);
    }
    console.log(toDoLists);
  };
  
  return (
    <div className='body'>
      {
        toDoLists?.map((toDoList) => (
          <ToDoList key={toDoList.id} toDoList={toDoList} removeToDoList={removeToDoList} autoSave={autoSave}/>
        ))
      }
    </div>
  )
}

export default App
