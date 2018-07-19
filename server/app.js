const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();



mongoose.connect('mongodb://evan:test123@ds141611.mlab.com:41611/gql-evan');
mongoose.connection.once('open', () => {
    console.log('Connected to database');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
})); // Handles graphql requests

app.listen(420, () => {
    console.log('now listening for requests on port 420')
});

