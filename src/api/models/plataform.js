const mongoose = require('mongoose');

const plataformSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  creator: { type: String, required: true },
  videogames: [{ type: mongoose.Types.ObjectId, ref: "videogames", required: false }],
},
  {
    timestamps: true,
    collection: 'plataforms'
  }
);

const Plataform = mongoose.model('plataforms', plataformSchema, 'plataforms');
module.exports = Plataform;