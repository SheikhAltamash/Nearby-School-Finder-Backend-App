const schoolModel = require("../models/schoolModel");
const calculateDistance = require("../services/distanceCalculator");

module.exports = {
  addSchool: async (req, res) => {
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
      res.status(500).json({ error: "Failed to add school" });
    }
  },
  listSchools: async (req, res) => {
    try {
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
