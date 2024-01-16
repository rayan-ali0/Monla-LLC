import Contact from "../Models/Contact.js";

export const contactController = {

    createContact: async (req, res) => {
        const {Name,Email,Phone,message } = req.body
        try {
            const contact = await Contact.create({ Name,Email,Phone,message })
            if(contact){
                res.status(200).json(contact)
            }
            else{
                res.status(500).json({ status: 500, error: "Error creating contact" })

            }
        }
        catch (error) {
            res.status(404).json({ status: 404, message: error.message })
        }
    }
    ,
    getContacts:async (req, res) => {
        try {
            const contacts = await Contact.find();
            if (!contacts) {
                res.status(400).json("Contacts Not Found")
            }
            res.status(200).json(contacts)
        }
        catch (error) {
            res.status(404).json({message:error.message})
        }
    }
    ,
    deleteContact:async (req, res) => {
        const { id } = req.params
        try {
            const deletedContact = await Contact.findByIdAndDelete(id);
            if (!deletedContact) {
                res.status(404).json({ error: 'Contact not found' })
            }
            res.status(200).json({ status: "Contact Deleted" })

        }
        catch (error) {
            res.status(404).json({message:error.message})
        }
    }
    


}