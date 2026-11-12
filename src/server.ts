import express from "express";

const app = express();

app.use(express.json());

// TypeScript Interface
interface Item {
  id: number;
  name: string;
}

// Items data
const items: Item[] = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Mouse" },
  { id: 3, name: "Keyboard" },
];

// GET /health
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "API is running",
  });
});

// GET /items
app.get("/items", (req, res) => {
  res.json(items);
});

// POST /items
app.post("/items", (req, res) => {
  const { id, name } = req.body;

  // Validate input
  if (
    typeof id !== "number" ||
    typeof name !== "string" ||
    name.trim() === ""
  ) {
    return res.status(400).json({
      error: "id must be a number and name must be a non-empty string",
    });
  }

  // Create new item
  const newItem: Item = {
    id,
    name,
  };

  // Add item to array
  items.push(newItem);

  // Send response
  res.status(201).json(newItem);
});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});