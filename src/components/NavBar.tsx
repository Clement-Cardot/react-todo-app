import { DarkModeToggle, Mode } from "@anatoliygatt/dark-mode-toggle";
import { ToDoListModel } from "../models/ToDoList.model";
import AddToDoList from "./AddToDoList";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {

    const [mode, setMode] = React.useState<Mode>('light');

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

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', mode)
    }, [mode]);

    return (
        <nav className="navbar navbar-expand-lg mb-3 ps-5 pe-5">
                <a className="navbar-brand" href="/">✅</a>

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