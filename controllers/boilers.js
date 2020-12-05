const db = require("../models");
const Boiler = db.boilers;

const validateId = (id) => {
  if (Number.isInteger(id)) {
    return res.status(400).send({
      message: `The content id is invalid!`,
    });
  }
  return true;
};

const validateTypeId = (typeId) => {
  //search types boilers
  if (typeId < 1 || typeId > 5) {
    return res.status(400).send({
      message: `The type of boiler does not exist!`,
    });
  }
  return true;
};

const validateMaintainceRate = (rate) => {
  if (rate !== "quarterly" || rate !== "monthly" || rate !== "yearly") {
    return res.status(400).send({
      message: `The content of the maintenance fee must be quarterly, monthly or yearly!`,
    });
  }
  return true;
};

const validateHourMaintainceCost = (cost) => {
  if (cost < 0 || cost > 50) {
    return res.status(400).send({
      message: `The content of the maintenance hour is invalid. Allowed values between 0 - 50`,
    });
  }
  return true;
};

const validateHourEventualCost = (cost) => {
  if (cost < 0 || cost > 50) {
    return res.status(400).send({
      message: `The content of the eventual hour is invalid. Allowed values between 0 - 50`,
    });
  }
  return true;
};

//Get all Boiler
exports.findAll = (req, res) => {
  Boiler.find({})
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error",
      });
    });
};

//Create Boiler
exports.create = (req, res) => {
  if (
    !req.body.id ||
    !req.body.typeId ||
    !req.body.maintainceRate ||
    !req.body.hourMaintainceCost ||
    !req.body.hourEventualCost
  ) {
    return res.status(400).send({
      message: `Content cannot be empty!`,
    });
  }

  const {
    id,
    typeId,
    maintainceRate,
    hourMaintainceCost,
    hourEventualCost,
  } = req.body;

  validateId(id);
  validateTypeId(typeId);
  validateMaintainceRate(maintainceRate);
  validateHourMaintainceCost(hourMaintainceCost);
  validateHourEventualCost(hourEventualCost);

  const newBoiler = new Boiler({
    id: id,
    typeId: typeId,
    maintainceRate: maintainceRate,
    hourMaintainceCost: hourMaintainceCost,
    hourEventualCost: hourEventualCost,
  });

  newBoiler
    .save(newBoiler)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error",
      });
    });
};

//Get single Boiler
exports.findOne = (req, res) => {
  if (!req.body.id) {
    return res.status(400).send({
      message: `Content cannot be empty!`,
    });
  }

  validateId(req.body.id);

  Boiler.findOne({ id: req.params.id })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Boiler with id ${req.params.id} was not found`,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error",
      });
    });
};

//Get single Boiler for type
exports.findOneType = (req, res) => {
  if (!req.params.type) {
    return res.status(400).send({
      message: `Content cannot be empty!`,
    });
  }

  validateId(req.params.type);

  Boiler.findOne({ typeId: req.params.type })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Boiler with Type id ${req.params.typeId} was not found`,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error",
      });
    });
};

//Update Boiler
exports.update = (req, res) => {
  if (
    !req.body.id ||
    !req.body.typeId ||
    !req.body.maintainceRate ||
    !req.body.hourMaintainceCost ||
    !req.body.hourEventualCost
  ) {
    return res.status(400).send({
      message: `Content cannot be empty!`,
    });
  }

  const {
    id,
    typeId,
    maintainceRate,
    hourMaintainceCost,
    hourEventualCost,
  } = req.body;

  validateId(id);
  validateTypeId(typeId);
  validateMaintainceRate(maintainceRate);
  validateHourMaintainceCost(hourMaintainceCost);
  validateHourEventualCost(hourEventualCost);

  Boiler.findOneAndUpdate({ id: id }, req.body, { useFindAndModify: false })
    .then((data) => res.send({ message: `Boiler was updated` }))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error",
      });
    });
};

//Delete boiler
exports.delete = (req, res) => {
  if (!req.body.id) {
    return res.status(400).send({
      message: `Content cannot be empty!`,
    });
  }

  validateId(req.body.id);

  Boiler.findOneAndRemove({ id: req.params.id }, { useFindAndModify: false })
    .then((data) => res.send({ message: `Boiler was removed` }))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error",
      });
    });
};
