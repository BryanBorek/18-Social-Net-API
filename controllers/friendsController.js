const { Friend, User, Reaction, Thought } = require('../models');

module.exports = {
    // Add friend
    addFriend(req, res) {
        Friend.create(req.body)
            .then((friend) => res.json(friend))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    deleteFriend(req, res) {
        Friend.findOneAndDelete({ _id: req.params.friendId })
            .then((friend) =>
                !friend
                    ? res.status(404).json({ message: 'No friend with that ID' })
                    : res.json(friend)
            )
            .then(() => res.json({ message: 'Friend deleted!' }))
            .catch((err) => res.status(500).json(err));
    },

};