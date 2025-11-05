module.exports = app => {
    const utilisateur = require("../controllers/utilisateur.controllers.js");
  
    var router = require("express").Router();
  
    router.get("/", utilisateur.findAll);
    router.post("/", utilisateur.create);
    router.post("/login", utilisateur.login);
    router.delete("/:id", utilisateur.delete);

    app.use('/api/utilisateur', router);
  };
