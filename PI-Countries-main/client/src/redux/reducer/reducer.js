import {
  GET_ALL_COUNTRIES,
  FIND_COUNTRIES,
  GET_ALL_ACTIVITY,
  COUNTRIES_DETAIL,
  FILTER_BY_CONTINENT,
  FILTER_BY_ACTIVITY,
  ORDER_BY_NAME,
  ORDER_BY_POPULATION,
} from "../actions/actions-type.js";

const initialState = {
  countries: [],
  countriesAux: [],
  allActivities: [],
  detail: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        //devolvemos un nuevo estado con los paises que nos llegan en el payload
        ...state,
        countries: action.payload, //guardamos los paises en allCountries
        countriesAux: action.payload, //guardamos los paises en countries
      };
    case ORDER_BY_NAME:
      let arrayByName = [];
      if (action.payload === "az") {
        arrayByName = state.countriesAux.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      if (action.payload === "za") {
        arrayByName = state.countriesAux
          .sort((a, b) => a.name.localeCompare(b.name))
          .reverse();
      }
      return {
        ...state,
        countriesAux: arrayByName,
      };
    case ORDER_BY_POPULATION:
      let arrayByPopulation = [];
      if (action.payload === "ascending") {
        arrayByPopulation = state.countriesAux.sort(
          (countryA, countryB) => countryA.population - countryB.population
        );
      }
      if (action.payload === "descending") {
        arrayByPopulation = state.countriesAux.sort(
          (countryA, countryB) => countryB.population - countryA.population
        );
      }
      return {
        ...state,
        countriesAux: arrayByPopulation,
      };

    case FILTER_BY_CONTINENT:
      let arrayByContinent = state.countries.filter((country) =>
        action.payload === "All"
          ? true
          : country.continent.includes(action.payload)
      );
      return {
        ...state,
        countriesAux: arrayByContinent,
      };

    case FIND_COUNTRIES: //filtramos los paises por nombre
      return {
        ...state,
        countriesAux: action.payload,
      };

    case COUNTRIES_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case GET_ALL_ACTIVITY:
      return {
        ...state,
        allActivities: action.payload,
      };

    case FILTER_BY_ACTIVITY:
      const countriesByActivities = !action.payload.length
        ? state.countries
        : state.countriesAux.filter((country) => {
            let includesAllActivities = true;
            let countryActivities = country.Activities.map(
              (activity) => activity.name
            );
            action.payload.forEach((activity) => {
              if (!countryActivities.includes(activity)) {
                includesAllActivities = false;
              }
            });
            return includesAllActivities;
          });
      return {
        ...state,
        countriesAux: countriesByActivities,
      };

    default:
      return state;
  }
};

export default reducer;
