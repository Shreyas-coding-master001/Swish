const { Router} = require("express");
const connectionController = require("../controllers/connectionController");
const isUserExist = require("../Middleware/CheckifUser");
const connectionRoute = Router();

connectionRoute.post("/", isUserExist, connectionController.getConnections);

module.exports = connectionRoute;