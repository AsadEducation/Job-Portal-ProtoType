const express = require('express');
const cors = require('cors');
require('dotenv').config();
var jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors(
    {
        origin: ['http://localhost:5173'],
        credentials: true,
    }
));
app.use(express.json());
app.use(cookieParser());


//custom middleware 


const verifyToken = (req, res, next) => {
    console.log('inside verify token');
    console.log('logging cookie from custom middleware',req.cookies.token);

    const token = req.cookies.token;
    if (!token) {
        console.log('not got the token');
        return res.status(401).send({ message: 'unauthorized access' })
    }

     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        console.log('got the token');

        if (err) {
            console.log('error occured',err);

            return res.status(401).send({ message: 'unauthorized access' })
        }


        req.user = decoded;

        next();

    })


}

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
        const jobApplications = db.collection('Job-Applications');


        //auth related endpoints or api 

        app.post('/jwt', async (req, res) => {
            const user = req.body;

            const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, {
                httpOnly: true,
                secure: false
            })
            res.send({ 'cookies sent': true })
        })

        //job related endpoints 

        app.get('/jobs', verifyToken, async (req, res) => {

            const email = req.query.email;

            // console.log('email', email);

    
            // console.log(req.user);

            if(req.user.email!==req.query.email){
                return res.status(403).send({'message':'forbidden access'});
            }

            let query = {};

            if (email) {

                query = { hr_email: email };
            }

            const cursor = jobCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get(`/jobs/:id`, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };

            const result = await jobCollection.findOne(query);
            res.send(result);
        })

        //  application related endpoint

        app.get(`/jobApply`, async (req, res) => {
            const email = req.query.email;
            const query = { applicant_email: email };


            const result = await jobApplications.find(query).toArray();

            const newResult = [];

            for (const application of result) {
                const query1 = { _id: new ObjectId(application.job_id) };
                const folafol = await jobCollection.findOne(query1);
                newResult.push(folafol);
            }

            res.send(newResult);

        })

        // getting applications based on job_id

        app.get(`/view-applications/:job_id`, async (req, res) => {
            const job_id = req.params.job_id;
            console.log('job_id: ', id);

            const query = { job_id };
            const result = await jobApplications.find(query).toArray();
            console.log(result);

            res.send(result);
        })

        app.post(`/add-new-job-form`, async (req, res) => {
            const newJob = req.body;
            const result = await jobCollection.insertOne(newJob);
            res.send(result);
        })

        app.post(`/jobApply`, async (req, res) => {
            const applyInfo = req.body;
            const result = await jobApplications.insertOne(applyInfo);


            //searching for my applied job in the job collection 

            const id = applyInfo.job_id;
            const query = { _id: new ObjectId(id) };

            const job = await jobCollection.findOne(query);

            let count = 0;

            if (job.applicationCount) {

                count = job.applicationCount + 1;
            }
            else count = 1;

            //updating the value of apply count through mongodb crud 

            const updateDoc = {
                $set: {
                    applicationCount: count,
                },
            };

            const temp = await jobCollection.updateOne(query, updateDoc);

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