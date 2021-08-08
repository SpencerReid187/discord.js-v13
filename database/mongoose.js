const mongoose = require('mongoose');
require('dotenv').config();

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        };

        mongoose.connect(`mongodb+srv://requirebot:${process.env.PASS}@requirecluster.cyifz.mongodb.net/Data`, dbOptions);
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;

        mongoose.connection.on('connected', () => {
            console.log('Bot veritabanına bağlandı!');
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Bot veritabanına bağlanamadı!');
        });

        mongoose.connection.on('err', (err) => {
            console.log('Bot veritabanına bağlanırken bir hatayla karşılaştı: ' + err);
        });
    }
}