import React, { useEffect, useState } from "react";
import { Tag } from "../models/Tag.model";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";

type Props = {
    actualTag: Tag | null;
    setTag: (newTag: Tag | null) => void;
}

const TagSelector: React.FC<Props> = (props: Props) => {
    const [tagList, setTagList] = React.useState<Array<Tag>>();

    const [showModal, setShowModal] = useState(false);

    const [tagName, setTagName] = useState('');
    const [tagBackgroundColor, setTagBackgroundColor] = useState('#CDB1F7');
    const [tagTextColor, setTagTextColor] = useState('#FFFFFF');

    useEffect(() => {
        if (!tagList) {
          let data = localStorage.getItem("tags");
          if (data) {
            let parsedData = JSON.parse(data);
            setTagList(parsedData as Array<Tag>);
          }
          else setTagList([]);
        }
        else {
          localStorage.setItem("tags", JSON.stringify(tagList));
        }
      }, [tagList]);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleTagNameChange = (event: any) => {
        setTagName(event.target.value);
    };

    const handleTextColorChange = (event: any) => {
        setTagTextColor(event.target.value);
    };

    const handleBackgroundColorChange = (event: any) => {
        setTagBackgroundColor(event.target.value);
    };

    const confirmModal = () => {
        const newTag: Tag = new Tag(tagName, tagBackgroundColor, tagTextColor);
        setTagList(tagList?.concat(newTag));
        setTag(newTag);
        handleCloseModal();
    };

    const setTag = (newTag: Tag | null) => {
        props.setTag(newTag);
    };

    return (
        <>
            <Dropdown className="spanDiv">
                {
                    props.actualTag ?
                        <Dropdown.Toggle 
                            className="btn badge rounded-pill tag"
                            style={{backgroundColor: props.actualTag.backgroundColor, color: props.actualTag.textColor}}
                            variant="false" 
                            id="dropdown-basic">

                            {props.actualTag.name}
                        </Dropdown.Toggle>
                    :
                        <Dropdown.Toggle className={"btn badge rounded-circle newSpan"} variant="false" id="dropdown-basic">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                        </Dropdown.Toggle>
                }
                <Dropdown.Menu>
                    <Dropdown.Item className="badge rounded-pill text-bg-new" type="button" onClick={handleShowModal}>
                        New
                    </Dropdown.Item>
                    {
                        tagList?.map((tag) => {
                            return (
                                <Dropdown.Item 
                                    className="badge rounded-pill tag"
                                    style={{backgroundColor: tag.backgroundColor, color: tag.textColor}}
                                    key={tag.id} 
                                    type="button" 
                                    onClick={() => setTag(tag)}>

                                    {tag.name}
                                </Dropdown.Item>
                            )
                        })
                    }
                </Dropdown.Menu>
            </Dropdown>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                <Modal.Title>Tag Creation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label htmlFor="inputTagName">Tag Name</Form.Label>
                        <Form.Control
                            type="text"
                            id="inputTagName"
                            value={tagName}
                            onChange={handleTagNameChange}
                        />
                        <div className="d-flex justify-content-evenly m-3">
                            <div>
                                <Form.Label htmlFor="backgroundColorInput">Tag BackGround Color</Form.Label>
                                <Form.Control
                                    type="color"
                                    id="backgroundColorInput"
                                    title="Choose your color"
                                    value={tagBackgroundColor}
                                    onChange={handleBackgroundColorChange}
                                />
                            </div>
                            <div>
                                <Form.Label htmlFor="textColorInput">Tag Text Color</Form.Label>
                                <Form.Control
                                    type="color"
                                    id="textColorInput"
                                    title="Choose your color"
                                    value={tagTextColor}
                                    onChange={handleTextColorChange}
                                />
                            </div>
                        </div>
                        
                    </Form>
                    <div className="d-flex justify-content-center align-items-baseline gap-3">
                        <p>Example :</p>
                        <span className="badge rounded-pill tag" style={{backgroundColor: tagBackgroundColor, color: tagTextColor}}>
                            {tagName}
                        </span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={confirmModal}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default TagSelector;