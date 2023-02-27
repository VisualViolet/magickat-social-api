const {User, Thought} = require('../models');

module.exports = {
    // All users
    getUser(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err))
    },
    // Single user
    getSingleUser(req,res) {
        User.findOne({_id: req.params.userId})
        .select('-__v')
        .populate('thoughts')
        .populate('friends')
        .then((user) => {
            !user
                ? res.status(404).json({message: 'User does not exist!'})
                : res.json(user)
        })
        .catch((err) => res.status(500).json(err))
    },
    // Create a user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err))
    },
    // Update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((user) => {
            !user
                ? res.status(404).json({message: 'User does not exist!'})
                : res.json(user)
        })
        .catch((err) => res.status(500).json(err))
    },
    // Delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
        .then((user) => {
            !user
                ? res.status(404).json({message: 'User does not exist!'})
                : Thought.deleteMany({_id: {$in: user.thoughts}})
        })
        .then(() => res.json({message: 'User deleted!'}))
        .catch((err) => res.status(500).json(err))
    },
    // Add a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
        )
        .then((user) => {
            !user
                ? res.status(404).json({message: 'User does not exist!'})
                : res.json(user)
        })
        .catch((err) => res.status(500).json(err))
    },
    // Delete a friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {runValidators: true, new: true}
        )
        .then((user) => {
            !user
                ? res.status(404).json({message: 'User does not exist!'})
                : res.json(user)
        })
        .catch((err) => res.status(500).json(err))
    },
};