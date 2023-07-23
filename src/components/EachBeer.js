import { Card } from "react-bootstrap";

export default function EachBeer({ beer }) {
  return (
    <Card className="beer-card">
      <Card.Img alt="hourzz beer" variant="top" src="./beerz.png" />
      <Card.Body className="text-left py-4">
        <Card.Title>{beer?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{beer?.genre}</Card.Subtitle>
        <Card.Text>{beer?.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
