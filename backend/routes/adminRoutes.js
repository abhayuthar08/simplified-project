

const express = require("express");
const path = require("path"); // To serve React files

// Import Controllers (Ensure paths are correct)
const {
  // registerAdmin,
  // loginAdmin,
  // addSubject,
  // addRoomVenue,
  generateTimeTableController,
  getResultTimeTableController,
} = require("../controllers/allControllers.js"); // Ensure this file exports all functions correctly

const {registerAdmin,
  loginAdmin,logoutAdmin,addSubject,addRoomVenue
  } = require("../controllers/adminController.js"); // Ensure this file exports all functions correctly

const router = express.Router();

// ✅ Admin Authentication Routes
router.post("/register", async (req, res) => {
  try {
    await registerAdmin(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error during registration." });
  }
});

router.post("/login", async (req, res) => {
  try {
    await loginAdmin(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error during login." });
  }
});

router.post("/logout", async (req, res) => {
  try {
    await logoutAdmin(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error during login." });
  }
});
// ✅ Subject Management
router.post("/add-subject", async (req, res) => {
  try {
    await addSubject(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error while adding subject." });
  }
});

// ✅ Room Management
router.post("/add-room-venue", async (req, res) => {
  try {
    await addRoomVenue(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error while adding room." });
  }
});

// ✅ Timetable Routes
router.post("/generate-time-table", async (req, res) => {
  try {
    await generateTimeTableController(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error while generating timetable." });
  }
});

router.get("/result-time-table", async (req, res) => {
  try {
    await getResultTimeTableController(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error while fetching timetable." });
  }
});

// ✅ Serve React Frontend Based on Environment
if (process.env.NODE_ENV === "production") {
  // In production, serve built frontend files
  const frontendPath = path.join(__dirname, "../frontend/dist");
  router.use(express.static(frontendPath));

  router.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  // In development mode, show a message
  router.get("*", (req, res) => {
    res.send("React app is running in development mode via Vite.");
  });
}

// ✅ Export Router
module.exports = router;
