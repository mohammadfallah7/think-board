import express from "express";

const app = express();

app.get("/api", (req, res) => {
  res.send("Hello from the backend");
});

app.listen(5001, () => {
  console.log("Server started on port: 5001");
});
