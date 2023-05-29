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

let getEditUser = async (req, res) => {
  let userId = req.query.id;
  if (userId) {
    let userData = await CRUDService.getUserInfobyId(userId);
    console.log(userData);
    return res.render("editCRUD.ejs", { user: userData });
  } else {
    return res.send("User not found");
  }
};
let putCRUD = async (req, res) => {
  let data = req.body;
  await CRUDService.updateUserdata(data);

  return res.redirect("/get-crud");
};
module.exports = {
  getHomePage,
  getCRUD,
  postCRUD,
  displayGetCRUD,
  getEditUser,
  putCRUD,
};
