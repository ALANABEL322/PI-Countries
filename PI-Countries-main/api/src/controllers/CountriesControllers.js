const validation = require("../validation/validation");
const { getCountriesApi } = require("../seedDB");
const { Country, Activity } = require("../db");
const { Op } = require("sequelize");

async function getCountries() {
  try {
    let database = await Country.findAll({
      include: {
        model: Activity,
      },
    });

    if (database.length === 0) {
      database = await getCountriesApi();

      return await Country.findAll({
        include: {
          model: Activity,
        },
      });
    } else {
      return database;
    }
  } catch (error) {
    console.error(error);
  }
}

const searchById = async (idCountry) => {
  const countriesById = await Country.findByPk(idCountry, {
    include: {
      model: Activity,
    },
  });
  return countriesById;
};

const searchByName = async (name) => {
  const countriesName = await Country.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
    include: {
      model: Activity,
    },
  });
  if (countriesName.length) return countriesName;
  throw Error("The country was not found");
};

module.exports = {
  getCountries,
  searchById,
  searchByName,
};
