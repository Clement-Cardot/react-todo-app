import { ToDoListModel } from "../models/ToDoList.model";
import AddToDoList from "./AddToDoList";

type Props = {
    AddToDoMethod: (toDoList: ToDoListModel) => void;
};

const NavBar : React.FC<Props> = (props: Props) => {
    return (
        <nav className="navbar navbar-expand-lg mb-3">
                <a className="navbar-brand" href="#">✅</a>

                <ul className="navbar-nav flex-row me-auto">
                    <li className="nav-item me-3">
                        <a className="nav-link active" aria-current="page" href="#">To-Do App</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Menu Item 1</a>
                    </li>
                </ul>

                <AddToDoList AddToDoMethod={props.AddToDoMethod}/>
        </nav>
    );
};

export default NavBar;