require("dotenv").config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require("./src/config/db");
const videogameRoutes = require("./src/api/routes/videogame");
const plataformRoutes = require("./src/api/routes/plataform");
const usersRoutes = require("./src/api/routes/user");

const app = express();
app.use(express.json());
app.use(cors());
connectDB();
const PORT = 3000;

app.use("/api/v1/plataforms", plataformRoutes);
app.use("/api/v1/videogames", videogameRoutes);
app.use("/api/v1/users", usersRoutes);

app.use("*", (req, res, next) => {
  return res.status(404).json("Rute not foud 😭😭")
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 👌🏼🆗`);
});