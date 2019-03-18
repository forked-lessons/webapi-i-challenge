const express = require("express");
const db = require("./data/db");
const server = express();

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: "error retrieving the users" });
    });
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(id => {
      res.status(200).json(id);
    })
    .catch(error => {
      res.status(500).json({ message: "error retrieving the users" });
    });
});

server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  console.log("user information:", userInfo);
  const id = req.params.id;
  db.insert(userInfo)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      res.status(500).json({ message: "error posting the user" });
    });
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.update(id, changes)
    .then(updated => {
      if (update) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "user not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "error posting the user" });
    });
});
server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id).then(deleted => {
    res
      .status(204)
      .end()
      .catch(error => {
        res.status(500).json({ message: "error retrieving hubs" });
      });
  });
});

server.listen(8000, () => console.log("API running on port 8000"));
