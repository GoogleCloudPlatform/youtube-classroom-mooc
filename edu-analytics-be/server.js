const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
require('dotenv').config();

//ORM mysql
const connection = require('./web/app/common/connection');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const pkg = require('./package.json');
app.use(express.json());

const routers = require('./web/app/routers');
const error = require('./web/app/middleware/error');

const cors = require('cors');
app.use(cors());

/*const { google } = require('googleapis');
const urlParse = require('url-parse');
const queryParse = require('query-string');
const axios = require('axios');

app.get('/oauthUrl', (req, res, next) => {
    const oauth2Client = new google.auth.OAuth2(
        //clientid
        "532482101496-tmijs31sk91ohop17lmaq9br96oi758m.apps.googleusercontent.com",
        //client secret
        "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",
        //redirect url
        "http://localhost:8080/token"
    );
    const scopes = [
        'https://www.googleapis.com/auth/classroom.courses',
        'https://www.googleapis.com/auth/classroom.coursework.students',
        'openid email profile',
    ]
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
        state: JSON.stringify({
            callbackUrl: req.body.callbackUrl,
            userID: req.body.userID
        })
    })
    res.send(url);
})

app.get('/token', async (req, res) => {
    const queryUrl = new urlParse(req.url);
    const code = queryParse.parse(queryUrl.query).code;
console.log('code:',code);
    const oauth2Client = new google.auth.OAuth2(
        //clientid
        "532482101496-tmijs31sk91ohop17lmaq9br96oi758m.apps.googleusercontent.com",
        //client secret
        "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",
        //redirect url
        "http://localhost:8080/token"
    );
    const tokens = await oauth2Client.getToken(code);
    console.log('tokens.tokens.access_token:',tokens.tokens.access_token);



    try {
        const result = await axios({
            method: "get",
            headers: { Authorization: `Bearer ${tokens.tokens.access_token}` },
            url: 'https://classroom.googleapis.com/v1/courses?courseStates=ACTIVE'
        })
        //res.send(result.data);
    } catch (error) {
        console.log(error);
        //res.send('Invalid user').status(400);
    }

    try {
        const user = await axios({
            method: "get",
            headers: { Authorization: `Bearer ${tokens.tokens.access_token}` },
            url: `https://www.googleapis.com/oauth2/v1/userinfo`
        })
        res.send(user.data);
    } catch (error) {
        console.log(error);
        //res.send('Invalid user').status(400);
    }


});*/


/* const bp = require('body-parser');
app.use(bp.json());
app.use(bp.urlencoded({ extended: true })); */

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/', (req, res) => {
    res.send(`Server is Ok`);
})

routers.map(router => app.use('/eduAnalytics/', router));


//error middleware
app.use(error);

//Set up swagger jsdoc
const swaggerDefinition = {
    info: {
        title: pkg.name,
        version: pkg.version,
        description: pkg.description,
    },
    basePath: '/eduAnalytics/',
    tags: [],
    securityDefinitions: {
        Bearer_Token: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
        }
    },
    security: [{
        Bearer_Token: []
    }],
};

const options = {
    //import swagger definition
    swaggerDefinition,
    //Path to api docs
    apis: ['./web/app/routers/*.js'],
};

//custom swagger UI options
const swaggerUiOptions = {
    swaggerOptions: {
        docExpansion: 'none',
        filter: true,
        defaultModelExpandDepth: -1,
        displayRequestDuration: true,
    },
    customSiteTitle: 'web-api'
};

//initilize swagger-jsdoc => returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

//hook swagger-jsdoc provided json spec in swagger-ui-express
app.use('/eduAnalytics/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

app.listen(port, () => {
    console.log(`Server listining to port ${port}`)
})