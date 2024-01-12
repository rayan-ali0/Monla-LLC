import express from "express"
import {contactController} from '../Controllers/ContactController'

export const contactRoutes= express.Router()

contactRoutes.post('/create',contactController.createContact)
contactRoutes.get('/',contactController.getContacts)
contactRoutes.delete('/:id',contactController.deleteContact)

