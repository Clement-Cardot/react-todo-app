import './App.css'
import { TaskModel } from './models/Task.model';
import ToDoList from './components/ToDoList';
import { ToDoListModel } from './models/ToDoList.model';
import AddToDoList from './components/AddToDoList';
import NavBar from './components/NavBar';

let mockedData : ToDoListModel = new ToDoListModel("My To-Do List");
mockedData.tasks.push(new TaskModel("Task 1"));
mockedData.tasks.push(new TaskModel("Task 2"));
mockedData.tasks.push(new TaskModel("Task 3"));

mockedData.tasks[0].addSubTask(new TaskModel("SubTask 1"));

function App() {

  let toDoLists = new Array<ToDoListModel>(mockedData);

  const addToDoList = (toDoList: ToDoListModel) => {
    toDoLists.push(toDoList);
  }
  
  return (
    <>
      <NavBar AddToDoMethod={addToDoList}/>

      {
          toDoLists.map((toDoList) => (
              <div key={toDoList.id}>
                  <ToDoList toDoList={toDoList}/>
              </div>
          )
          )
      }
    </>
  )
}

export default App
