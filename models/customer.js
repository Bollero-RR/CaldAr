module.exports = (mongoose) => {
  const Customer = mongoose.model(
    "customer",
    mongoose.Schema(
      {
        customerType: String,
        email: String,
        buildingsIds: [
          {
            type: mongoose.Schema.Types.ObjectId,
          },
        ],
        fiscalAddress: String,
      },
      { timestamps: true }
    )
  );
  return Customer;
};
