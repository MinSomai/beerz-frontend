import { Button, Row, Col, Form, Modal, InputGroup, Image } from "react-bootstrap";
import useAddBeers from "../hooks/useAddBeers";

function AddBeers() {
  const { isShowAddBeerModal, validated, handleSubmit, handleOpen, handleClose } = useAddBeers();

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
              <Form.Group as={Col} md="12" controlId="beerImage" className="pb-3">
                <Image className="add-beer-image border px-3" src="./beerz.png" rounded />
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="beerNameValidation" className="pb-3">
                <Form.Label>Beer name</Form.Label>
                <Form.Control name="beerName" required type="text" placeholder="Beer name*" />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">Beer name is required.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="beerGenreValidation" className="pb-3">
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
              <Col className="d-flex gap-2">
                <Button onClick={handleClose} className="ml-auto mr-2" variant="secondary">
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
