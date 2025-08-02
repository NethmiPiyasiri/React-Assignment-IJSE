const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  optionSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
};

app.use(cors(corsOptions));

dotenv.config();

app.use(express.json());
app.use(cookieParser());

// Basic route
app.get("/", (req, res) => {
  res.json("Welcome to our application.");
});

//table routes
const CreateTableRoute = require("./routes/createAlterTables");
app.use("/tables", CreateTableRoute);

const UserRoute = require("./routes/user");
app.use("/api/user", UserRoute);

const casesRouter = require("./routes/lost");
app.use("/api/lost", casesRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
