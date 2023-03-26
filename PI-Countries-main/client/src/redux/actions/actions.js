import {
  GET_ALL_COUNTRIES,
  GET_ACTIVITY,
  FIND_COUNTRIES,
  COUNTRIES_DETAIL,
  FILTER_BY_CONTINENT,
  FILTER_BY_ACTIVITY,
  ORDER_BY_NAME,
  ORDER_BY_POPULATION,
} from "./actions-type.js";

import axios from "axios";
const apiUrl = "http://localhost:3001";

export const getAllCountries = () => {
  return async function (dispatch) {
    const json = await axios.get(`${apiUrl}/countries`);
    const data = json.data;
    return dispatch({
      type: GET_ALL_COUNTRIES,
      payload: data,
    });
  };
};

export const findCountries = (payload) => {
  return async function (dispatch) {
    try {
      const json = await axios.get(`${apiUrl}/countries?name=${payload}`);
      const data = json.data;
      return dispatch({ type: FIND_COUNTRIES, payload: data }); //VA A HACER UN DISPATCH DE UN OBJETO DE UNA PROPIEDAD OBLIGATORIA "TYPE" DE GET CHARACTERS POR QUE TE QUERES TRAER A TODOS LOS PERSONAJES. TAMBIEN SE DIFERENCIAN AXIOS DE FETCH. CUANDO NOSOTROS TENEMOS AXIOS TENEMOS A "RESPONSE" UN OBJETO CON MUCHA INFO DE TODO ESO NOS QUEDMAOS CON DATA.
    } catch (error) {
      return alert(error.response.data);
    }
  };
};
export const countriesDetail = (id) => {
  return async function (dispatch) {
    const json = await axios.get(`${apiUrl}/Countries/${id}`);
    const data = json.data;
    return dispatch({ type: COUNTRIES_DETAIL, payload: data });
  };
};
export const getActivity = () => {
  return async function (dispatch) {
    const json = await axios.get(`${apiUrl}/Activity`);
    const data = json.data;
    return dispatch({ type: GET_ACTIVITY, payload: data });
  };
};

export const postActivity = (form) => {
  return async function (dispatch) {
    try {
      const data = await axios.post(`${apiUrl}/Activity`, form);
      axios
        .get("/Activity")
        .then((json) => json.data)
        .then((data) => dispatch({ type: GET_ACTIVITY, payload: data }));
      const data_01 = data;
      return alert(data_01.data);
    } catch (error) {
      return alert(error.message);
    }
  };
};

export const filterByContinent = (filter) => {
  return async function (dispatch) {
    return dispatch({ type: FILTER_BY_CONTINENT, payload: filter });
  };
};
export const filterByActivity = (filter) => {
  return async function (dispatch) {
    return dispatch({ type: FILTER_BY_ACTIVITY, payload: filter });
  };
};
export const orderByName = (order) => {
  return async function (dispatch) {
    return dispatch({ type: ORDER_BY_NAME, payload: order });
  };
};
export const orderByPopulation = (order) => {
  return async function (dispatch) {
    return dispatch({ type: ORDER_BY_POPULATION, payload: order });
  };
};
