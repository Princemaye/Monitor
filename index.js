const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.post("/create-monitor", async (req, res) => {
  const { url } = req.body;

  try {
    const response = await axios.post(
      "https://uptime.betterstack.com/api/v2/monitors",
      {
        url,
        monitor_type: "status",
        check_frequency: 60,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.BETTERSTACK_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.send(`Monitor created: ${response.data.data.attributes.url}`);
  } catch (error) {
    res.status(500).send("Failed to create monitor: " + error.message);
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
