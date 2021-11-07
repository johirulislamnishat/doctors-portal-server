const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gtlcm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {

    try {
        await client.connect();
        // console.log('Wow, Connected');
        const database = client.db('doctors_portal');
        const appointmentsCollection = database.collection('appointments');


        //POST API
        app.post('/appointments', async (req, res) => {
            const bookAppoint = req.body;
            // const result = await appointmentsCollection.insertOne(bookAppoint);
            console.log(bookAppoint);
            res.json({ message: 'Done' })
        })
    }
    finally {
        // await client.close();

    }

} run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})