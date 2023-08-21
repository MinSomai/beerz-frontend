import { v4 as uuidv4 } from "uuid";
import ACTIONS from "./actions";

export default function beersReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_MY_BEER: {
      const newBeer = {
        name: action.name,
        description: action.description,
        genre: action.genre,
        id: uuidv4(),
      };

      const updatedMyBeers = [newBeer, ...(state.myBeers ?? [])];
      localStorage.setItem("myBeers", JSON.stringify(updatedMyBeers));

      return {
        ...state,
        myBeers: updatedMyBeers,
      };
    }
    case ACTIONS.INIT_MY_BEERS: {
      return {
        ...state,
        myBeers: action.myBeers,
      };
    }
    case ACTIONS.INIT_BEERS: {
      return {
        ...state,
        beers: action.beers,
      };
    }
    case ACTIONS.ADD_BULK_BEERS: {
      const updatedBeers = [...(state.beers ?? []), ...(action?.beers ?? [])];

      return {
        ...state,
        beers: updatedBeers,
        pagination: {
          page: action.page,
          limit: action.limit,
        },
      };
    }
    case ACTIONS.SET_ACTIVE_TAB: {
      return {
        ...state,
        activeTab: action.activeTab,
      };
    }
    case ACTIONS.SET_IS_SHOW_ADD_BEER_MOBEL: {
      return {
        ...state,
        isShowAddBeerModal: action.isShowAddBeerModal,
      };
    }
    case ACTIONS.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
