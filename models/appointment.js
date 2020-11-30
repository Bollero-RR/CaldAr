const {
    Schema
} = require("mongoose")
module.exports = mongoose => {
    const Appointment = mongoose.model( //para definir un Schema se utiliza el objeto mongoose, con metodo model
        "appointments", //1er Parámetro: se pone el nombre de la collecion que quiero utilziar en la BD
        mongoose.Schema({ //2do Parametro, un Schema de mongoose.
            id: Number,
            buildingId: Number,
            boilerId: Number,
            start_timestamp: String,
            end_timestamp: String
        }, {
            timestamps: true
        })
    )
    return Appointment
};