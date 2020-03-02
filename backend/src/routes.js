const { Router } = require("express");
const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");

const routes = Router();
//get,post,put,delete
routes.get("/devs", DevController.index);
routes.post("/devs", DevController.store);
routes.get("/search", SearchController.index);
routes.delete("/devs", DevController.destroy);
//routes.put('/devs', DevController.put)

module.exports = routes;
