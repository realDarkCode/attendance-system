const router = require("express").Router();

router.post("/register", (req, res) => {
    res.status(200).json({
        message: "register successfully"
    })
})


module.exports = router;