const validation = require("../validation/validation");
const seedDB = require("../seedDB");
const { Country, Activity } = require("../db");
const { Op } = require("sequelize");

async function getCountries() {
  try {
    let database = await Country.findAll();

    if (database.length === 0) {
      database = await seedDB();

      return await Country.findAll({
        include: {
          model: Activity,
        },
      });
    } else {
      return Country.findAll({
        include: {
          model: Activity,
          through: {
            attributes: [],
          },
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
}

const searchById = async (idCountry) => {
  const countriesById = await Country.findByPk(idCountry, {
    include: {
      model: Activity,
      through: {
        atributes: [],
      },
    },
  });
  return countriesById;
};

const searchByName = async (name) => {
  // const paisespornombre = paisesporBD.filter(country=>countries.name ==name)
  const countriesName = await Country.findAll({
    // countryName = await Country.findAll ({where: {name: name}});
    where: { name: { [Op.iLike]: `${name}%` } },
  });
  if (countriesName.length) return countriesName;
  throw Error("The country was not found");
};

module.exports = {
  getCountries,
  searchById,
  searchByName,
};
