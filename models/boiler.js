module.exports = mongoose => {
    const Boiler = mongoose.model(
        "boilers",
        mongoose.Schema(
            {
                id: Number,
                typeId : Number,
                maintainceRate: String,
                hourMaintainceCost: Number,
                hourEventualCost: Number
            },
            {timestamps: true}
        )
    )
    return Boiler
}