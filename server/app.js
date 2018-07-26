const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const cors = require('cors');

const app = express();

const mLab = require('./mLabcredz');

// allow cross-origin requests
app.use(cors());

//connec to mLab database
mongoose.connect(mLab.credz,{useNewUrlParser: true});
mongoose.connection.once('open', () => {
    console.log('Connected to database');
});


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
})); // Handles graphql requests

app.listen(420, () => {
    console.log('now listening for requests on port 420')
});

