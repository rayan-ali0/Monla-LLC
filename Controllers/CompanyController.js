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

      res.status(201).json(savedCompany);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getCompany: async (req, res) => {
    try {
      const existingCompany = await Company.findOne();
  
      if (!existingCompany) {
        return res.status(404).json({ error: 'Company not found.' });
      }
  
      res.json(existingCompany);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
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

      res.json(updatedCompany);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteCompany: async (req, res) => {
    try {
      const deletedCompany = await Company.deleteOne();

      if (!deletedCompany.deletedCount) {
        return res.status(404).json({ error: "Company not found." });
      }

      res.json({ message: "Company deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

// import Company from "../Models/Company.js";

// export const CompanyController = {
//   createComapny: async (req, res) => {
//     const {
//       name,
//       email,
//       number,
//       whatsapp,
//       location,
//       facebook,
//       instagram,
//       tiktok,
//     } = req.body;

//     try {
//       const companyInfo = await Company.create({
//         name,
//         email,
//         number,
//         whatsapp,
//         location,
//         facebook,
//         instagram,
//         tiktok,
//       });

//       if (!companyInfo) {
//         res.status(500).json({ message: "Error creating company Info" });
//       }
//       res.status(200).json(companyInfo);
//     } catch (error) {
//       res.status(404).json({ message: error.message });
//     }
//   },
//   getCompany: async (req, res) => {
//     try {
//       const companyInfo = await Company.findOne();
//       if (!companyInfo) {
//         res.status(400).json({ message: "Company Not Found" });
//       }
//       res.status(200).json(services);
//     } catch (error) {
//       res.status(404).json({ message: error.message });
//     }
//   },
//   deleteService: async (req, res) => {
//     const { id } = req.params;
//     try {
//       const deletedService = await Service.findByIdAndDelete(id);
//       if (!deletedService) {
//         res.status(404).json({ error: "Product not found" });
//       }
//       fs.unlinkSync(deletedService.image);
//       res.status(200).json({ status: "Service Deleted" });
//     } catch (error) {
//       res.status(404).json(error.message);
//     }
//   },
//   editService: async (req, res) => {
//     const { id, title, description } = req.body;
//     const updatedFields = { title, description };
//     console.log(updatedFields);
//     const editedService = await Service.findById(id);
//     if (req.file) {
//       console.log(req.file);
//       updatedFields.image = req.file.path;
//     }
//     if (editedService) {
//       const oldImage = editedService.image;
//       try {
//         const updated = await Service.findByIdAndUpdate(id, updatedFields, {
//           new: true,
//         });
//         if (updatedFields.image) {
//           fs.unlinkSync(oldImage);
//         }
//         res.status(200).json(updated);
//       } catch (error) {
//         res.status(500).json({ message: error.message });
//       }
//     } else {
//       res.status(500).json("Service Not Found");
//     }
//   },
// };
