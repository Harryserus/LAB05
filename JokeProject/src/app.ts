import express, { Request, Response } from "express";
import path from "path";

const app = express();
const port = 3000;

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "../public")));

// API route
app.get("/api/joke", async (req: Request, res: Response) => {
  try {
    const apiRes = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?type=twopart"
    );
    const data = await apiRes.json();

    res.json({
      setup: data.setup,
      delivery: data.delivery
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch joke" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
