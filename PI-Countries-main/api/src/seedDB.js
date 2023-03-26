const axios = require("axios");
const Country = require("./models/Country");

const getCountriesApi = async () => {
  const URL = "https://restcountries.com/v3.1/all";
  const countriesApi = await axios.get(URL);
  const dataApi = countriesApi?.data?.map((e) => {
    return {
      id: e.cca3,
      name: e.name.common,
      flag_image: e.flags ? e.flags.png : "",
      continent: e.continents[0],
      capital: e.capital ? e.capital[0] : "",
      subregion: e.subregion ?? "",
      area: e.area ?? "",
      population: e.population ?? "",
    };
  });
  await Country.bulkCreate(dataApi);
  return dataApi;
};

module.exports = { getCountriesApi };
