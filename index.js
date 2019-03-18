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
      res.status(200).json(user);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The user information could not be retrieved." });
    });
});
// server.put("/api/users/:id", (req, res) => {
//   const { id } = req.params;
//   const changes = req.body;

//   db.update(id, changes)
//     .then(updated => {
//       if (update) {
//         res.status(200).json(updated);
//       } else {
//         res.status(404).json({ message: "user not found" });
//       }
//     })
//     .catch(error => {
//       res.status(500).json({ message: "error posting the user" });
//     });
// });
// server.delete("/api/users/:id", (req, res) => {
//   const id = req.params.id;
//   db.remove(id).then(deleted => {
//     res
//       .status(204)
//       .end()
//       .catch(error => {
//         res.status(500).json({ message: "error retrieving hubs" });
//       });
//   });
// });

server.listen(8000, () => console.log("API running on port 8000"));
