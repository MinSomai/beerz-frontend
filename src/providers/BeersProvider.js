import { v4 as uuidv4 } from "uuid";
import { useReducer, useEffect } from "react";
import { BEERS_TABS } from "../const";
import beersReducer from "../store/beersTab/reducers";
import BeersContext from "../contexts/BeersContext";
import BeersDispatchContext from "../contexts/BeersDispatchContext";
import { getBeers } from "../services/beers.services";
import PunkApiParser from "../utils/PunkApiParser";
import ACTIONS from "../store/beersTab/actions";

const initialState = {
  beers: [],
  myBeers: [],
  isLoading: false,
  pagination: {
    page: 1,
    limit: 10,
  },
  activeTab: BEERS_TABS.ALL_BEERS,
  isShowAddBeerModal: false,
};

export default function BeersProvider({ children }) {
  const [state, dispatch] = useReducer(beersReducer, initialState);
  const apiParser = new PunkApiParser();

  useEffect(() => {
    async function fetchData({ page = 1, limit = 10 } = {}) {
      try {
        dispatch({
          type: ACTIONS.SET_IS_LOADING,
          isLoading: true,
        });
        const beers = await getBeers({ page, limit });
        const parsedBeers = apiParser.parseBeersList(beers);
        console.log(parsedBeers);
        dispatch({
          type: ACTIONS.INIT_BEERS,
          beers: parsedBeers,
        });
      } catch (e) {
        // TODO: handle errors/toast
        console.log("Error fetching data.", e);
      } finally {
        dispatch({
          type: ACTIONS.SET_IS_LOADING,
          isLoading: false,
        });
      }
    }
    fetchData({ page: 1, limit: 10 });
  }, []);


  return (
    <BeersContext.Provider value={state}>
      <BeersDispatchContext.Provider value={dispatch}>{children}</BeersDispatchContext.Provider>
    </BeersContext.Provider>
  );
}
