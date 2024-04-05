const TodoModel = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "Todo",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      text: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0, // false
      },
    },
    {
      tableName: "todo",
      freezeTableName: true,
      timestanmp: false,
    }
  );
  return Todo;
};

module.exports = TodoModel;
