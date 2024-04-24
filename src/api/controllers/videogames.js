const Videogame = require('../models/videogame');

//!Create
const postVideogame = async (req, res, next) => {
  try {
    const newVideogame = new Videogame(req.body);
    //imposibilitar que el juego subido por usuario se vea (trabajo de front)
    if (req.user.rol === "admin") {
      newVideogame.verified = true;
    } else {
      newVideogame.verified = false;
    }

    const savedVideogame = await newVideogame.save();
    return res.status(201).json(savedVideogame);
  } catch (error) {
    return res.status(400).json("ha fallado la peticion Post")
  };
};

//!Read
const getVideogame = async (req, res, next) => {
  try {
    const allVideogame = await Videogame.find({ verified: true });//imposibilitar que el juego subido por usuario se vea (trabajo de front pero echo en back)
    return res.status(200).json(allVideogame);
  } catch (error) {
    return res.status(400).json("ha fallado la peticion Get")
  };
};

//!Read Admin
const getVideogamesAdmin = async (req, res, next) => {
  try {
    const allVideogame = await Videogame.find({ verified: false });
    return res.status(200).json(allVideogame);
  } catch (error) {
    return res.status(400).json("ha fallado la peticion Get")
  };
};

//!Read by ID
const getVideogameById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const videogameById = await Videogame.findById(id);//imposibilitar que el juego subido por usuario se vea (trabajo de front pero echo en back)
    return res.status(200).json(videogameById);
  } catch (error) {
    return res.status(400).json("ha fallado la peticion GetById")
  };
}

//!Update
const putVideogame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newVideogame = new Videogame(req.body);
    newVideogame._id = id;
    const updatedVideogame = await Videogame.findByIdAndUpdate(id, newVideogame, { new: true });
    return res.status(200).json(updatedVideogame);
  } catch (error) {
    return res.status(400).json("ha fallado la peticion Put(Update)")
  };
};

//!Delete
const deleteVideogame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedVideogame = await Videogame.findByIdAndDelete(id);
    return res.status(200).json(deletedVideogame);
  } catch (error) {
    return res.status(400).json("ha fallado la peticion Delete")
  };
};

module.exports = { postVideogame, getVideogame, getVideogameById, putVideogame, deleteVideogame, getVideogamesAdmin };