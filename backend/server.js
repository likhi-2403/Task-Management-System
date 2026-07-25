require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./src/config/database");

const app = express();

const userRoutes = require("./src/routes/userRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Server is working"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});