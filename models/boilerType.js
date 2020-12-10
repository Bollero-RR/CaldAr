module.exports = (mongoose) => {
  const BoilerType = mongoose.model(
    "boilerType",
    mongoose.Schema(
      {
        type: Number,
        description: String,
        stock: Number,
        skillsId:  [{type: mongoose.Schema.Types.ObjectId}]
      },
      { timestamps: true }
    )
  );
  return BoilerType;
};
