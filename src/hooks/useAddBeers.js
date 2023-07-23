// import { useBeers, useBeersDispatch } from "../../../../store/BeersContext";
import useBeers from "./useBeers";
import useBeersDispatch from "./useBeersDispatch";
import { useState, useEffect } from "react";
import ACTIONS from "../store/beersTab/actions";

/*
 * useAddBeers hooks is a companion hook for AddBeers component
 */
export default function useAddBeers() {
  const { isShowAddBeerModal } = useBeers();
  const dispatch = useBeersDispatch();

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      return;
    }

    setValidated(true);

    const formData = new FormData(form);

    // NOTE: for API implementation, make an create API call before dispatching
    dispatch({
      type: ACTIONS.ADD_MY_BEER,
      name: formData.get("beerName"),
      genre: formData.get("genre"),
      description: formData.get("description"),
    });

    setValidated(false);
    handleClose();
  };

  useEffect(() => {
    const savedMyBeers = localStorage.getItem("myBeers");
    if (savedMyBeers && savedMyBeers != "undefined") {
      dispatch({
        type: ACTIONS.INIT_MY_BEERS,
        myBeers: JSON.parse(savedMyBeers ?? []),
      });
    }
  }, [dispatch]);

  const handleClose = () => {
    dispatch({
      type: ACTIONS.SET_IS_SHOW_ADD_BEER_MOBEL,
      isShowAddBeerModal: false,
    });
  };

  const handleOpen = () => {
    dispatch({
      type: ACTIONS.SET_IS_SHOW_ADD_BEER_MOBEL,
      isShowAddBeerModal: true,
    });
  };

  return {
    handleSubmit,
    handleClose,
    handleOpen,
    validated,
    isShowAddBeerModal,
  };
}
