const { Activity } = require("../db");

const createActivities = async (
  name,
  difficulty,
  duration,
  season,
  countries
) => {
  const newActivity = await Activity.create({
    name,
    difficulty,
    duration,
    season,
  });
  await Promise.all(
    countries.map(async (country) => {
      return await newActivity.addCountry(country);
    })
  );

  return newActivity;
};

const getActivities = async () => {
  const allActivities = await Activity.findAll();
  return allActivities;
};

module.exports = {
  getActivities,
  createActivities,
};
