const db = require("../models");
const BoilerType = db.boilerType;

const validationType = (res, type) => {
  if (type < 1 || type > 4) {
    return res.status(400).send({
      message: "the type of boiler entered does not exist",
    });
  }
  return true;
};

const validationStock = (res, stock) => {
  if (stock < 1) {
    return res.status(400).send({
      message:
        "does not have boilers of this type, please place an order to have it available again",
    });
  }
  return true;
};


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

exports.create = (req, res) => {
  if (
    !req.body.type ||
    !req.body.stock ||
    !req.body.skillsId ||
    !req.body.description
  ) {
    return res.status(400).send({
      message: "Content cannot be empty!",
    });
  }

  const { type, stock, description, skillsId } = req.body;

  validationType(res, type);
  validationStock(res, stock);

  const newBoilerType = new BoilerType({
  
    type,
    stock,
    description,
    skillsId
  });

  if( validationType(res, type) &&  validationStock(res, stock)){
    newBoilerType
      .save(newBoilerType)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the boiler type",
        });
      });
  }
};

exports.update = (req, res) => {
  if (
    !req.body.type ||
    !req.body.stock ||
    !req.body.skillsId ||
    !req.body.description
  ) {
    return res.status(400).send({
      message: "Content cannot be empty!",
    });
  }

  const {type, stock, description, skillsId } = req.body;
  
  validationType(res, type);
  validationStock(res, stock);

  BoilerType.findOneAndUpdate( { _id:req.params.id }, req.body, {useFindAndModify: false})
    .then((data) => {
      res.send({ message: "boiler type was updated" });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while update the  boiler type",
      });
    });
};

exports.findOneType = (req, res) => {
 
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

exports.findOneId = (req, res) => {
  BoilerType.findOne({ _id: req.params.id })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `boiler with _id ${req.params.id} was not found`,
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


exports.delete = (req, res) => {

  const _id = req.params.id;

  BoilerType.findOneAndRemove({_id }, { useFindAndModify: false })
    .then((data) => res.send({ message: "boiler type was removed" }))
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while delete the  boiler type",
      });
    });
};
