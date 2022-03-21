const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');

let users = [];

router.post('/register', async(request,response) => {

    const { email,password } = request.body;
    const account = users.find(x => x.email == email);
    if(account){
        return response.status(200).json({
            message: 'User exist please try other email'
        });
    } else {

        const hash_password = await bcryptjs.hash(password,10);

        users.push({email:email, password:hash_password});
        return response.status(200).json({
            message: 'Account created',
            users_count: users.length,
            data: users
        });
    }
})

router.get('/greeting', (request,response) => {
    return response.status(200).json({
        message: 'Welcome to my node.js API'
    });
});



module.exports = router;