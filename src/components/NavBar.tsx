import { DarkModeToggle, Mode } from "@anatoliygatt/dark-mode-toggle";
import { ToDoListModel } from "../models/ToDoList.model";
import AddToDoList from "./AddToDoList";
import React, { useEffect } from "react";

type Props = {
    AddToDoMethod: (toDoList: ToDoListModel) => void;
};

const NavBar : React.FC<Props> = (props: Props) => {

    const [mode, setMode] = React.useState<Mode>('light');

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', mode)
    }, [mode]);

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

                <DarkModeToggle
                    mode={mode}
                    dark="Dark"
                    light="Light"
                    size="md"
                    inactiveTrackColor="#e2e8f0"
                    inactiveTrackColorOnHover="#f8fafc"
                    inactiveTrackColorOnActive="#cbd5e1"
                    activeTrackColor="#334155"
                    activeTrackColorOnHover="#1e293b"
                    activeTrackColorOnActive="#0f172a"
                    inactiveThumbColor="#1e293b"
                    activeThumbColor="#e2e8f0"
                    onChange={(mode) => {
                        setMode(mode);
                    }}
                    />
        </nav>
    );
};

export default NavBar;