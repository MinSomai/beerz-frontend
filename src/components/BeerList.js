import { Button, Row, Col, Spinner } from "react-bootstrap";
import { BEERS_TABS } from "../const";
import useBeers from "../hooks/useBeers";
import useBeersDispatch from "../hooks/useBeersDispatch";
import ACTIONS from "../store/beersTab/actions";
import EachBeer from "./EachBeer";

export default function BeerList() {
  const dispatch = useBeersDispatch();

  const { beers, isLoading, activeTab, handlePagination } = useBeers();

  return (
    <Row xs={1} md={12} className="g-4">
      <Row xs={1} md={12} className="g-4">
        {beers?.map((eachBeer, idx) => (
          <Col key={idx} md={6}>
            <EachBeer beer={eachBeer} />
          </Col>
        ))}
      </Row>

      {!isLoading && activeTab === BEERS_TABS.MY_BEERS && (beers?.length == 0 || !beers) && (
        <div className="empty-placeholder">
          <div className="text-center">
            <p className="mb-0">Nothing to see yet.</p>
            <p>
              <Button
                onClick={() => {
                  dispatch({
                    type: ACTIONS.SET_IS_SHOW_ADD_BEER_MOBEL,
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
          <Button onClick={handlePagination} variant="link" className="text-center">
            {isLoading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <>
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
              </>
            )}
          </Button>
        </div>
      )}
    </Row>
  );
}
