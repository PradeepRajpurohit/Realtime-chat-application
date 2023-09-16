import express, { json } from "express";
import cors from "cors";
import db from "./db.js";
import AuthRoutes from "./routes/AuthRoutes.js";

const connect = async () => {
    try {
        await db.authenticate();
        console.log("connection establish")
    } catch (error) {
        console.log(error);
    }
}

connect();

const port = 5000;


const app = express();
app.use(cors());
app.use(json());

app.use("/api/auth", AuthRoutes);

const server = app.listen(port, () => {
    console.log(`server started at ${port}`)
})