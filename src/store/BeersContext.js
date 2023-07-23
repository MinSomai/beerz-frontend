import { v4 as uuidv4 } from "uuid";
import { createContext, useContext, useMemo, useReducer } from "react";
import { BEERS_TABS } from "../const";

const initialState = {
  beers: [
    { id: uuidv4(), name: "Hanoi Beer", genre: "IPA Vetnamese", description: "fdafdsafdafdsaf" },
    { id: uuidv4(), name: "Drink matcha", genre: "test", description: "dfasfdsaf" },
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

const BeersContext = createContext(null);

const BeersDispatchContext = createContext(null);

export function BeersProvider({ children }) {
  const [state, dispatch] = useReducer(beersReducer, initialState);

  return (
    <BeersContext.Provider value={state}>
      <BeersDispatchContext.Provider value={dispatch}>{children}</BeersDispatchContext.Provider>
    </BeersContext.Provider>
  );
}

export function useBeers() {
  const state = useContext(BeersContext);
  const beers = useMemo(() => {
    if (state.activeTab == BEERS_TABS.MY_BEERS) {
      return state?.myBeers;
    }

    if (state.activeTab == BEERS_TABS.ALL_BEERS) {
      return state?.beers;
    }
  });

  // const myBeers = useMemo(() => {
  //   return;
  // });

  return {
    ...state,
    beers,
  };
}

export function useBeersDispatch() {
  return useContext(BeersDispatchContext);
}

function beersReducer(state, action) {
  switch (action.type) {
    case "addMyBeer": {
      const newBeer = {
        name: action.name,
        description: action.description,
        genre: action.genre,
        id: uuidv4(),
      };

      const updatedMyBeers = [...(state.myBeers ?? []), newBeer];
      localStorage.setItem("myBeers", JSON.stringify(updatedMyBeers));

      return {
        ...state,
        myBeers: updatedMyBeers,
      };
    }
    case "initializeMyBeers": {
      return {
        ...state,
        myBeers: action.myBeers,
      };
    }
    case "setActiveTab": {
      return {
        ...state,
        activeTab: action.activeTab,
      };
    }
    case "setIsShowAddBeerModal": {
      return {
        ...state,
        isShowAddBeerModal: action.isShowAddBeerModal,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
