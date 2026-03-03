import express from "express";
import dotenv from "dotenv";
import movieRoutes from "./routes/movieRoutes.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(
    {
        // origin: 'http://localhost:5173'
    }
))

// app.get("/", (req, res) => {
//     res.status(200).json("Movie Backend Running");
// });
// app.listen(PORT, () => {
//     console.log(`http://localhost:${PORT}`);
// });
app.use(express.json());
app.use("/movies", movieRoutes);
connectDB().then(() => {
    app.listen(PORT,() => {
        console.log(`http://localhost:${PORT}/movies`);
    });
});
