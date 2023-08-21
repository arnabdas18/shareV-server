require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConnect = require("./src/util/dbConnect");
const userRoutes = require("./src/routes/user.routes");
const videoRoutes = require("./src/routes/video.routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// async Immediately Invoked Function Expression (I.I.F.E.)
(async () => {
  try {
    await dbConnect(); // connect to mongodb

    // all user routes are accessed through /api/auth
    // endpoints - /register & /login
    app.use("/api/auth", userRoutes);
    app.use("/api", videoRoutes);

    app.listen(process.env.PORT, () => {
      console.log(`Server running on Port: ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(`Error running server`);
    console.log(error);
  }
})();
