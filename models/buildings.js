//BUILDINGS
module.exports = mongoose =>{
    const buildings = mongoose.model(
        "building",
        mongoose.Schema(
            {
                id: Number,
                businessName: String,
                email: String,
                phone: Number,
                adress: String,
                boilersAmount: Number,
                boilersType: String
            },
            {timestamps:true }
        )
    )
}

// [
//     {
//         ID:{
//             type: Number,
//             required: true,
//         },
//         businessName:{
//             type: String,
//             required: true,
//         },
//         email:{
//             type: String,
//             required: true,
//         },
//         phone:{
//             type: Number,
//             required: true,
//         },
//         adress: {
//             type: String,
//             required: true,
//         },
//         boilersAmount:{
//             type: Number,
//             required: true,
//         },
//         boilersType:{
//             type: String,
//             required: true,
//         }
//     }
// ]