const validate_Activity = (req, res, next) => {
  const { name, difficulty, duration, season, countries } = req.body;
  if (!name) return res.send("Name missing");
  if (!difficulty) return res.send("Difficulty missing");
  if (!season)
    return res.send("Season missing: Summer, Autumn, Winter, Spring");
  if (!duration) return res.send("Duration missing");
  if (countries.length === 0) return res.send("Country missing");

  next();
};

module.exports = validate_Activity;
