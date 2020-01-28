import express from "express";
import swaggerJSDocs from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

import "dotenv/config";
import swaggerJSDoc from "swagger-jsdoc";


import authRoute from "./routes/authRoute";

const app = express()

/**
 * swaggerOptions configuration
 * 
 */

 const swaggerOptions = {
    swaggerDefinition: {
         info: {
             title: 'ANSC API',
             version: '1.0.0',
             description: 'ANSC WEB AND MOBILE API',
             contact: {
                 name: 'Onuorah Charles'
             },
             server:['http://localhost:4000']
         }
     },
     apis: ['./routes/*.js']
 }

 const swaggerDocs = swaggerJSDoc(swaggerOptions)

app.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocs);
  });

/**
 * @swagger 
 * /customers:
 *  get:
 *      description: Use to request all customer
 *      responses:
 *          '200':
 *          description: A successful response
 */
//app.get('/customers', (req, res) => res.send({message:'hello world'}))

app.use('/api/v1/auth', authRoute)






const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})

export default app;

