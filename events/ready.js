module.exports = (mongoose) => {
    mongoose.connect(process.env.dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on('connected',()=>{
        console.log('Connected to database!')
    });
    console.log('Signed in!')
}