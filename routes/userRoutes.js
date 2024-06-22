import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddlewares.js";
import userController, { deleteUserCOntroller, updateUserController } from "./../controllers/userController.js";

const router = express.Router();

//update category
router.put("/update-user/:id", requireSignIn, isAdmin, updateUserController);

//getALl user
router.get("/get-user", requireSignIn, isAdmin, userController);

//delete category
router.delete(
    "/delete-user/:id",
    requireSignIn,
    isAdmin,
    deleteUserCOntroller
);

export default router;