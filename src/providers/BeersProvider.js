import { v4 as uuidv4 } from "uuid";
import { useReducer } from "react";
import { BEERS_TABS } from "../const";
import beersReducer from "../store/beersTab/reducers";
import BeersContext from "../contexts/BeersContext";
import BeersDispatchContext from "../contexts/BeersDispatchContext";

const initialState = {
  beers: [
    { id: uuidv4(), name: "Hanoi Beer", genre: "IPA Vietnamese", description: "The pride" },
    { id: uuidv4(), name: "Alplha Pale Ale", genre: "Blonde Ale Australian", description: "Browser 7583" },
  ],
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

  return (
    <BeersContext.Provider value={state}>
      <BeersDispatchContext.Provider value={dispatch}>{children}</BeersDispatchContext.Provider>
    </BeersContext.Provider>
  );
}
