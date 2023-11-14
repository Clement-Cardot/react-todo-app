import './App.css'
import { TaskModel } from './core/Task.model';
import ToDoList from './components/ToDoList';
import { ToDoListModel } from './core/ToDoList.model';
import AddToDoList from './components/AddToDoList';

let mockedData : ToDoListModel = new ToDoListModel("My ToDo List");
mockedData.tasks.push(new TaskModel("Task 1", "Description 1"));
mockedData.tasks.push(new TaskModel("Task 2", "Description 2"));
mockedData.tasks.push(new TaskModel("Task 3", "Description 3"));

mockedData.tasks[0].addSubTask(new TaskModel("SubTask 1", "SubDescription 1"));

function App() {

  let toDoLists = new Array<ToDoListModel>(mockedData);

  const addToDoList = (toDoList: ToDoListModel) => {
    toDoLists.push(toDoList);
  }
  
  return (
    <>
      <h1 className='mb-5'>✅ TODO App</h1>

      <AddToDoList AddToDoMethod={addToDoList}/>

      {
          toDoLists.map((toDoList) => (
              <div className="card" key={toDoList.id}>
                  <ToDoList toDoList={toDoList}/>
              </div>
          )
          )
      }
    </>
  )
}

export default App
