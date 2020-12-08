//BUILDINGS
module.exports = mongoose =>{
    const Buildings = mongoose.model(
        "building",
        mongoose.Schema(
            {
                businessName: String,
                email: String,
                adress: String,
                phone: Number,
                boilersId: [{type: mongoose.Schema.Types.ObjectId}]
            },
            {timestamps:true }
        )
    )
    return Buildings
}

