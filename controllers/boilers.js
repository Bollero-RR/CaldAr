const db = require("../models");
const Boiler = db.boilers;

const validateMaintainceRate = (rate, res) => {
  if (rate !== "quarterly" && rate !== "monthly" && rate !== "yearly") {
    return res.status(400).send({
      message: `The content of the maintenance fee must be quarterly, monthly or yearly!`,
    });
  }
  return true;
};

const validateHourMaintainceCost = (cost, res) => {
  if (cost < 0 || cost > 50) {
    return res.status(400).send({
      message: `The content of the maintenance hour is invalid. Allowed values between 0 - 50`,
    });
  }
  return true;
};

const validateHourEventualCost = (cost, res) => {
  if (cost < 0 || cost > 50) {
    return res.status(400).send({
      message: `The content of the eventual hour is invalid. Allowed values between 0 - 50`,
    });
  }
  return true;
};

exports.findAll = (req, res) => {
  Boiler.find({})
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error",
      });
    });
};

exports.create = (req, res) => {
  if (
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
    typeId,
    maintainceRate,
    hourMaintainceCost,
    hourEventualCost,
  } = req.body;

  validateMaintainceRate(maintainceRate, res);
  validateHourMaintainceCost(hourMaintainceCost, res);
  validateHourEventualCost(hourEventualCost, res);

  const newBoiler = new Boiler({
    typeId,
    maintainceRate,
    hourMaintainceCost,
    hourEventualCost,
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

exports.findOne = (req, res) => {
  Boiler.findOne({ _id: req.params.id })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Boiler with id ${req.params.id} does not exist`,
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

exports.findOneType = (req, res) => {
  Boiler.findOne({ typeId: req.params.type })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Boiler with Type id ${req.params.type} does not exist`,
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

exports.update = (req, res) => {
  if (
    !req.body.typeId ||
    !req.body.maintainceRate ||
    !req.body.hourMaintainceCost ||
    !req.body.hourEventualCost
  ) {
    return res.status(400).send({
      message: `Content cannot be empty!`,
    });
  }

  validateMaintainceRate(req.body.maintainceRate, res);
  validateHourMaintainceCost(req.body.hourMaintainceCost, res);
  validateHourEventualCost(req.body.hourEventualCost, res);

  Boiler.findOneAndUpdate({ _id: req.params.id }, req.body, { useFindAndModify: false })
    .then((data) => res.send({ message: `Boiler was updated` }))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error",
      });
    });
};

exports.delete = (req, res) => {
  Boiler.findOneAndRemove({ _id: req.params.id }, { useFindAndModify: false })
    .then((data) => res.send({ message: `Boiler was removed` }))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error",
      });
    });
};
