const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw { name: "Unauthorized", message: "Invalid token" };
    }

    const [type, token] = authorization.split(" ");
    if (type != "Bearer") {
      throw { name: "Unauthorized", message: "Invalid token" };
    }

    const decodeToken = verifyToken(token);

    if (!decodeToken.id) {
      throw { name: "Unauthorized", message: "Invalid token" };
    }

    const user = await User.findByPk(decodeToken.id);

    if (!user) {
      throw { name: "Unauthorized", message: "Invalid token" };
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
