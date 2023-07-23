import { Button, Row, Col, Form, Modal, InputGroup } from "react-bootstrap";
import { useBeers, useBeersDispatch } from "../store/BeersContext";
import { useState, useEffect } from "react";

function AddBeers() {
  const { isShowAddBeerModal, myBeers } = useBeers();
  const dispatch = useBeersDispatch();

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      return;
    }

    setValidated(true);

    const formData = new FormData(form);

    dispatch({
      type: "addMyBeer",
      name: formData.get("beerName"),
      genre: formData.get("genre"),
      description: formData.get("description"),
    });

    setValidated(false);
    handleClose();
  };

  useEffect(() => {
    const savedMyBeers = localStorage.getItem("myBeers");
    if (savedMyBeers && savedMyBeers != "undefined") {
      dispatch({
        type: "initializeMyBeers",
        myBeers: JSON.parse(savedMyBeers ?? []),
      });
    }
  }, [dispatch]);

  const handleClose = () => {
    dispatch({
      type: "setIsShowAddBeerModal",
      isShowAddBeerModal: false,
    });
  };

  const handleOpen = () => {
    dispatch({
      type: "setIsShowAddBeerModal",
      isShowAddBeerModal: true,
    });
  };

  return (
    <div>
      <Button variant="primary" onClick={handleOpen} className="mb-3">
        Add a new beer
      </Button>

      <Modal show={isShowAddBeerModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="beerNameValidation">
                <Form.Label>Beer name</Form.Label>
                <Form.Control name="beerName" required type="text" placeholder="Beer name*" />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Beer name is required.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="beerGenreValidation">
                <Form.Label>Genre</Form.Label>
                <Form.Control name="genre" required type="text" placeholder="Genre*" />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Genre is required.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="12" controlId="descriptionValidation">
                <Form.Label>Description</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    as="textarea"
                    name="description"
                    placeholder="Decription*"
                    aria-describedby="beer-description"
                    required
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">Description is required.</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Col></Col>
              <Col className="d-flex">
                <Button onClick={handleClose} className="ml-auto mr-2">
                  Cancel
                </Button>
                <Button type="submit">Submit form</Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AddBeers;
