const router = require('express').Router();
const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    createFriend,
    deleteFriend
} = require('../../controllers/userController.js');

router.route('/').get(getUser).post(createUser);

router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

router.route('/:userId/friends')
    .post(createFriend);

router.route('/:UserId/friends/:friendId')
    .delete(deleteFriend);


module.exports = router;