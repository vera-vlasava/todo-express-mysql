module.exports = (app) => {
  const todos = require("../controllers/todo.controller");

  const router = require("express").Router();

  router.post("/", todos.create);

  router.get("/", todos.findAll);

  router.get("/completed", todos.findAllByCompleted);

  router.get("/:id", todos.findOne);

  router.get("/:id", todos.update);

  router.delete("/:id", todos.delete);

  router.delete("/", todos.deleteAll);

  app.use("/api/todos", router);
};
