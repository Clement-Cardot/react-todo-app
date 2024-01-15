import { useNavigate } from 'react-router-dom';
import AddToDoList from '../components/AddToDoList';
import ToDoList from '../components/ToDoList';
import { ToDoListModel } from '../models/ToDoList.model';
import React, { useEffect } from 'react';

type Props = {
  newListEvent: () => void;
}

function App() {

  const [toDoListsDB, setToDoListsDB] = React.useState<Array<ToDoListModel>>();

  const navigate = useNavigate();

  useEffect(() => {
    if (!toDoListsDB) {
      let data = localStorage.getItem("toDoLists");
      if (data) {
        let parsedData = JSON.parse(data);
        setToDoListsDB(parsedData as Array<ToDoListModel>);
      }
      else setToDoListsDB([]);
    }
    else {
      localStorage.setItem("toDoLists", JSON.stringify(toDoListsDB));
    }
  }, [toDoListsDB]);

  const removeToDoList = (toDoListToDelete: ToDoListModel) => {
    setToDoListsDB(toDoListsDB?.filter((toDoList) => toDoList.id !== toDoListToDelete.id));
  };

  const autoSave = (toDoListToSave: ToDoListModel) => {
    let index = toDoListsDB?.findIndex((toDoList) => toDoList.id === toDoListToSave.id);
    if(index !== undefined && index !== -1){
      let newToDoLists = [...(toDoListsDB || [])]; // Add null check here
      newToDoLists[index] = toDoListToSave;
      setToDoListsDB(newToDoLists);
    }
  };

  const addToDoList = (newToDoList: ToDoListModel) => {
    let data = localStorage.getItem("toDoLists");
    let toDoLists: ToDoListModel[] = [];
    if (data) {
        let parsedData = JSON.parse(data);
        toDoLists = parsedData as Array<ToDoListModel>;
    }

    setToDoListsDB(toDoLists.concat(newToDoList));
    // refresh
    navigate(0)
}
  
  return (
    <div className='body'>
      {
        toDoListsDB && toDoListsDB.length > 0 ?
        toDoListsDB?.map((toDoList) => (
          <ToDoList key={toDoList.id} toDoList={toDoList} removeToDoList={removeToDoList} autoSave={autoSave}/>
        )):
        <div className='d-flex flex-column align-items-center'>
          <h1>Your session is empty !</h1>
          <br />
          <div className='d-flex'>
            <h3 className='me-3'>Click here to create your first list :</h3>
            <AddToDoList AddToDoMethod={addToDoList}/>
          </div>
          
        </div>
      }
    </div>
  )
}

export default App
