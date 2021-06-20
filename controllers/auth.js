const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/user');

module.exports = {
    register: async function (req, res, next) {
        let data = req.body;
        if (!data)
            res.send('Credentials provided for registration are incomplete!');
        if (!data['username'])
            res.send('Username is required!');
        if (!data['password'])
            res.send('Password is required');
        let users = await userModel.findAndCountAll({
            where: {
                username: data['username']
            }
        });
        if (users && users.count > 0) {
            res.send('This username is taken!');
        }
        let password = bcrypt.hashSync(data['password'], 3);
        data['password'] = password;
        let newUser = await userModel.create({
            username: data.username,
            password: password,
            email: data.email
        }).catch((err) => {
            console.error(err);
            res.send('There was a problem during registration');
        });
        console.log(newUser);
        res.json({ message: 'Success', code: 200, user: newUser });
        
    },

    login: async function (req, res, next) {
        let { email, password } = req.body;
        if (!email && !password) {
            res.send('Please provide correct credentials!');
        }
        console.log(req.body);
        let user = await userModel.findOne({
            where: {
                username: email
            }
        });
        if (user && user['password']) {
            let ok = bcrypt.compareSync(password, user['password']);
            if (ok) {
                const token = jwt.sign({ id: user['username'] },
                    req.app.get('secretKey'), { expiresIn: '1h' });
                res.cookie('token', token, {
                    maxAge: 1000 * 60 * 60, // 1 hour
                });
                next();
            }
            else {
                res.send('Incorrect Password!');
            }
        }
        else {
            res.send("We don't have an account with this username.")
        }
    },
    authenticate: function (req, res, next) {
        jwt.verify(req.cookies.token, req.app.get('secretKey'),
            function (err, decoded) {
                if (err) {
                    res.send('Unauthorized Access!');
                } else {
                    // add username to request
                    req.body.username = decoded.id;
                    next();                
                }
            }
        );
    },
    checkAuthenticated: function(req, res, next) {
        jwt.verify(req.cookies.token, req.app.get('secretKey'),
            function (err, decoded) {
                if (err) {
                    next();
                } else {
                    // add username to request
                    req.body.username = decoded.id;
                    res.redirect('/main');                
                }
            }
        );
    }
};