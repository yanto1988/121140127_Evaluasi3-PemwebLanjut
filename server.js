const express = require("express");
const app = express();
app.use(express.json());

app.post("/log", (req, res) => {
  console.log("Received metrics:", req.body);
  res.sendStatus(200);
});

app.listen(3000, () => console.log("Listening on port 3000"));
