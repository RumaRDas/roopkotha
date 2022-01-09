const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

//app
const app = express();

//db
mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  //mongoose.connect("mongodb://localhost:27017/User", { useNewUrlParser: true })
  .then(() => console.log(`DB CONNECTED`))
  .catch((err) => console.log(`DB CONNECTION ERROR ${err}`));

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

//route
app.get("/api", (req, res) => {
  res.json({
    data: "Getting response from node API",
  });
});

//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`SERVER IS RUNNING ON PORT ${port}`));
