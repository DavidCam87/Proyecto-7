const User = require('../api/models/user');
const { verifyJwt } = require('../utils/jwt');

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json("no estas autorizado");
    };
    const parsedtoken = token.replace("Bearer ", "");
    const { id } = verifyJwt(parsedtoken);
    const user = await User.findById(id);

    user.password = null;
    req.user = user;
    next();

  } catch (error) {
    return res.status(400).json("no estas autorizado")
  };
};

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const parsedtoken = token.replace("Bearer ", "");
    const { id } = verifyJwt(parsedtoken);
    const user = await User.findById(id);

    if (user.rol === "admin") {
      user.password = null;
      req.user = user;
      next();
    } else {
      return res.status(400).json("no estas autorizado, Solo administradores");
    }

  } catch (error) {
    return res.status(500).json("¡Solo Administradores!" + error.message);
  }
};

module.exports = { isAuth, isAdmin }