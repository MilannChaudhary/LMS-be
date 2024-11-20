import express from "express";
import { connectMongoDB } from "./src/config/mongoConfig.js";

const app = express();
const PORT = process.env.PORT || 8000;
import cors from "cors";
import userRouter from "../be_lms/src/routers/userRouter.js";
import bookRouter from "../be_lms/src/routers/bookRouter.js";

//config

connectMongoDB()
  .then(() => {
    app.listen(PORT, (error) => {
      error ? console.log(error) : console.log(`server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error(error));

/// Middlewares
app.use(express.json());
app.use(cors());
console.log(process.env.JWT_SECRET);

//Routers

app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", bookRouter);

app.get("/", (req, res) => {
  res.json({
    message: "server is live",
  });
});

// Listen server
