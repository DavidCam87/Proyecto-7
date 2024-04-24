const { generateSing } = require('../../utils/jwt');
const User = require('../models/user');
const bcrypt = require("bcrypt");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json("error");
  }
}

const register = async (req, res, next) => {
  try {
    const newUser = new User({
      userName: req.body.userName,
      password: req.body.password,
      rol: "user"
    });
    const userDuplicated = await User.findOne({ userName: req.body.userName });
    if (userDuplicated) {
      return res.status(400).json("Nombre de usuario existente");
    }

    const userSaved = await newUser.save();
    return res.status(200).json(userSaved);
  } catch (error) {
    return res.status(400).json(error.message);
  };
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        //! lo que pasa cuando te logeas jsonwebtoken
        const token = generateSing(user._id);
        return res.status(200).json({ user, token });

      } else {
        return res.status(400).json("Usuario o contraseña incorrecta");
      }
    } else {
      return res.status(400).json("Usuario o contraseña incorrecta");
    }

  } catch (error) {
    return res.status(400).json(error.message);
  };
};

const deleteUser = async (req, res, next) => {
  try {
    /* const { id } = req.params; */ //otro metodo para traer el id
    const userDeleted = await User.findByIdAndDelete(req.params.id);//aqui solo se podria id
    return res.status(200).json({
      mensaje: "usuario eliminado con exito",
      userDeleted
    });
  } catch (error) {
    return res.status(400).json("error");
  };
};

const putUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newUser = new User(req.body);
    newUser._id = id;
    const updatedUser = await User.findByIdAndUpdate(id, newUser, { new: true });
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).json("ha fallado la peticion Put(Update)")
  };
};

module.exports = { getUsers, register, login, deleteUser, putUser };