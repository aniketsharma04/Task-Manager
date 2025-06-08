const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const corsOptions = {
	origin: process.env.FRONTEND_URL,
	methods: ["GET", "POST", "DELETE", "PUT"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

// All routers
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const taskRoute = require("./routes/task");
const analyticsRoute = require("./routes/analytics");

// Connect to Database
main()
	.then(() => console.log("Database Connection established"))
	.catch((err) => console.log(err));

async function main() {
	await mongoose.connect(process.env.MONGODB_URI);
}

// Root route
app.get("/", (req, res) => {
	res.json({
		message: "Welcome to Task_Management!",
		frontend_url: process.env.FRONTEND_URL,
	});
});

// All routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/task", taskRoute);
app.use("/api/analytics", analyticsRoute);

// Invaild routes
app.all("*", (req, res) => {
	res.json({ error: "Invaild Route" });
});

// Error handling middleware
app.use((err, req, res, next) => {
	const errorMessage = err.message || "Something Went Wrong!";
	res.status(500).json({ message: errorMessage });
});

// Start the server
const server = app.listen(PORT, async () => {
	console.log(`Server listening on ${PORT}`);
});
