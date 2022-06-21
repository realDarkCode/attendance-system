const router = require("express").Router();
const userController = require("../controller/user");
/**
 * Get user by email or Id
 * @routes /api/v1/users/:userId
 * @method GET
 * @visibility Private
 */
router.get("/:userId", userController.getUserById);

/**
 * Update user by id
 * @routes /api/v1/users/:userId
 * @method PUT
 * @visibility Private
 */

/**
 * Update user by id
 * @routes /api/v1/users/:userId
 * @method PATCH
 * @visibility Private
 */
router.patch("/:userId", userController.patchUserById);
/**
 * Update user by id
 * @routes /api/v1/users/:userId
 * @method PUT
 * @visibility Private
 */
router.put("/:userId", userController.putUserById);
/**
 * Delete a  user by id
 * @routes /api/v1/users/:userId
 * @method DELETE
 * @visibility Private
 */
router.delete("/:userId", userController.deleteUserById);

/**
 * Get All users
 * Includes:
 *  - filter
 *  - sorting
 *  - pagination
 *  - select properties
 * @routes /api/v1/users?sort=["by", "name"]
 * @method GET
 * @visibility Private
 */
router.get("/", userController.getUsers);
/**
 * Create a  new user
 * Body:
 *  - name
 *  - email
 *  - password
 * @routes /api/v1/users
 * @method POST
 * @visibility Private
 */
router.post("/", userController.postUser);

module.exports = router;
