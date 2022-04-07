const mongoose = require('mongoose');

const connectionString = process.env.MONGO_DB_URI;

if (!connectionString) {
    console.error(
        'Remember that you must have a .env file with the environment variables defined and the MONGO_DB_URI'
    );
};

// Conection a mongoDB
mongoose
    .connect(connectionString, {
        // it allow users to fall back to the old parser if they find a bug in the new parser.
        useNewUrlParser: true,
        // it allows to use the new connection management engine of the MongoDB driver
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Database connected');
    })
    .catch(err => {
        console.error("Error connected BBDD");
        console.log("MONGO_DB_URI: " + connectionString)
        console.error(err);
    });

process.on('uncaughtException', error => {
    console.error(error);
    mongoose.disconnect();
});
