import express from "express"
import {userController}from "../Controllers/UserController.js"

export const userRoutes= express.Router()

userRoutes.post('/create',userController.createUser)