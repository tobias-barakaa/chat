const User = require("../../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postRegister = async(req, res) => {
    try {
        const {username, mail, password} = req.body;
        const userExists = await User.exists({ mail: mail });
        if(userExists) {
            return res.status(400).send('User already exists');
        }

        const encrptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            mail: mail.toLowerCase(),
            password: encrptedPassword
        });
        // create JWT token

        const token = jwt.sign({
            userId: user._id,
            mail,
        }, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.status(201).json({
            userDetails: {
                mail: user.mail,
                token: token,
                username: user.username,
            }
        })
        
    } catch (error) {
        return res.status(500).send('error occured please try again')
    }
} 

module.exports = postRegister;