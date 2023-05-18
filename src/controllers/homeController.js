import db from "../models/index";
import user from "../models/user";
import CRUDService from "../services/CRUDService";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log("---------------------");
    console.log(data);
    console.log("---------------------");
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

let getCRUD = async (req, res) => {
  res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
  return res.redirect("/crud");
};
let displayGetCRUD = async (req, res) => {
  let users = await CRUDService.getAllUser();
  console.log(users);
  res.render("displayCRUD.ejs", { dataTable: users });
};
module.exports = {
  getHomePage,
  getCRUD,
  postCRUD,
  displayGetCRUD,
};
