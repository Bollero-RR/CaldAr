const express = require("express");
const router = express.Router();
const customers = require("../data/customer.json");

const idFilter = (req) => (customer) => customer.id === parseInt(req.params.id);

//Get all customer
router.get("/", (req, res) => res.json(customers));

//Get all single customer
router.get("/:id", (req, res) => {
  const found = customers.some(idFilter(req));

  if (found) {
    res.json(customers.filter(idFilter(req)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

//Delete customer
router.delete("/:id", (req, res) => {
  const found = customers.some(idFilter(req));

  if (found) {
    res.json({
      msg: "Customer deleted",
      customers: customers.filter((customer) => !idFilter(req)(customer)),
    });
  } else {
    res
      .status(400)
      .json({ msg: `No customer with the id of ${req.params.id}` });
  }
});

module.exports = router;
