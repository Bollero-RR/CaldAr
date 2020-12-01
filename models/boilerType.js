
module.exports = mongoose => {
    const BoilerType = mongoose.model(
        "boilerType",
        mongoose.Schema(
            {
                id: Number,
                type: String,
                description: String,
                stock: Number,
                skillsId: Number
            },
            {timestamps: true}
        )
    )
    return BoilerType
}

