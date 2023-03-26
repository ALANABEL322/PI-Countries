const {
  getCountries,
  searchById,
  searchByName,
} = require("../controllers/CountriesControllers.js");

const getCountriesHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const countries = name ? await searchByName(name) : await getCountries();

    res.status(200).json(countries);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const getByIdCountriesHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const countryById = await searchById(id);
    res.status(200).json(countryById);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = { getCountriesHandler, getByIdCountriesHandler, searchByName };
