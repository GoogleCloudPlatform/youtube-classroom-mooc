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

/* const bp = require('body-parser');
app.use(bp.json());
app.use(bp.urlencoded({ extended: true })); */


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