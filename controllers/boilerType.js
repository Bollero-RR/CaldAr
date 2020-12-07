const db = require("../models");
const BoilerType = db.boilerType;

//validation ID
const validationId = (id) => {
  if (isNaN(id)) {
    return res.status(400).send({
      message: "the id is invalid",
    });
  }
  return true;
};

//validation boiler type
const validationType = (type) => {
  if (type < 1 || type > 5) {
    return res.status(400).send({
      message: "the type of boiler entered does not exist",
    });
  }
  return true;
};

//validation stock
const validationStock = (stock) => {
  if (stock < 1) {
    return res.status(400).send({
      message:
        "does not have boilers of this type, please place an order to have it available again",
    });
  }
  return true;
};

//validation skilleId
const validationSkillId = (skillId) => {
  if (Number.isInteger(id)) {
    return res.status(400).send({
      message: "the skill id is invalid",
    });
  }
  return true;
};

//Get all boiler type
exports.findAll = (req, res) => {
  BoilerType.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error",
      });
    });
};

//Create boiler type
exports.create = (req, res) => {
  if (
    !req.body.id ||
    !req.body.type ||
    !req.body.stock ||
    !req.body.skillId ||
    !req.body.description
  ) {
    return res.status(400).send({
      message: "Content cannot be empty!",
    });
  }

  const { id, type, stock, description, skillId } = req.body;

  validationId(id);
  validationType(type);
  validationStock(stock);
  validationSkillId(skillId);

  const newBoilerType = new BoilerType({
    id,
    type,
    stock,
    description,
    skillId,
  });

  newBoilerType
    .save(newBoilerType)
    .then((data) => {
      //console.log('==Create Data==>', data);
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the boiler type",
      });
    });
};

//Get single boiler type
exports.findOneType = (req, res) => {
  if (!req.body.type) {
    return res.status(400).send({
      message: "it cannot be empty!",
    });
  }

  validationType(type);

  BoilerType.findOne({ type: req.params.type })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `boiler with type ${req.params.type} was not found`,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while searching the  boiler type",
      });
    });
};

//Get single id
exports.findOneId = (req, res) => {
  if (!req.body.id) {
    return res.status(400).send({
      message: "it cannot be empty!",
    });
  }

  validationId(id);

  BoilerType.findOne({ id: req.params.id })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `boiler with id ${req.params.id} was not found`,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while searching the  boiler type",
      });
    });
};

//Update boiler type
exports.update = (req, res) => {
  if (
    !req.body.id ||
    !req.body.type ||
    !req.body.stock ||
    !req.body.skillId ||
    !req.body.description
  ) {
    return res.status(400).send({
      message: "Content cannot be empty!",
    });
  }

  const { id, type, stock, description, skillId } = req.body;

  validationId(id);
  validationType(type);
  validationStock(stock);
  validationSkillId(skillId);

  BoilerType.findOneAndUpdate({ id: req.params.id }, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      //console.log('==update Data==>', data);
      res.send({ message: "boiler type was updated" });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while update the  boiler type",
      });
    });
};

//Delete boiler
exports.delete = (req, res) => {
  if (!req.body.id) {
    return res.status(400).send({
      message: "it cannot be empty!",
    });
  }

  validationId(id);

  const id = req.params.id;

  BoilerType.findOneAndRemove({ id }, { useFindAndModify: false })
    .then((data) => res.send({ message: "boiler type was removed" }))
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while delete the  boiler type",
      });
    });
};
