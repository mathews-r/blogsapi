module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    'BlogPost', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      published: { type: DataTypes.DATE, defaultValue: new Date() },
      updated: { type: DataTypes.DATE, defaultValue: new Date() },
    },
    {
      tableName: "blog_posts",
      timestamps: false,
      underscored: true,
    });

    BlogPost.associate = (models) => {
      BlogPost.belongsTo(models.User, {
        foreingKey: 'user_id',
        as: 'user',
      })
    }
  return BlogPost;
}
