import Company from "../Models/Company.js";

export const companyController = {
  createCompany: async (req, res) => {
    try {
      const existingCompany = await Company.findOne();

      if (existingCompany) {
        return res
          .status(400)
          .json({
            error: "Company already exists. Use edit to update details.",
          });
      }

      const {
        name,
        email,
        number,
        whatsapp,
        location,
        facebook,
        instagram,
        tiktok,
      } = req.body;

      const newCompany = new Company({
        name,
        email,
        number,
        whatsapp,
        location,
        facebook,
        instagram,
        tiktok,
      });

      const savedCompany = await newCompany.save();

    return  res.status(201).json(savedCompany);
    } catch (error) {
      console.error(error);
     return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getCompany: async (req, res) => {
    try {
      const existingCompany = await Company.findOne();

      if (!existingCompany) {
        return res.status(404).json({ error: 'Company not found.' });
      }

     return res.json(existingCompany);
    } catch (error) {
      console.error(error);
     return res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  editCompany: async (req, res) => {
    try {
      const {
        name,
        email,
        number,
        whatsapp,
        location,
        facebook,
        instagram,
        tiktok,
      } = req.body;

      const updatedCompany = await Company.findOneAndUpdate(
        {},
        {
          name,
          email,
          number,
          whatsapp,
          location,
          facebook,
          instagram,
          tiktok,
        },
        {
          new: true,
        }
      );

      if (!updatedCompany) {
        return res
          .status(404)
          .json({ error: "Company did not update it successfully." });
      }

    return  res.json(updatedCompany);
    } catch (error) {
      console.error(error);
     return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteCompany: async (req, res) => {
    try {
      const deletedCompany = await Company.deleteOne();

      if (!deletedCompany.deletedCount) {
        return res.status(404).json({ error: "Company not found." });
      }

     return res.json({ message: "Company deleted successfully." });
    } catch (error) {
      console.error(error);
     return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};