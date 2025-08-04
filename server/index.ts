import express from "express";
import path from "path";

const app = express();

// Serve static files from dist/public
app.use(express.static(path.resolve(__dirname, "..", "dist", "public")));

// Serve index.html for all other routes (SPA fallback)
app.get("*", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "dist", "public", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Static server listening on port ${port}`);
});
