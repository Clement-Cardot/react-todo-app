import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';

type Props = {
    actualPriority: "High" | "Medium" | "Low" | null;
    setPriority: (newPriority: "High" | "Medium" | "Low" | null) => void;
}

const PrioritySelector: React.FC<Props> = (props: Props) => {

    const setPriority = (priority: any) => {
        props.setPriority(priority);
    }; 

    return (
        <Dropdown className="spanDiv" onSelect={setPriority}>
            {
                props.actualPriority ?
                    <Dropdown.Toggle className={"btn badge rounded-pill tag text-bg-"+props.actualPriority} variant="false" id="dropdown-basic" > 
                        {props.actualPriority}
                    </Dropdown.Toggle>
                :
                    <Dropdown.Toggle className={"btn badge rounded-circle newSpan"} variant="false" id="dropdown-basic" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                    </Dropdown.Toggle>
            }

            <Dropdown.Menu>
                <Dropdown.Item className="badge rounded-pill tag text-bg-High" type="button" eventKey="High">High</Dropdown.Item>
                <Dropdown.Item className="badge rounded-pill tag text-bg-Medium" type="button" eventKey="Medium">Medium</Dropdown.Item>
                <Dropdown.Item className="badge rounded-pill tag text-bg-Low" type="button" eventKey="Low">Low</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
};

export default PrioritySelector;