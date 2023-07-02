const express = require("express");
const router = express.Router();
const Image = require("../models/Image");

router.get("/images", async (req, res) => {
  try {
    const randomImages = await Image.aggregate().sample(2);

    res.json(randomImages);
  } catch (error) {
    console.error("Error fetching random images:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/images/:id/vote", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedImage = await Image.findByIdAndUpdate(
      id,
      { $inc: { voteCount: 1 } },
      { new: true }
    );

    res.json(updatedImage);
  } catch (error) {
    console.error("Error updating image vote count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
