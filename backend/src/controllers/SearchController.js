const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    const { latitude, longitude, techs} = req.query;

    const techsArray = parseStringAsArray(techs);

    let query = {};

    const location = {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        $maxDistance: 10000,
      }
    };

    const techsQuery = {
      $in: techsArray
    }

    if(techsArray.length)
      query.techs = techsQuery;

    query.location = location;

    const devs = await Dev.find(query);

    return res.json({ devs });
  }
}