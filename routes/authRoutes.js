const authController=require('../controllers/authController')
function initroutes(app) {
   
    app.get('/login', authController().login)
    app.post('/login', authController().postlogin)
    app.get('/signup', authController().register)
    app.post('/signup', authController().custregister)
}