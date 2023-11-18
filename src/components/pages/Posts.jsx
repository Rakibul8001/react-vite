import React, { Fragment, useEffect, useState } from "react";
// import '../../Posts.css'
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import { Button, Form, Modal } from "react-bootstrap";
import "../../Milestone.css";

const Posts = () => {

  const [posts, setPost] = useState([]);
  const [items, setItems] = useState([]); // State to hold loaded items
  const [loading, setLoading] = useState(false);

  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    created_at: moment(),
  });

  useEffect(() => {
    // Get data from localStorage when the component mounts
    const storedData = localStorage.getItem("myData");
    if (storedData) {
      setPost(JSON.parse(storedData)); // Convert the stored JSON string back to an array
    }
  }, []);

  const updateLocalStorage = (newArray) => {
    // Save the updated array to localStorage
    localStorage.setItem("myData", JSON.stringify(newArray)); // Convert the array to JSON string
    setPost(newArray); // Update state with the new array
  };

  //   useEffect(() => {
  //     console.log(posts[0]?.created_at);
  //   }, [posts]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setInputData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //   console.log('inputdata', inputData)

  const handleSubmit = (e) => {
    e.preventDefault();

    // setPost([inputData, ...posts]);
    const updatedArray = [inputData, ...posts];
    updateLocalStorage(updatedArray);
    setShow(false);
  };


  return (
    <div className="container-fluid p-3">
      <div className="flex-container">
        <div className="flex-item">
          <p className="font-weight-bold">Timeline</p>
          <a href="#" className="fs-12">
            Pages/timeline
          </a>
        </div>
        <div className="flex-item">
          <Button
            className="shadow rounded fs-12"
            variant="primary"
            type="button"
            onClick={handleShow}
          >
            Add New Post
          </Button>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-12">
            <div className="text-center mb-5">
              <h3>Our Company Milestone</h3>
              <p className="fs-12">WOW !! WHAT A JOURNEY SO FAR !!</p>
            </div>
            {/* Modal */}
            <>
              {/* The Modal */}
              <Modal dialogClassName="" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>New Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicName" className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter title"
                        name="title"
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicName" className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Enter Description"
                        name="description"
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Button
                      variant="primary"
                      className="shadow rounded"
                      type="submit"
                    >
                      Save
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>
            </>

            {/* Modal */}
            {posts?.length > 0 ? (<>
            <div className="timeline timeline-line-solid">
                {
                posts.map((post, index) => (
                  <Fragment key={index}>
                    <div className="timeline-item">
                      <div className="timeline-point timeline-point" />
                      <div className="timeline-event">
                        <div className="widget has-shadow">
                          <div className="widget-body">
                            <div className="row">
                              <div className="col-md-10">
                                <h5>{post?.title}</h5>
                                <p className="text-muted">
                                  {post?.description}
                                </p>
                              </div>
                              <div className="col-md-2 border-left">
                                <p className="fs-14">{moment(post?.created_at).format("MMM")}</p>
                                <p className="font-weight-bold">
                                  <strong>
                                    {moment(post?.created_at).format("DD")}
                                  </strong>
                                </p>
                                <p className="fs-14">{moment(post?.created_at).format("YYYY")}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ))}
            
              <span className="timeline-label">
                <span className="label bg-primary">Load More</span>
              </span>
            </div>
           </> ):(
            <div className="text-center">No Posts are available !</div>
           )}

           {loading && <div className="">Loading...</div>}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;