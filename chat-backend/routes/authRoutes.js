const express = require('express');
const authControllers  = require('../controllers/auth/authControllers');
const joi = require('joi')
const router = express.Router();
const validator = require('express-joi-validation').createValidator({});

const registerSchema = joi.object({
    username: joi.string().min(3).max(30).required(),
    mail: joi.string().email().required(),
    password: joi.string().min(6).required()

});

const loginSchema = joi.object({
    password: joi.string().min(6),
    mail: joi.string().email()
})




router.post('/register',validator.body(registerSchema), authControllers.controllers.postRegister)

router.post('/login',validator.body(loginSchema), authControllers.controllers.postLogin)

module.exports = router;