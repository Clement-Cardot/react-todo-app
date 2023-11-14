import React from "react";
import { ToDoListModel } from "../models/ToDoList.model";
import ToDoList from "./ToDoList";

type Props = {
    AddToDoMethod: (toDoList: ToDoListModel) => void;
}

let newToDoList: ToDoListModel = new ToDoListModel("");

const AddToDoList: React.FC<Props> = (props: Props) => {

    const [change, setChange] = React.useState('');

    return (
        <>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Modal">
            New
        </button>

        <div className="modal fade" id="Modal" aria-labelledby="ModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="ModalLabel">Create To-Do List</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <ToDoList toDoList={newToDoList}/>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div>
            </div>
        </div>
        </div>
        </>
    );
};

export default AddToDoList;