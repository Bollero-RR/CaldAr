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
                boilersAmount: Number,
                boilersType: [{type: String}],
                boilersId: [{type: mongoose.Schema.types.ObjectId}]
            },
            {timestamps:true }
        )
    )
    return Buildings
}

