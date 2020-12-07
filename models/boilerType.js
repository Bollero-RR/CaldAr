module.exports = (mongoose) => {
  const BoilerType = mongoose.model(
    "boilerType",
    mongoose.Schema(
      {
        id: Number,
        type: Number,
        description: String,
        stock: Number,
        skillId: Number,
      },
      { timestamps: true }
    )
  );
  return BoilerType;
};
