const mongoose = require('mongoose');

const videogameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  creator: { type: String, required: true },
  verified: { type: Boolean, required: true, default: false }
},
  {
    timestamps: true,
    collection: 'videogames'
  }
);

const Videogame = mongoose.model('videogames', videogameSchema, 'videogames');
module.exports = Videogame;