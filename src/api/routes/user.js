const { isAdmin } = require("../../middlewares/auth");
const { getUsers, register, login, deleteUser, putUser } = require("../controllers/user");
const usersRoutes = require("express").Router();

usersRoutes.get("/", [isAdmin], getUsers);
usersRoutes.put("/:id", [isAdmin], putUser);
usersRoutes.delete("/:id", [isAdmin], deleteUser);
usersRoutes.post("/register", register);
usersRoutes.post("/login", login);

module.exports = usersRoutes