const apiRouter = require('express').Router()
const { getMongoClient } = require('../utils/db')
const libJWT = require('jsonwebtoken');



apiRouter.post('/auth', async (req, res) => {

    const client = getMongoClient();
    const database = client.db();
    const collection = database.collection('users');
    const user = await collection.findOne({ email: req.body.email, password: req.body.password });
    if (user) {

        const jwtToken = await libJWT.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        res.cookie('jwt_token', jwtToken, {
            maxAge: 3600000, // 1 hour in milliseconds
            httpOnly: true, // cookie is accessible only by the server
            secure: true // cookie will only be sent over HTTPS
        });

        req.session.cart=0;

        res.status(200).json({msg:"success"})


    } else {
        res.status(401);
    }
})




module.exports = apiRouter