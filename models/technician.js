module.exports = mongoose => {
    const Technician = mongoose.model (
        "technician",
        mongoose.Schema(
            {
                firstName: String,
                lastName: String,
                email: String,
                typeIds: [{type: mongoose.Schema.Types.ObjectId}],
                skillsId: [{type: mongoose.Schema.Types.ObjectId}],
                hour_rate: String,
                daily_capacity: Number
            },
            { timestamps: true }
        )
    )
    return Technician
};