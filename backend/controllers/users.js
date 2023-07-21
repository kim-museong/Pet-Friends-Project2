const { User, Post } = require('../models');
const { sequelize } = require('../models');

/////////////////////////////////////////////////////////
//////////////////// get user list //////////////////////
/////////////////////////////////////////////////////////
exports.getUsers = async (req, res, next) => {
  const { limit = 5, sortType = 'newest' } = req.query;

  const transaction = await sequelize.transaction();

  const sortOptions = {
    newest: { column: 'createdAt', order: 'DESC' },
    oldest: { column: 'createdAt', order: 'ASC' },
    highestViews: { column: 'view', order: 'DESC' },
    lowestViews: { column: 'view', order: 'ASC' },
  };

  const { column, order } = sortOptions[sortType] || sortOptions.newest;

  try {
    // 1. get users
    let users = await User.findAll({
      include: [
        {
          model: Post,
        },
      ],
      order: [[column, order]],
      limit,
      transaction,
    });

    // remove password from users & input postCount
    users = users.map((user) => {
      const { password, ...otherData } = user.dataValues;
      otherData.postCount = user.Posts.length;
      return otherData;
    });

    // transaction commit
    await transaction.commit();
    console.log(users);
    return res.status(200).json(users);
  } catch (error) {
    // transaction rollback
    await transaction.rollback();

    console.error(error);
    next(error);
  }
};

////////////////////////////////////////////////////
//////////////////// get user //////////////////////
////////////////////////////////////////////////////
exports.getUser = async (req, res, next) => {
  const { userId } = req.params;

  const transaction = await sequelize.transaction();

  try {
    // 1. get user
    let user = await User.findOne({
      where: { id: userId },
      transaction,
    });

    // remove password from users & input postCount
    const { password, ...otherData } = user.dataValues;
    user = otherData;

    // transaction commit
    await transaction.commit();
    console.log(user);
    return res.status(200).json(user);
  } catch (error) {
    // transaction rollback
    await transaction.rollback();

    console.error(error);
    next(error);
  }
};
