module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    "PostCategory",
    {
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    { tableName: "posts_categories", timestamps: false, underscored: true }
  );

  PostCategory.associate = ({ BlogPost, Category }) => {
    Category.belongsToMany(BlogPost, {
      as: "blog_posts",
      through: PostCategory,
      foreignKey: "post_id",
      otherKey: "category_id",
    });
    BlogPost.belongsToMany(Category, {
      as: "categories",
      through: PostCategory,
      foreignKey: "category_id",
      otherKey: "post_id",
    });
  };
  return PostCategory;
};
