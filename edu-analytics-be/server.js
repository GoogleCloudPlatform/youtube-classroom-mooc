const express = require('express');
const app = express();

require('dotenv').config();
const routers = require('./web/app/routers');
const error = require('./web/app/middleware/error');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const pkg = require('./package.json');

const port = process.env.PORT || 8080;

app.use(express.json());

//error middleware
app.use(error);

//ORM mysql
const connection = require('./web/app/common/connection');

routers.map(router => app.use('/eduAnalytics/', router));

app.get('/', (req, res) => {
    res.send(`Server is Ok`);
})

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