import { Button, Row, Col, Card, Spinner } from "react-bootstrap";
import { BEERS_TABS } from "../const";
import { useBeers, useBeersDispatch } from "../store/BeersContext";

export default function BeerList() {
  const dispatch = useBeersDispatch();

  const { beers, isLoading, activeTab } = useBeers();

  return (
    <Row xs={1} md={12} className="g-4">
      <div>
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Row xs={1} md={12} className="g-4">
            {beers?.map((eachBeer, idx) => (
              <Col key={idx}>
                <EachBeer beer={eachBeer} />
              </Col>
            ))}
          </Row>
        )}
      </div>

      {!isLoading && (beers?.length == 0 || !beers) && (
        <div className="empty-placeholder">
          <div className="text-center">
            <p className="mb-0">Nothing to see yet.</p>
            <p>
              <Button
                onClick={() => {
                  dispatch({
                    type: "setIsShowAddBeerModal",
                    isShowAddBeerModal: true,
                  });
                }}
                variant="link"
                size="sm"
              >
                Click here
              </Button>
              to add your first beer!
            </p>
          </div>
        </div>
      )}

      {activeTab === BEERS_TABS.ALL_BEERS && (
        <div className="text-center">
          <Button variant="link">
            Load More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              className="icon icon-tabler icon-tabler-chevron-down"
              viewBox="0 0 24 24"
            >
              <path stroke="none" d="M0 0h24v24H0z"></path>
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </Button>
        </div>
      )}
    </Row>
  );
}

function EachBeer({ beer }) {
  // const dispatch = useTasksDispatch();
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
