/*
(c) Michael Korolev - 2023
*/


const { graphqlHTTP } = require('express-graphql');
const express = require("express");
const schema = require('./schema/schema');    
const mongoose  = require('mongoose');
const app = express();

const PORT = process.env.PORT || 3002;

mongoose.connect('mongodb+srv://cobratvgd:y1pnGpnBVjLoC956@cluster0.yn0a2hx.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true}) // открыто специально
const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Ошибка соединения ${err }`));
dbConnection.once('open', () => console.log(`Connected`));

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));




app.listen(PORT, () => {
    console.log(`${PORT} - running on`);
});
