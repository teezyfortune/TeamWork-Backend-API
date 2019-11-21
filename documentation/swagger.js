import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefintion = {

    info: {
        titele: 'TeamWork API DOC',
        version: '1.0.0',
        description: 'Teamwork is an internal social network for employees of an organization. The goal of this application is to facilitate more interaction between colleagues and promote team bonding ',
    },
    host: 'localhost',
    basePath: '/api/v1/',
    schemes: ['https', 'http'],
    securityDefinitions: {
        jwt: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
        },
    },
    security: [{ jwt: []}],
};

const swaggerSpec = swaggerJSDoc({
    swaggerDefinition,
    apis: ['./**/*.route.js', './**/*/models/*.js'],
});

export default swaggerSpec;