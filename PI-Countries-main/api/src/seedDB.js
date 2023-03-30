const axios = require("axios");
// const Country = require("./models/Country");
const { Country } = require("./db");

const getCountriesApi = async () => {
  const URL = "https://restcountries.com/v3.1/all";
  const countriesApi = await axios.get(URL);
  const dataApi = countriesApi?.data?.map((e) => {
    return {
      id: e.cca3,
      name: e.name.common,
      flag_image: e.flags ? e.flags.png : "",
      continent: e.continents,
      capital: e.capital ? e.capital[0] : "",
      subregion: e.subregion ?? "",
      area: e.area ?? "",
      population: e.population ?? "",
    };
  });
  const newCountries = await Promise.all(
    dataApi.map(async (newCountry) => {
      return await Country.create(newCountry);
    })
  );

  return newCountries;
};

module.exports = { getCountriesApi };
