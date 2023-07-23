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

      const updatedMyBeers = [...(state.myBeers ?? []), newBeer];
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
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
