const { PORT } = require('../server/config');
const authRouter = require("../routes/auth");
const dataRouter = require("../routes/data");
const express = require("express");
const app = express();
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json()); //req.body
app.use('/api/auth',authRouter)
app.use('/api/data',dataRouter)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);

});

