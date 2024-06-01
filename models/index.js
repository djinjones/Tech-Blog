const User = require('./User');
const BlogPost = require('./BlogPost');

User.hasMany(BlogPost, {
  foreignKey: 'author'
});

BlogPost.belongsTo(User, {
  foreignKey: 'author'
});

module.exports = { User, BlogPost };
