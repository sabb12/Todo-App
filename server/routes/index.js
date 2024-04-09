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
router.patch("/todo/:todoId", controller.patchDoneState);

// DELETE /api-server/todo/:todoId
// 특정 todo 삭제
router.delete("/todo/:todoId", controller.deleteTodo);

// [추가] 내용 수정하기
// PATCH /api-server/content
router.patch("/content", controller.patchContent);

module.exports = router;
