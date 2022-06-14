const router = require("express").Router();
const {register} = require("../controller/auth.controller")
router.post("/register",register)


module.exports = router;