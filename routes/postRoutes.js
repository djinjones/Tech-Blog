const router = require('express').Router();
const postController = require('../../controllers/postController');

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', postController.createPost);

module.exports = router;
