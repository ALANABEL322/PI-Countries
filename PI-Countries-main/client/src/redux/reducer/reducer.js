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
  detailAux: {},
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

    case FIND_COUNTRIES: //filtramos los paises por nombre
      return {
        ...state,
        countries: action.payload,
      };

    case GET_ACTIVITY:
      return {
        ...state,
        activities: action.payload,
        allActivities: action.payload,
      };

    case COUNTRIES_DETAIL:
      return {
        ...state,
        details: action.payload,
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

    case FILTER_BY_CONTINENT:
      const allCountries = state.countries;
      const continentFiltered =
        action.payload === "All"
          ? allCountries //filtramos los paises por continente
          : allCountries.filter((el) => el.continent === action.payload); //si el continente es 'All', devolvemos todos los paises
      return {
        // usando el array allCountries y filter para filtrarlos
        ...state,
        countries: continentFiltered,
      };

    case ORDER_BY_NAME:
      action.payload === "asc"
        ? state.countries.sort(function (a, b) {
            //ordenamos los paises por nombre
            if (a.name > b.name) {
              //si el payload es 'asc', ordenamos de la A a la Z
              return 1; //si el payload es 'desc', ordenamos de la Z a la A
            } //usando sort para ordenarlos, que funciona como un if
            if (b.name > a.name) {
              //si a.name es mayor que b.name, retornamos 1, que seria que a.name va despues que b.name
              // 1 es la posicion de a.name en el array ordenado
              return -1; //si b.name es mayor que a.name, retornamos -1
            } //si a.name es igual que b.name, retornamos 0
            return 0; //
          })
        : state.countries.sort(function (a, b) {
            if (a.name > b.name) {
              return -1;
            }
            if (b.name > a.name) {
              return 1;
            }
            return 0;
          });
      return {
        ...state,
        countries: state.countries,
      };

    case ORDER_BY_POPULATION:
      action.payload === "min"
        ? state.countries.sort(function (a, b) {
            //ordenamos los paises por poblacion
            if (a.population > b.population) {
              return 1;
            }
            if (b.population > a.population) {
              return -1;
            }
            return 0;
          })
        : state.countries.sort(function (a, b) {
            if (a.population > b.population) {
              return -1;
            }
            if (b.population > a.population) {
              return 1;
            }
            return 0;
          });
      return {
        ...state,
        countries: state.countries,
      };
    default:
      return state;
  }
};

export default reducer;
