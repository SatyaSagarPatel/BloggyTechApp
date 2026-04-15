const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const usersRouter = require("./routes/users/usersRouter");
const connectDB = require("./config/database");
const {
  notFound,
  globalErrorHnadler,
} = require("./middlewares/globalErrorHandler");
const { categoriesRouter } = require("./routes/categories/categoriesRouter");
const postsRouter = require("./routes/posts/postsRouter");
const commentsRouter = require("./routes/comments/commentsRouter");

//create an express app
const app = express();
// const PORT = 8080;
dotenv.config();

//establish connection to database
// connectDB();
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

//setup middleware
app.use(express.json());

//cors middleware
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend running on Vercel");
});

//setup router
app.use("/api/v1/users", usersRouter);

//setup categoryRoute
app.use("/api/v1/categories", categoriesRouter);

//setup post Routeer
app.use("/api/v1/posts", postsRouter);

//setup the comment router
app.use("/api/v1/comments", commentsRouter);

//Not found error handler
app.use(notFound);

//setup globl error handler
app.use(globalErrorHnadler);

module.exports = app;
