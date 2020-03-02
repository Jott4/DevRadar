const axios = require("axios");
const Dev = require("../models/Dev");
const ParseStringAsArray = require("../utils/ParseStringAsArray");

module.exports = {
  async index(require, response) {
    const devs = await Dev.find();
    return response.json(devs);
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });
    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = github_username, avatar_url, bio } = apiResponse.data;

      const techsArray = ParseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }

    return response.json(dev);
  },
  async update() {
    const devs = await Dev.find();
  },
  async destroy(req, res) {
    const { github_username } = req.query;

    let dev = await Dev.findOne({ github_username });

    if (dev) {
      await Dev.deleteOne({
        github_username
      });

      let devAfter = await Dev.findOne({ github_username });

      if (!devAfter) {
        return res.json({ message: "Usuario Excluido" });
      } else {
        return res.json({ message: "Erro ao excluir usuario" });
      }
    } else {
      return res.json({ message: "Usuario não encontrado" });
    }
  }
};
