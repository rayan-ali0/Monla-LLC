import Shipping from "../Models/Shipping.js";

export const shippingController = {
  createShipping: async (req, res) => {
    try {
      const { location, message, cost } = req.body;
      const newShipping = new Shipping({ location, message, cost });
      const savedShipping = await newShipping.save();
      res.status(201).json(savedShipping);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllShippings: async (req, res) => {
    try {
      const shippings = await Shipping.find();
      if (!shippings) {
        return res.status(404).json({ error: "There is no shippings yet." });
      }
      res.status(200).json(shippings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getShippingById: async (req, res) => {
    try {
      const shipping = await Shipping.findById(req.params.id);
      if (!shipping) {
        return res.status(404).json({ error: "Shipping not found" });
      }
      res.status(200).json(shipping);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateShipping: async (req, res) => {
    try {
      const updatedShipping = await Shipping.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedShipping) {
        return res.status(404).json({ error: "Shipping not found" });
      }
      return res.status(200).json(updatedShipping);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteShipping: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedShipping = await Shipping.findByIdAndDelete(id);
      if (!deletedShipping) {
        res.status(404).json({ error: "Shipping not found" });
      }
      res.status(200).json({ status: "Shipping Deleted" });
    } catch (error) {
      res.status(404).json(error.message);
    }
  },
};
