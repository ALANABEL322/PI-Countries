const { Router } = require("express");
const {
  getActivitiesHandler,
  createActivitiesHandler,
} = require("../handlers/ActivitiesHandler");
const validate_Activity = require("../validation/validation");

const activitiesRouter = Router();

activitiesRouter.get("/", getActivitiesHandler);

activitiesRouter.post("/", validate_Activity, createActivitiesHandler);

module.exports = activitiesRouter;
