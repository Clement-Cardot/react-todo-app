import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';

type Props = {
    actualStatus: "todo" | "in-progress" | "testing" | "done";
    setStatus: (newStatus: "todo" | "in-progress" | "testing" | "done") => void;
}

const KanbanSelector: React.FC<Props> = (props: Props) => {

    const setStatus = (status: any) => {
        props.setStatus(status);
    }; 

    return (
        <Dropdown className="spanDiv" onSelect={setStatus}>
            {
                props.actualStatus ?
                    <Dropdown.Toggle className={"btn badge rounded-pill tag " + props.actualStatus} variant="false" id="dropdown-basic"> 
                        {props.actualStatus}
                    </Dropdown.Toggle>
                :
                    <Dropdown.Toggle className="btn badge rounded-circle newSpan" variant="false" id="dropdown-basic" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                    </Dropdown.Toggle>
            }

            <Dropdown.Menu>
                <Dropdown.Item className="badge rounded-pill tag todo" type="button" eventKey="todo">to-do</Dropdown.Item>
                <Dropdown.Item className="badge rounded-pill tag in-progress" type="button" eventKey="in-progress">in progress</Dropdown.Item>
                <Dropdown.Item className="badge rounded-pill tag testing" type="button" eventKey="testing">testing</Dropdown.Item>
                <Dropdown.Item className="badge rounded-pill tag done" type="button" eventKey="done">done</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
};

export default KanbanSelector;