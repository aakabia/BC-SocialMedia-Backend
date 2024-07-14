const express = require('express');
const db = require('./config/connection');



// Above, we recieved our mongooe connection from the config folder.



const PORT = process.env.PORT || 3001;
const app = express();
//Above we establish our express instance 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Above, we allow express to use json and urlencoded. 





db.on('connected', () => {
    console.log('Mongoose connected to social_network_db');
});

// Above, is to ensure we are first connected to the db.


db.once('open', () => {
    app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
    });
});

// Above, we start our server once the db is open.