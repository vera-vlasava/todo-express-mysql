const db = require("../models");
const Todo = db.todos;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const todo = {
    title: req.body.title,
  };

  Todo.create(todo)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.findAll = (req, res) => {
  Todo.findAll()
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while retrieving data",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Todo.findByPk(id)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while retrieving todo with id = " + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Todo.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Todo was successfully updated" });
      } else {
        res.send({ message: `Cannot update Todo with id=${id}` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while updating Todo with id =" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Todo.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Todo was successfully deleted" });
      } else {
        res.send({ message: `Cannot delete Todo with id=${id}` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while deleting Todo with id =" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Todo.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Todo(s) was deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while removing all Todos",
      });
    });
};

exports.findAllByCompleted = (req, res) => {
  const completed = req.body.completed;

  Todo.findAll({ where: { completed: completed } })
    .then((data) => res.send(data))
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Some error occured while searching" });
    });
};
