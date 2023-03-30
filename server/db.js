const mongoose = require('mongoose');

module.exports = ()=>{
    const connectionParams = {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    };
    try {
        mongoose.connect(process.env.MONGODB_URI,connectionParams);
        console.log('connected to database successfully')
    } catch (error) {
        console.log('cant connect successfully')
        console.log(error)

    }
}