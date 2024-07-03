//BLa7tDw1xfYyTlgp

import cors from "cors";
import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from './Routes/financial-record';


const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const mongoURI: string =
"mongodb+srv://ananyasingh0504:BLa7tDw1xfYyTlgp@wealthflow.gzyd4ml.mongodb.net/";

mongoose
    .connect(mongoURI)
    .then(() => console.log("CONNECTED TO MONGODB!"))
    .catch((err) => console.error("FAILED TO CONNECT TO MONGODB", err));


app.use("/financial-records", financialRecordRouter);

app.listen(port, () =>{
    console.log(`Server Running on port ${port}`);
})
