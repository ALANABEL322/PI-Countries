import {
  GET_ALL_COUNTRIES,
  FIND_COUNTRIES,
  GET_ACTIVITY,
  COUNTRIES_DETAIL,
  FILTER_BY_CONTINENT,
  FILTER_BY_ACTIVITY,
  ORDER_BY_NAME,
  ORDER_BY_POPULATION,
} from "../actions/actions-type.js";

const initialState = {
  countries: [],
  countriesAux: [],
  activities: [],
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

    case GET_ACTIVITY:
      return {
        ...state,
        activities: action.payload,
        allActivities: action.payload,
      };

    case FILTER_BY_ACTIVITY:
      const countries2 = state.countries;
      // filtramos los paises por actividad
      //usando filter para filtrar los paises que tengan la actividad que buscamos
      // (c) es cada pais del array countries2
      // (c) es cada actividad del array activities
      // retornamos los paises que tengan la actividad que buscamos
      // con find buscamos la actividad que buscamos en el array activities
      // si c.name es igual a la actividad que buscamos, retornamos el pais
      const countriesFiltered = countries2.filter((c) => {
        return c.activities?.find((c) => {
          return c.name === action.payload;
        });
      });

      if (action.payload === "All") {
        return { ...state, countries: state.countries };
      } else {
        return {
          ...state,
          countries: countriesFiltered,
        };
      }

    default:
      return state;
  }
};

export default reducer;
