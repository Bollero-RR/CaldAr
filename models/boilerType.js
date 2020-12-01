const { Schema } = require("mongoose");

module.exports = mongoose => {
    const BoilerType = mongoose.model(
        "boilerType",
        mongoose.Schema(
            {
                id: Number,
                type: String,
                state: {
                    install: Boolean,
                    building: String
                },
                history: {
                    typeMaintenance: String,
                    date: Date,
                    technician: String
                },
                qualifiedTechnician: Array,
                stock: Number,
                installed: {
                    inService: Boolean,
                    maintenance: Boolean,
                    stopped: Boolean
                },
            },
            {timestamps: true}
        )
    )
    return BoilerType
}

