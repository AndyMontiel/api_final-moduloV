
import  Express  from "express";
import Morgan from "morgan";
import RutasComercio from "./routes/comercio.routes.js";
import RutasUsuario from   "./routes/usuario.routes.js";
import RutasAuth from   "./routes/autenticar.routes.js";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";
import { createRoles, createAdmin, createCategoria } from "./libs/configInit.js";

createRoles();
createAdmin();
createCategoria();


const options =  {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Documentacion API",
            description: "Documentando la API",
            contact: {
            name: "Belmont"
            },
            servers: ["http://localhost:3000"]
        }
    },
    // ['.routes/*.js']
    apis: ["./routes/*.js"]
   
    
  };
const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({extended:true})); 
app.use(Morgan('dev'));
app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method', 'x-access-token');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    })
app.use(RutasComercio)
app.use(RutasUsuario)
app.use(RutasAuth)
app.set('puerto', process.env.PORT || 3000)



const swaggerDocs = swaggerJSDoc(options);
app.use('/api-documentacion', swaggerUi.serve, swaggerUi.setup(swaggerDocs));




//GET con  
app.get("/",(req,res)=>{
    res.send("hola mongo");
})




export default app
