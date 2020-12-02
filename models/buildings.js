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
                boilersType: String,
                boilersId: Array
            },
            {timestamps:true }
        )
    )
    return Buildings
}

