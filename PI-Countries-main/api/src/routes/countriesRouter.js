const { Router} = require ("express");
const {getCountriesHandler, getByIdCountriesHandler}  = require ("../handlers/CountriesHandler")

const countriesRouter = Router ();

countriesRouter.get("/", getCountriesHandler);

countriesRouter.get("/:id", getByIdCountriesHandler);



module.exports = countriesRouter;