// import models
const User = require('./User');
const Post = require('./Post');

Post.belongsTo(Category, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

User.hasMany(post, {
  foreignKey: 'user_id',
});

module.exports = {
  User, Post
};
