const express = require("express");
const db = require("./data/db");
const server = express();
server.use(express.json());

server.post("/api/users", (req, res) => {
  const newUser = req.body;
  console.log("User: ", newUser);

  if (newUser.name && newUser.bio) {
    db.insert(newUser)
      .then(newUser => {
        res.status(201).json(newUser);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: "error posting the user" });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
});

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
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })

    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(user => {
      if (user) {
        res.status(204).json(user);
      } else {
        res.status(404).json({ error });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "The user could not be removed" });
    });
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (changes.name && changes.bio) {
    db.update(id, changes)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "The user information could not be modified." });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
});

server.listen(8000, () => console.log("API running on port 8000"));
