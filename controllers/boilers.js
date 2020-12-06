const db = require("../models");
const Boiler = db.boilers;

const validateId = (id, res) => {
  if (isNaN(id)) {
    return res.status(400).send({
      message: `The id is invalid!`,
    });
  }
  return true;
};

const validateTypeId = (typeId ,res) => {
  //search types boilers
  if (typeId < 1 && typeId > 4) {
    return res.status(400).send({
      message: `The type of boiler does not exist!`,
    });
  }
  return true;
};

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

  validateId(id, res);

  Boiler.findOne({ id: id })
  .then((data) => {
    if (data) {
      return res.status(404).send({
        message: `Boiler with id ${id} was exist`,
      });
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error",
    });
  });

  validateTypeId(typeId, res);
  validateMaintainceRate(maintainceRate, res);
  validateHourMaintainceCost(hourMaintainceCost, res);
  validateHourEventualCost(hourEventualCost, res);

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
  if (!req.params.id) {
    return res.status(400).send({
      message: `Content cannot be empty!`,
    });
  }

  validateId(req.params.id, res);

  Boiler.findOne({ id: req.params.id })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Boiler with id ${req.params.id} was not exist`,
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

  validateTypeId(req.params.type, res);

  Boiler.findOne({ typeId: req.params.type })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Boiler with Type id ${req.params.type} was not found`,
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

  validateId(id, res);

  Boiler.findOne({ id: id })
  .then((data) => {
    if (!data) {
      return res.status(404).send({
        message: `Boiler with id ${id} was not exist`,
      });
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error",
    });
  });

  validateTypeId(typeId, res);
  validateMaintainceRate(maintainceRate, res);
  validateHourMaintainceCost(hourMaintainceCost, res);
  validateHourEventualCost(hourEventualCost, res);

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
  if (!req.params.id) {
    return res.status(400).send({
      message: `Content cannot be empty!`,
    });
  }

  validateId(req.params.id);

  Boiler.findOneAndRemove({ id: req.params.id }, { useFindAndModify: false })
    .then((data) => res.send({ message: `Boiler was removed` }))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error",
      });
    });
};
