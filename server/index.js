const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ueh5c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        console.log("Pinged your deployment. You successfully connected to MongoDB!");


        const db = client.db('jobdb');
        const jobCollection = db.collection('jobs');
        const jobApplications= db.collection('Job-Applications');

        
        app.get('/jobs',async(req,res)=>{
            const cursor = jobCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get(`/jobs/:id`,async(req,res)=>{
            const id = req.params.id;
            const query = {_id: new ObjectId(id)};

            const result = await jobCollection.findOne(query);
            res.send(result);
        })

        // job application related endpoint

        app.get(`/jobApply`,async(req,res)=>{
            const email = req.query.email;
            const query = {applicant_email:email};
            
            const result = await  jobApplications.find(query).toArray();

            const newResult = []; 

            for ( const application of result){
                const query1 = {_id:new ObjectId(application.job_id)};
                const folafol = await jobCollection.findOne(query1);
                newResult.push(folafol);
            }

            res.send(newResult);
            
        })

        app.post(`/jobApply`,async(req,res)=>{
            const applyInfo = req.body;
            const result = await jobApplications.insertOne(applyInfo);
            res.send(result);
        })

    } finally {

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('job  Server is here  ')
})

app.listen(port, () => {
    console.log(`server is running properly at : ${port}`);
})