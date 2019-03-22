require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');

const pg = require('pg');
const pgSession = require('connect-pg-simple')(session)
const aws = require('aws-sdk');

// CONTROLLERS
const ac = require('./controllers/auth_controller');
const tc = require('./controllers/task_controller');
const gc = require('./controllers/goal_controller');
const stc = require('./controllers/sub_task_controller');
const sgc = require('./controllers/sub_goal_controller');
const thxc = require('./controllers/thanks_controller');
const ec = require ('./controllers/excite_controller');
const wc = require('./controllers/weather_controller');
const qc = require('./controllers/quote_controller');
const vc = require('./controllers/vision_controller');

// .ENV
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

// MIDDLEWARE
const app = express();



const pgPool = new pg.Pool({
    connectionString: CONNECTION_STRING
})

app.use(express.json());

app.use(session({
    store: new pgSession({
        pool: pgPool,
        pruneSessionInterval: 60 * 60 * 24
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 48 }
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('db connected');
    app.listen(SERVER_PORT, () => {
        console.log(`${SERVER_PORT} birds flying high!`)
    })
})

app.use( express.static( `${__dirname}/../build` ) );

//// AMAZON S3 ENDPOINT ////
app.get('/api/signs3', (req, res) => {

    aws.config = {
      region: 'us-west-1',
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY
    }
    
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };
  
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
      console.log(returnData)
      return res.send(returnData)
    });
  });

//// WEATHER API ENDPOINT ////
app.get('/api/weather', wc.getWeather);

//// QUOTE API ENDPOINT ////
app.get('/api/quote', qc.getQuote);

//// AUTH ENDPOINTS ////
app.get('/api/current', ac.getUser);
app.post('/auth/register', ac.register);
app.post('/auth/login', ac.login);
app.post('/auth/logout', ac.logout);

//// TASK ENDPOINTS ////
app.post('/api/task', tc.addTask);
app.get('/api/tasks', tc.getTasks);
app.put('/api/task/:id', tc.updateTask);
app.delete('/api/task/:id', tc.deleteTask);

//// GOAL ENDPOINTS ////
app.post('/api/goal', gc.addGoal);
app.get('/api/goals', gc.getGoals);
app.put('/api/goal/:id', gc.updateGoal);
app.delete('/api/goal/:id', gc.deleteGoal); 

//// SUB_TASK ENDPOINTS ////
app.post('/api/s_task', stc.addSubTask);
app.get('/api/s_tasks', stc.getSubTasks);
app.put('/api/s_task/:id', stc.updateSubTask);
app.delete('/api/s_task/:id', stc.deleteSubTask);

//// SUB_GOAL ENDPOINTS ////
app.post('/api/s_goal', sgc.addSubGoal);
app.get('/api/s_goals', sgc.getSubGoals);
app.put('/api/s_goal/:id', sgc.updateSubGoal);
app.delete('/api/s_goal/:id', sgc.deleteSubGoal);

//// VISION ENDPOINTS ////
app.post('/api/vision', vc.addVision);
app.get('/api/visions', vc.getVisions);
app.delete('/api/vision/:id', vc.deleteVision);

//// THANKS ENDPOINTS ////
app.post('/api/thank', thxc.addThank);
app.get('/api/thanks', thxc.getThanks);
app.put('/api/thank/:id', thxc.updateThank);
app.delete('/api/thank/:id', thxc.deleteThank);

//// EXCITE ENDPOINTS ////
app.post('/api/excite', ec.addExcite);
app.get('/api/excites', ec.getExcites);
app.put('/api/excite/:id', ec.updateExcite);
app.delete('/api/excite/:id', ec.deleteExcite);