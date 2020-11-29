module.exports = mongoose => {
    const Technician = mongoose.model (
        "technician",
        mongoose.Schema(
            {
                id: Number,
                firstName: String,
                lastName: String,
                email: String,
                typeIds: Array,
                skillsId: Array,
                hour_rate: Number,
                daily_capacity: Number, 
            },
            { timestamps: true }
        )
    )
    return Technician
};
