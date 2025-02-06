const express = require("express");
const companyRouter = express.Router();
const CompanyController = require("../controllers/CompanyControllers");

companyRouter.get("", CompanyController.getAllCompanies); 
companyRouter.get("/:id", CompanyController.getCompanyById); 
companyRouter.post("", CompanyController.createCompany);
companyRouter.put("/:id", CompanyController.updateCompany);
companyRouter.delete("/:id", CompanyController.deleteCompany);

module.exports = companyRouter;
