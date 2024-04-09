const { Todo, sequelize } = require("../models");

// test용 api
exports.getIndex = (req, res) => {
  res.send("response from api server [GET /api-server]");
};

exports.getUser = (req, res) => {
  res.send("response from api server [GET /api-server/user]");
};

// GET /api-server/todos
exports.getTodos = async (req, res) => {
  try {
    const todoAll = await Todo.findAll(); // [{id, text, done}]
    res.json(todoAll);
  } catch (err) {
    console.log("server err!", err);
    res.status(500).send("SERVEr ERROR!!, 관리자에게 문의하셍요");
  }
};

// POST /api-server/todo
exports.postTodo = async (req, res) => {
  /*{
    id: 모델 정의시 auto_increment 속성 추가해두었음(x)
    text: 할일(o)
    done: 모델 정의시 false(0)를 defaultValue 처리해두었음(x)
  }*/
  try {
    // req.body = {text: "~~~~"}
    const { text } = req.body;
    await Todo.create({
      text,
    });
    res.send({ isSucess: true });
  } catch (err) {
    console.log("server err!", err);
    res.status(500).send("SERVEr ERROR!!, 관리자에게 문의하셍요");
  }
};

// PATCH /api-server/todo/:todoId
// 수정이 아닌 todo 상태 변경
exports.patchDoneState = async (req, res) => {
  try {
    const { todoId } = req.params;
    const [isUpdated] = await Todo.update(
      /*
        sequlize import 해와야 합니다
        sequelize.literal: query를 날릴(?) 수 있도록 도와줌
      */
      { done: sequelize.literal("NOT done") }, // 현재값과 반대로 하기 위해서 실제 sql query문 사용
      { where: { id: todoId } }
    );
    isUpdated
      ? res.status(200).send({ isSucess: true })
      : res.status(404).send({ isSucess: false });
  } catch (err) {
    console.log("server err!", err);
    res.status(500).send("SERVER ERROR!, 관리자에게 문의하세요");
  }
};

exports.patchUndoState = async (req, res) => {
  try {
    const { todoId } = req.params;
    const [isUpdated] = await Todo.update(
      /*
        sequlize import 해와야 합니다
        sequelize.literal: query를 날릴(?) 수 있도록 도와줌
      */
      { done: false }, // 현재값과 반대로 하기 위해서 실제 sql query문 사용
      { where: { id: todoId } }
    );
    isUpdated
      ? res.status(200).send({ isSucess: true })
      : res.status(404).send({ isSucess: false });
  } catch (err) {
    console.log("server err!", err);
    res.status(500).send("SERVER ERROR!, 관리자에게 문의하세요");
  }
};

// DELETE /api-server/todo/:todoId
exports.deleteTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    const isDeleted = await Todo.destroy({ where: { id: todoId } });
    isDeleted
      ? res.status(200).send({ isSucess: true })
      : res.status(404).send({ isSucess: false }); // 잘못된 todoId 보낼 경우
  } catch (err) {
    console.log("server err!", err);
    res.status(500).send("SERVER ERROR! 관리자에게 문의하세요");
  }
};

// [추가] 내용수정하기
// /api-server/content
exports.patchContent = async (req, res) => {
  try {
    const { id, text } = req.body;
    const [isUpdated] = await Todo.update({ text }, { where: { id } });
    isUpdated
      ? res.status(200).send({ isSucess: true })
      : res.status(404).send({ isSucess: false }); // 잘못된 todoId 보낼 경우
  } catch (err) {
    console.log("server err!", err);
    res.status(500).send("SERVER ERROR! 관리자에세 문의하세요");
  }
};
