import { useContext, useMemo } from "react";
import BeersContext from "../contexts/BeersContext";
import { BEERS_TABS } from "../const";

export default function useBeers() {
  const state = useContext(BeersContext);
  const beers = useMemo(() => {
    if (state.activeTab == BEERS_TABS.MY_BEERS) {
      return state?.myBeers;
    }

    if (state.activeTab == BEERS_TABS.ALL_BEERS) {
      return state?.beers;
    }
  });

  return {
    ...state,
    beers,
  };
}
