const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models')

module.exports = {
    getAllThoughts(req, res) {
        Thought.find()
            .then(thought =>
                res.json(thought))
            .catch((err) =>
                res.status(500).json(err));
    },
    createThought(req, res) {
        Thought.create(req.body)
            .then(thought => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                )
            })
            .then(user =>
                !user
                    ? res.status(404).json({ message: 'No matching userId' })
                    : res.json(user)
            )
            .catch((err) =>
                res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then(thought =>
                !thought
                    ? res.status(404).json({ message: 'No matching thoughtId' })
                    : res.json(thought)
            )
            .catch((err) =>
                res.status(500).json(err))
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then(thought =>
                !thought
                    ? res.status(404).json({ message: 'No matching thoughtId' })
                    : res.json(thought)
            )
            .catch((err) =>
                res.status(500).json(err))
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then(thought =>
                !thought
                    ? res.status(404).json({ message: 'No matching thoughtId' })
                    : Thought.deleteMany({ _id: { $in: thought.reactions } })
            )
            .then(() => res.json({ message: 'This thought and its reactions have been deleted' }))
            .catch((err) =>
                res.status(500).json(err))
    },
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then(thought =>
                !thought
                    ? res.status(404).json({ message: 'No matching thoughtId' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then(thought =>
                !thought
                    ? res.status(404).json({ message: 'No matching thoughtId' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};

