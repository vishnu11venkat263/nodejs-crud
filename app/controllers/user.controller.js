var User = require("../models/user.model.js");

exports.create = function (req, res) {
  // Create and Save a new user
  if (!req.body.userName) {
    res.status(400).send({ message: "User Name can not be empty" });
  }

  var user = new User({
    userName: req.body.userName,
    emailId: req.body.emailId,
    mobileNumber: req.body.mobileNumber,
    designation: req.body.designation,
    active: req.body.status || true,
  });

  user.save(function (err, data) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ message: "Some error occurred while creating the User." });
    } else {
      res.send(data);
    }
  });
};
     
exports.findAll = function (req, res) {
  // Retrieve and return all users from the database.
  User.find(function (err, users) {
    if (err) {
      res
        .status(500)
        .send({ message: "Some error occurred while retrieving users." });
    } else {
      res.send(users);
    }
  });
};

exports.findOne = function (req, res) {
  // Find a single user with a userId
  User.findById(req.params.userId, function (err, data) {
    if (err) {
      res
        .status(500)
        .send({
          message: "Could not retrieve user with id " + req.params.userId,
        });
    } else {
      res.send(data);
    }
  });
};

exports.update = function (req, res) {
  // Update a user identified by the userId in the request
  User.findById(req.params.userId, function (err, user) {
    if (err) {
      res
        .status(500)
        .send({
          message: "Could not find a user with id " + req.params.userId,
        });
    }

    user.title = req.body.title;
    user.content = req.body.content;

    user.save(function (err, data) {
      if (err) {
        res
          .status(500)
          .send({
            message: "Could not update user with id " + req.params.userId,
          });
      } else {
        res.send(data);
      }
    });
  });
};

exports.delete = function (req, res) {
  // Delete a user with the specified userId in the request
  User.remove({ _id: req.params.userId }, function (err, data) {
    if (err) {
      res
        .status(500)
        .send({ message: "Could not delete user with id " + req.params.id });
    } else {
      res.send({ message: "User deleted successfully!" });
    }
  });
};
