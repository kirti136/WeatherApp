const express = require('express');
const { weatherRouter } = require("./Routes/weather.route")
require("dotenv").config()

const app = express();

//middlewares
app.use(express.json());
app.use("/weather", weatherRouter)



app.listen(process.env.port, () => {
    console.log(`Server listening on port ${process.env.port}`);
})






