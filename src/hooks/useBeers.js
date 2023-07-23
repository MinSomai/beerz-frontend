import { useContext, useMemo } from "react";
import BeersContext from "../contexts/BeersContext";
import { BEERS_TABS } from "../const";
import ACTIONS from "../store/beersTab/actions";
import useBeersDispatch from "./useBeersDispatch";
import { getBeers } from "../services/beers.services";
import PunkApiParser from "../utils/PunkApiParser";

export default function useBeers() {
  const apiParser = new PunkApiParser();
  const dispatch = useBeersDispatch();
  const state = useContext(BeersContext);
  const beers = useMemo(() => {
    if (state.activeTab === BEERS_TABS.MY_BEERS) {
      return state?.myBeers;
    }

    if (state.activeTab === BEERS_TABS.ALL_BEERS) {
      return state?.beers;
    }
  }, [state]);

  const fetchData = async ({ page = 1, limit = 10 } = {}) => {
    try {
      dispatch({
        type: ACTIONS.SET_IS_LOADING,
        isLoading: true,
      });
      const beers = await getBeers({ page, limit });
      const parsedBeers = apiParser.parseBeersList(beers);
      dispatch({
        type: ACTIONS.ADD_BULK_BEERS,
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
  };

  const handlePagination = () => {
    const { pagination } = state;
    const newPagination = {
      page: pagination.page + 1,
      limit: 10,
    };
    fetchData(newPagination);
  };

  return {
    ...state,
    beers,
    handlePagination,
  };
}
