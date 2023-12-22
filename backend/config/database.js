const mongoose = require('mongoose')


const connectdatabase = () =>{
    mongoose.connect(`${process.env.DB_CNSTR}`,
        { useNewUrlParser: true, useUnifiedTopology: true })
        .then((data) => {
            console.log("MongoDB Connected with server")
        })
}

module.exports = connectdatabase;