import express from "express"
import {contactController} from '../Controllers/ContactController.js'
import {verifyToken,checkRole} from '../Middlewares/authentication.js'


export const contactRoutes= express.Router()

contactRoutes.post('/create',contactController.createContact)
contactRoutes.get('/',verifyToken, checkRole(["admin"]),contactController.getContacts)
contactRoutes.delete('/:id',verifyToken, checkRole(["admin"]),contactController.deleteContact)

