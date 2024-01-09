import  User from "../Models/User.js";

export const userController = {

createUser: async (req, res) => {
    const { name} = req.body
    // const images=req.files.map(image => image.path);
    // const details= JSON.parse(detail)
    try {
        const user = await User.create({ name })
        res.status(200).json(user)
    }
    catch (error) {
        res.status(404).json({ status: 404, error: error })
    }
}

}