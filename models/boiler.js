module.exports = (mongoose) => {
  const Boiler = mongoose.model(
    "boilers",
    mongoose.Schema(
      {
        typeId: { type: mongoose.Schema.Types.ObjectId },
        maintainceRate: String,
        hourMaintainceCost: Number,
        hourEventualCost: Number,
      },
      { timestamps: true }
    )
  );
  return Boiler;
};
