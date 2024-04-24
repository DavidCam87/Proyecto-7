const Plataform = require('../models/plataform');

//!Create
const postPlataform = async (req, res, next) => {
  try {
    const newPlataform = new Plataform(req.body);
    const savedPlataform = await newPlataform.save();
    return res.status(201).json(savedPlataform);
  } catch (error) {
    return res.status(400).json("ha fallado la peticion Post")
  };
};

//!Read
const getPlataform = async (req, res, next) => {
  try {
    const allPlataform = await Plataform.find().populate('videogames');
    return res.status(200).json(allPlataform);
  } catch (error) {
    return res.status(400).json("ha fallado la peticion Get")
  };
};

//!Read by ID
const getPlataformById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const plataformById = await Plataform.findById(id).populate('videogames');
    return res.status(200).json(plataformById);
  } catch (error) {
    return res.status(400).json("ha fallado la peticion GetById")
  };
}

//!Update
const putPlataform = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldPlataform = await Plataform.findById(id);
    const newPlataform = new Plataform(req.body);
    newPlataform._id = id;
    newPlataform.videogames = [...oldPlataform.videogames, ...req.body.videogames];
    const updatedPlataform = await Plataform.findByIdAndUpdate(id, newPlataform, { new: true });
    return res.status(200).json(updatedPlataform);
  } catch (error) {
    return res.status(400).json("ha fallado la peticion Put(Update)")
  };
};

//!Delete
const deletePlataform = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPlataform = await Plataform.findByIdAndDelete(id);
    return res.status(200).json(deletedPlataform);
  } catch (error) {
    return res.status(400).json("ha fallado la peticion Delete")
  };
};

module.exports = { postPlataform, getPlataform, getPlataformById, putPlataform, deletePlataform };