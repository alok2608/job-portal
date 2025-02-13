import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from'swagger-ui-express';
import dotenv from 'dotenv'
import 'express-async-error'
import connectdb from './config/db.js';
import testRoutes from './routes/testRoutes.js'
import cors from 'cors'
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js'
import errorMidleware from './middlewares/errormiddleware.js';
import userRoutes from './routes/userRoutes.js'
import jobRoutes from './routes/jobRoutes.js'
import helmet from 'helmet';
import xss from 'xss-clean';
import ExpressMongoSanitize from 'express-mongo-sanitize';



dotenv.config();
connectdb();
//api config
const option={
    definition:{
openapi:"3.0.0",
info:{
    titile:"job portal Application",
    description:"node js job portal"
},
servers:[
    {
              url:"https://jobportal-2936.onrender.com"

    }
]
},
apis:['./routes/*.js']
}
const spec=swaggerJSDoc(option)

const app = express();

app.use(helmet());
app.use(xss());
app.use(ExpressMongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/job",jobRoutes);

app.use("/api-doc",swaggerUi.serve,swaggerUi.setup(spec))

app.use(errorMidleware);

const PORT=process.env.PORT ||8080
app.listen(PORT,()=>{
    console.log(`node running in ${process.env.DEV_MODE} mode on port no ${PORT}`);
})
