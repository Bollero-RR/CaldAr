//BUILDINGS
module.exports = mongoose =>{
    const Buildings = mongoose.model(
        "building",
        mongoose.Schema(
            {
                id: Number,
                businessName: String,
                email: String,
                adress: String,
                phone: Number,
                boilersAmount: Number,
                boilersType: String
            },
            {timestamps:true }
        )
    )
    return Buildings
}

