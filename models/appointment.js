module.exports = mongoose => {
    const Appointment = mongoose.model(
        "appointments",
        mongoose.Schema({
            id: Number,
            buildingId:{
                type: mongoose.Schema.Types.ObjectId
                },
            boilerId:{
                type: mongoose.Schema.Types.ObjectId
                },
            start_timestamp: String,
            end_timestamp: String
        }, {
            timestamps: true
        })
    )
    return Appointment
}