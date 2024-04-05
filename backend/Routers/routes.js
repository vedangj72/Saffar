const express = require('express');
const routes = express.Router();
const { visterList, visiterPost, visiterLogin, visterSignin } = require('../Controllers/visiterController')

routes.get('/visiter/list', visterList);

routes.post('/visiter/list', visiterPost);

routes.post('/visiter/signup', visterSignin);

routes.post('/visiter/login', visiterLogin);


module.exports = routes;