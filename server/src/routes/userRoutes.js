const express = require('express');
const UserController = require('../controllers/UserController');
const loginRequired = require("../middlewares/loginRequired");
const router = express.Router();

router.post("/", UserController.store);
router.get("/",loginRequired, UserController.index);
router.get("/:id", UserController.show);
router.put("/:id", UserController.update)
router.delete("/:id", UserController.delete)

module.exports = router;