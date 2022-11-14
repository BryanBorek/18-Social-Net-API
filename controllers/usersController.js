const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models')

module.exports = {
    //Get all users
    getAllUsers(req, res) {
        User.find()
            .then(user =>
                res.json(user))
            .catch((err) =>
                res.status(500).json(err));
    },
    //Create new user
    createUser(req, res) {
        User.create(req.body)
            .then(user => 
                res.json(user))
            .catch((err) =>
                res.status(500).json(err));
    },
    //Get user by ID
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then(user =>
                !user
                    ? res.status(404).json({ message: 'No matching userId' })
                    : res.json(user)
            )
            .catch((err) =>
                res.status(500).json(err))
    },
    // Update user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then(user =>
                !user
                    ? res.status(404).json({ message: 'No matching userId' })
                    : res.json(user)
            )
            .catch((err) =>
                res.status(500).json(err))
    },
    //Delete user by ID
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then(user =>
                !user
                    ? res.status(404).json({ message: 'No matching userId' })
                    : res.json(user)
            )
            .catch((err) =>
                res.status(500).json(err))
    },
    //Add user friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then(user =>
            !user
                ? res.status(404).json({ message: 'No matching userId'})
                : res.json(user)
            )
            .catch((err) =>
            res.status(500).json(err))
    },
    //Delete user friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then(user =>
            !user  
            ? res.status(404).json({ message: 'No matching userId'})
            : res.json(user)
            )
            .catch((err) =>
            res.status(500).json(err))
    },
}