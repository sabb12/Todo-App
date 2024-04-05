const express = require("express");
const router = express.Router();
const controller = require("../controller/CMain");

// GET /api-server
router.get("/", controller.getIndex);

// GET /api-server/todos
// 전체 todo 데이터 불러오기 >> 프론트로 배열 반환
router.get("/todos", controller.getTodos);

// POST /api-server/todo
// 새로운 todo 만들기 > {isSuccess: true}
router.post("/todo", controller.postTodo);

// PATCh /api-server/todo/:todoId
// 특정 todo의 done 값 수정(할일 > 다한일) + (다한일 > 할일)

// DELETE /api-server/todo/:todoId
// 특정 todo 삭제

module.exports = router;
