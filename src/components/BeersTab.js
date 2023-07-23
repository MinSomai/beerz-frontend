import { Tabs, Tab } from "react-bootstrap";
import { BEERS_TABS } from "../const";
import { useBeers, useBeersDispatch } from "../store/BeersContext";
import AddBeers from "./AddBeers";
import BeerList from "./BeerList";

export default function BeersTab() {
  const dispatch = useBeersDispatch();

  const { activeTab } = useBeers();
  return (
    <>
      <div className="tabs-container">
        <Tabs
          defaultActiveKey={BEERS_TABS.ALL_BEERS}
          id="beers-tab"
          className="mb-3"
          activeKey={activeTab}
          onSelect={(activeTab) => {
            dispatch({
              type: "setActiveTab",
              activeTab,
            });
          }}
        >
          <Tab eventKey={BEERS_TABS.ALL_BEERS} title="All Beers">
            <BeerList />
          </Tab>
          <Tab eventKey={BEERS_TABS.MY_BEERS} title="My Beers">
            <BeerList />
          </Tab>
        </Tabs>

        <div className="tab-action">
          <AddBeers />
        </div>
      </div>
    </>
  );
}
