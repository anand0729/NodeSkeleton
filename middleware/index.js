
const bodyParser     = require('body-parser');
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require('cors');
const compression = require('compression')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const morgan = require('morgan');
var fs        = require('fs');
var path      = require('path');
let moment = require('moment');
module.exports = function(app) {
    //LIMIT the HTTP Request
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
    });
    app.use(limiter); 

     //TO SECURE THE REQUEST BODY
     app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
     app.use(bodyParser.json({limit: '5mb'}));

     //To Compress all the responses 
     app.use(compression())

     //To Secure HTTP Headers
     app.use(helmet());

     //CORS CHECK
     var corsOptions = {
        methods : "GET,POST",
        preflightContinue: false,
        optionsSuccessStatus: 200 
    } 
    app.use(cors(corsOptions));

    //Log All the HTTP Request
    //app.use(morgan('tiny'))
    let CurrentDate = moment().tz("Asia/Kolkata").format('MMMM Do YYYY');
    let accessLogStream = fs.createWriteStream(
        path.join(__dirname, '../accessLog/'+CurrentDate+'.log'), {flags: 'a'}
    );
    morgan.token('date', function() {
        var p = new Date().toString().replace(/[A-Z]{3}\+/,'+').split(/ /);
        return( p[2]+'/'+p[1]+'/'+p[3]+':'+p[4]+' '+p[5] );
    });
    app.use(morgan('combined', {stream: accessLogStream}));

    //VALIDATE ALL INCOMING REQUEST TOKEN
    app.use((req,res,next)=>{
        if(req.path.includes("auth") )
            next();
        else{
            try {
                const token = req.headers.authorization.split(' ')[1];
                if (!token) {
                    let resp = {
                        status : 403,
                        msg : "Access Denied",
                        err : 'Authorization Not Found !'
                    }
                    res.status(403).send(resp);
                }
                try {
                    userInfo = jwt.verify(token, process.env.TokenSecret);
                    req.userInfo = userInfo;
                    next();
                } catch (err) {
                    let resp = {
                        status : 401,
                        msg : "Access Denied",
                        err : "Token Expired (or) Invalid Token"
                    }
                    res.status(401).send(resp); 
                }
            } catch (err) {
                let resp = {
                    status : 403,
                    msg : "Access Denied",
                    err : 'Authorization Not Found !'
                }
                   
                
                res.status(403).send(resp);
            }
        }
    })
}


 