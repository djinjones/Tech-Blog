const { Post } = require('../models');

const postController = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.findAll();
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getPostById: async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id);
      if (!post) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  createPost: async (req, res) => {
    try {
      const newPost = await Post.create(req.body);
      res.status(201).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};

module.exports = postController;