import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../../redux/apiCalls/postApiCall";
import { Modal, Button } from "react-bootstrap";

const UpdatePostModal = ({ post, setUpdatePost }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);

    const handleUpdate = () => {
        dispatch(updatePost(post._id, { title, description }));
        setUpdatePost(false);
    };

    return (
        <Modal show onHide={() => setUpdatePost(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Update Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <label htmlFor="postTitle" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="postTitle"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="postDescription" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="postDescription"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setUpdatePost(false)}>
                    Close
                </Button>
                <Button variant="dark" onClick={handleUpdate}>
                    Save changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdatePostModal;