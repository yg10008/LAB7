const express = require("express");
const { connectDB } = require("./config/database");
const { taskRouter } = require("./routers/taskRouter");

const app = express();
app.use(express.json());

connectDB()
    .then(() => {
        console.log("CONNECTION_TO_DATABASE_IS_SUCCESSFULLY_ESTABLISHED");
        app.use("/", taskRouter);
        app.listen(108, () => {
            console.log("SERVER_UP_108");
        });
    })
    .catch((err) => {
        console.error("ERROR_OCCURED_IN_DATABASE_CONNECTION : " + err);
    });