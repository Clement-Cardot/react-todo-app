import { DarkModeToggle, Mode } from "@anatoliygatt/dark-mode-toggle";
import { ToDoListModel } from "../models/ToDoList.model";
import AddToDoList from "./AddToDoList";
import React, { useEffect } from "react";


const NavBar : React.FC = () => {

    const [mode, setMode] = React.useState<Mode>('light');

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

    const addToDoList = (newToDoList: ToDoListModel) => {
        setToDoLists(toDoLists?.concat(newToDoList));
        console.log(toDoLists);
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', mode)
    }, [mode]);

    return (
        <nav className="navbar navbar-expand-lg mb-3 ps-5 pe-5">
                <a className="navbar-brand" href="#">✅</a>

                <ul className="navbar-nav flex-row me-auto">
                    <li className="nav-item me-3">
                        <a className="nav-link" aria-current="page" href="/">Donify</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/kanban">KanBan</a>
                    </li>
                </ul>

                <AddToDoList AddToDoMethod={addToDoList}/>

                <DarkModeToggle
                    mode={mode}
                    dark="Dark"
                    light="Light"
                    size="md"

                    inactiveTrackColor="#1C2833"
                    inactiveTrackColorOnHover="#1e293b"
                    inactiveTrackColorOnActive="#0f172a"

                    inactiveLabelColor="#D5DBDB"
                    inactiveLabelColorOnHover="#FFFFFF"
                    inactiveLabelColorOnActive="#FFFFFF"

                    activeTrackColor="#e2e8f0"
                    activeTrackColorOnHover="#f8fafc"
                    activeTrackColorOnActive="#cbd5e1"

                    activeLabelColor="#D5DBDB"
                    activeLabelColorOnHover="#FFFFFF"
                    activeLabelColorOnActive="#FFFFFF"

                    inactiveThumbColor="#e2e8f0"
                    activeThumbColor="#1e293b"
                    onChange={(mode) => {
                        setMode(mode);
                    }}
                    />
        </nav>
    );
};

export default NavBar;