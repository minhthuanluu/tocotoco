const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register user
router.post('/signup', async (req, res) => {
    const { name, email, phone, street, pass, apartment, city, zip, country } = req.body;
    const user = await User.findOne({ email: email })
    const { lang } = req.query;
    if (user) {
        res.status(409).send({ 'message': 'User alredy exists on our system. Please check your email and try again!' })
    } else {
        let otp = await generateOTP();
        let newUser = new User({
            name,
            email: email,
            passwordHash: bcrypt.hashSync(pass, 10),
            phone: phone,
            street: street,
            apartment: apartment,
            zip: zip,
            city: city,
            country: country,
            keyResetPass: otp
        });

        newUser = await newUser.save();
        if (!newUser) {
            res.status(409).json({ success: false, message: '500 Internal Server Error'})

        }
        res.send(newUser);
    };

});

// Change password
router.post('/change-password',async function (req, res) {
    const {email,oldpassword,newpassword,confirmpassword} = req.body;
    const SECRET = process.env.secret;
    const user = await User.findOne({ email: email });
        if(confirmpassword!==newpassword){
            return res.status(400).send({ 'message': 'Your password and confirm password not match!' })
        } else if (user && bcrypt.compareSync(newpassword, user.passwordHash)) {

            user.pass=user.passwordHash;
            user.save();
    
            return res.status(200).send({ 'message': 'Your password hash change successfully!' })
        } else {
            return res.status(400).send({ 'message': 'Wrong information!' })
        }
});

// Login user
router.put('/signin', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    const { lang } = req.query;
    const SECRET = process.env.secret;
    const { email, pass } = req.body;
    if (!email) {
        res.status(400).send({ 'message': 'Your email is not registry!' })
    }
    else if (!pass) {
        res.status(400).send({ 'message': 'Your password is wrong!' })
    }
    else if (!user) {
        res.status(404).send({ 'message': 'User is not exists' })
    }
    else if (user && bcrypt.compareSync(pass, user.passwordHash)) {
        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, SECRET, { expiresIn: '24h' });

        return res.status(200).send({
            token: token,
            user: user
        });
    } else {
        return res.status(400).send({ 'message': 'Wrong information!' })
    }
});

const generateOTP = () => {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

module.exports = router;