const express = require('express');
const server = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const {v4 : uuidv4} = require('uuid');
const bodyParser = require('body-parser');
const path = require('path');
const { config, sessionInfo } = require('./utils/config');
const xmlparser = require('express-xml-bodyparser');
const stateRoutes = require('./routes/state_routes/routes');
require('dotenv').config();

const ONE_HOUR = 1000 * 60 * 60 * 1;

const session_options={
    genid:function(req){
        return uuidv4();
    },
    name: sessionInfo.SESSION_NAME,
    secret: sessionInfo.SESSION_SECRET,
    // store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie : {
        maxAge: ONE_HOUR * sessionInfo.SESSION_VALIDITY,
        secure: sessionInfo.SESSION_SECURE,
        sameSite: true,
        httpOnly: false
    }
}

if( process.env.DBSTORE === 'true' ){
    const sessionStore = MongoStore.create({ mongoUrl: process.env.MONGO_CONNECTION, dbName: 'sessions' });
    session_options["store"] = sessionStore;
    console.log("db store enabled");
}

const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Token, MODE, Environment, OwnerId, EventName, CustomHeader');
    next();
}

const logInfoHandler = (req, res, next) => {
    // console.log("session", req.session, req.session.cookie._expires, req.path, new Date(req.session.cookie._expires), new Date());

    if( req.session[req.sessionID] || req.path==='/api/auth/login' ){
        if(req.body.AMTDetails)
        {
           // console.log("in",new Date(req.session.cookie._expires).getTime() , new Date().getTime(),new Date(req.session.cookie._expires).getTime() > new Date().getTime());
            let AMTDetails = {...req.body.AMTDetails};
            let logInfo = Object.create({});
            delete AMTDetails['ParentRequestId'];
            delete AMTDetails['CurrentRequestId'];
            delete AMTDetails['SourceRequestId'];
           // console.log("From Server logInfoHandler", req.sessionID, req.session.hasOwnProperty(req.sessionID));
            if(req.session[req.sessionID] && req.session[req.sessionID].hasOwnProperty('commonLogInfo'))
            {
                logInfo = req.session[req.sessionID]['commonLogInfo'];
                req.session[req.sessionID]['commonLogInfo'] = Object.assign({}, logInfo, AMTDetails);
            }
            // delete req.body.AMTDetails;
        }
        next();
    }else{
        console.log("out");
        delete req.session[req.sessionID];
        res.clearCookie(sessionInfo.SESSION_NAME);
        res.clearCookie("data");
        let data = {};
        data.message = 'Invalid session! please login properly and proceed.';
        data.redirectUrl = '/login';
        data.AMTDetails = req.body.AMTDetails ? req.body.AMTDetails : null ;
        return res.json(data);
    }    
}

server.disable('x-powered-by');
server.use(allowCrossDomain);

server.use(session({...session_options}));

//Bodyparser middleware
server.use(bodyParser.json({ limit: "1024mb", extended: true }));
server.use(xmlparser());

// inititalize Middleware
server.use(express.json({ extended: false, limit: "1024mb" }));

server.get('/api/test', (req, res) => {
    console.log("test for changes")
    let names = { name: "kalaitest", age: 22 };
    
    res.json(JSON.stringify(names));
});

server.use('/api/auth', require('./routes/api/auth'));

//## removed logInfoHandler
server.use('/api/core', logInfoHandler, require('./routes/api/core'));

server.use('/api/resource', require('./routes/api/resource'));

server.use('/api/filehandler',require('./routes/api/filehandler'));

server.use('/api/state', stateRoutes );

// If the server running in Production
if(process.env.NODE_ENV === 'production'){

}

//server.use(express.static(path.join(__dirname, 'build')));
server.use(express.static(path.join(__dirname, '../client', 'build')));
 

server.get('/', function(req, res) {
    //res.sendFile(path.join(__dirname, 'build', 'index.html'));
    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
});

//const PORT = process.env.PORT || 5000;


server.listen(process.env.PORT, process.env.ADDRESS, () => {
    process.sessionStorage = {};
    process.ownerResources = {
        'RuntimeEnvDetails' : {},
        'RuntimeResource' : {}
    };
    console.log("server running in ", process.env.ADDRESS,":",process.env.PORT); 
}).timeout = 700000;
