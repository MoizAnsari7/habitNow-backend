const express = require("express");
const app = express();
const router = express.Router();


//routes logic will come here.// Import routes (assuming you have separate route files)
const habitRoutes = require("../routes/habit.routes");
const recurringTaskRoutes = require("../routes/recurringTask.routes");
const taskRoutes = require("../routes/task.routes");
const userRoutes = require("../routes/user.routes");
const categoryRoutes = require("../routes/category.routes");

router.use("/habit", habitRoutes);
router.use("/recurringTask", recurringTaskRoutes);
router.use("/task", taskRoutes);
router.use("/user", userRoutes);
router.use("/category", categoryRoutes);


module.exports = router;