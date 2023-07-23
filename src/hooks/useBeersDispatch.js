import { useContext } from "react";
import BeersDispatchContext from "../contexts/BeersDispatchContext";

export default function useBeersDispatch() {
  return useContext(BeersDispatchContext);
}
