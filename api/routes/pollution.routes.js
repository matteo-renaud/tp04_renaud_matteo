module.exports = app => {
    const pollution = require("../controllers/pollution.controllers.js");
  
    var router = require("express").Router();
  
    router.get("/", pollution.findAll);
    router.post("/", pollution.create);
    router.get("/:id", pollution.findById);
    router.put("/:id", pollution.update);
    router.delete("/:id", pollution.delete);
  
    app.use('/api/pollution', router);
  };
