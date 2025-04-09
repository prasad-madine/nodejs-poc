const express = require("express");
const app = express();

const users = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Doe",
  },
  {
    id: 3,
    name: "user3",
  },
  {
    id: 4,
    name: "user4",
  },
  {
    id: 5,
    name: "user5",
  },
  {
    id: 6,
    name: "user6",
  },
  {
    id: 7,
    name: "user7",
  },
  {
    id: 8,
    name: "user8",
  },
  {
    id: 9,
    name: "user9",
  },
  {
    id: 10,
    name: "user10",
  },
  {
    id: 11,
    name: "user11",
  },
];

app.get("/users", (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const usersOnPage = users.slice(startIndex, endIndex);
  res.json(usersOnPage);
});

app.listen(4000);
