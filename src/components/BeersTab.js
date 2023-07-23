import { Tabs, Tab } from "react-bootstrap";
import { BEERS_TABS } from "../const";
import useBeers from "../hooks/useBeers";
import useBeersDispatch from "../hooks/useBeersDispatch";
import ACTIONS from "../store/beersTab/actions";
import AddBeers from "./AddBeers";
import BeerList from "./BeerList";

export default function BeersTab() {
  const dispatchBeers = useBeersDispatch();

  const { activeTab } = useBeers();
  return (
    <div className="tabs-container">
      <Tabs
        id="beers-tab"
        className="beers-tab mb-3"
        defaultActiveKey={BEERS_TABS.ALL_BEERS}
        activeKey={activeTab}
        onSelect={(activeTab) => {
          dispatchBeers({
            type: ACTIONS.SET_ACTIVE_TAB,
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

      {activeTab === BEERS_TABS.MY_BEERS && (
        <div className="tab-action">
          <AddBeers />
        </div>
      )}
    </div>
  );
}
