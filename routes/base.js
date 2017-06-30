const express      = require('express'),
      router       = express.Router(),
      swaggerJSDoc = require('swagger-jsdoc');

const config       = require("../config");

// swagger definition
const swaggerDefinition = {
    info: {
        title: 'Mini HN Swagger API',
        version: '1.0.0',
        description: 'Mini HN Swagger API',
    },
    host: `localhost:${config.http.port}`,
    basePath: '/',
};

// options for the swagger docs
const options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes/*.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

router.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

module.exports = router;