// ****************** EDITED BY JARED BELLAMY 9/5/2022 ************************************
/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");
const { ProcessData } = require("./logic");

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8123";

/**
 *  App Configuration
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

/**
 * Routes Definitions
 */

// ~~~~~~~~~~~~~~~~~~~~~~~~~ EDITED - JARED BELLAMY ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.get("/", async (req, res) => {
  const data = await ProcessData();

  // error handling, mainly used if the user has used to many requests to the API and cannot get ticker information
  if (data) {
    res.render("index", {
      title: "Home",
      data: data,
    });
  } else {
    res.render("index", {
      title: "ERROR",
      data: null,
    });
  }
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~ END - JARED BELLAMY ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
