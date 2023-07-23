import { Card } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default function EachBeer({ beer }) {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Ingredients: {Array.from(beer?.ingredients ?? [])?.length > 0 ? Array.from(beer?.ingredients)?.join(", ") : "N/A"}
    </Tooltip>
  );

  return (
    <Card className="beer-card h-100 shadow border-0 radius-0">
      <OverlayTrigger placement="top" overlay={renderTooltip}>
        <Card.Img className="p-2 my-auto" alt="hourzz beer" variant="top" src={`${beer.imageURL ?? "./beerz.png"}`} />
      </OverlayTrigger>
      <Card.Body className="text-left py-4">
        <Card.Title>{beer?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{beer?.genre}</Card.Subtitle>
        <Card.Text className="line-clamp">{beer?.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
