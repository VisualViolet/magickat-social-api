const mongoose = require('mongoose');

// Connection to database
mongoose.connect('mongodb://127.0.0.1:27017/magickatDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = mongoose.connection;