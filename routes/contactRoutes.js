const express=require("express");
const router=express.Router();
const {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
}=require("../controllers/contactControllers");
const validateToken = require("../middlewares/validateTokenHandler");

router.use(validateToken);
router.get("/",getContacts);
router.post("/",createContact);
router.get("/:id",getContact);
router.delete("/:id",deleteContact);
router.patch("/:id",updateContact);

module.exports = router;