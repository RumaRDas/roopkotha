const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

//import routs
//const authRouts = require("./routes/auth");
//app
const app = express();

//db
mongoose
  //.connect(process.env.DATABASE, {
  .connect(process.env.MONGO_URI, {
    // useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
   // useCreateIndex: true,
    // useFindAndModify: false
  })
  //mongoose.connect("mongodb://localhost:27017/User", { useNewUrlParser: true })
  .then(() => console.log(`DB CONNECTED`))
  .catch((err) => console.log(`DB CONNECTION ERROR ${err}`))

//middlewares
app.use(bodyParser.json({ limit: "5mb" }));
app.use(morgan("dev"));
app.use(cors());

//route middleware
//app.use("/api", authRouts);
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`SERVER IS RUNNING ON PORT ${port}`));
