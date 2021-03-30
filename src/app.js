const express = require("express");
const cors = require("cors");
const app = express();

/* Settings */
app.set("port", process.env.PORT || 4000);

/* Midlewares */
app.use(cors());
app.use(express.json());

/* Routes */
app.use("/api/users", require("./routes/users"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/directions", require("./routes/directions"));
app.use("/api/cards", require("./routes/cards"));
app.use("/api/stripes", require("./routes/stripes"));
app.use("/api/wishLists", require("./routes/wishLists"));

/* Export */
module.exports = app;
