const schoolModel = require("../models/schoolModel");
const calculateDistance = require("../services/distanceCalculator");
const Joi = require("joi");
// Joi Schemas
const addSchoolSchema = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
});

const listSchoolsSchema = Joi.object({
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
});

module.exports = {
  addSchool: async (req, res) => {
     const { error } = addSchoolSchema.validate(req.body);
     if (error) {
       return res.status(400).json({ message: error.details[0].message });
     }
    try {
      const { name, address, latitude, longitude } = req.body;
      if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: "All fields are required" });
      }
      const result = await schoolModel.addSchool(req.body);
      res
        .status(201)
        .json({
          message: "School added successfully",
          schoolId: result.insertId,
        });
    } catch (err) {
      res.status(500).json({ error: "Failed to add school",mesage: err.message });
    }
  },
  listSchools: async (req, res) => {
    try {
      const { error } = listSchoolsSchema.validate(req.query);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      const { latitude, longitude } = req.query;
      if (!latitude || !longitude) {
        return res
          .status(400)
          .json({ error: "Latitude and Longitude are required" });
      }

      const userLat = parseFloat(latitude);
      const userLon = parseFloat(longitude);

      const schools = await schoolModel.getAllSchools();
      const schoolsWithDistance = schools.map((school) => ({
        ...school,
        distance: calculateDistance(
          userLat,
          userLon,
          school.latitude,
          school.longitude
        ),
      }));

      schoolsWithDistance.sort((a, b) => a.distance - b.distance);
      res.status(200).json(schoolsWithDistance);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch schools" });
    }
  },
};
