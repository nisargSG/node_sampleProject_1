const uiRouter = require('express').Router()



//logout
uiRouter.get("/logout",async(req,res)=>{

    if (req.user) {
        res.cookie('jwt_token','', { expires: new Date(0) })
    }
    res.redirect('/login');
})

uiRouter.get("/", (req, res) => {

    //if authrozied -> dashboard

    if (req.user) {
        res.redirect('/dashboard')
    }
    else {
        res.render('index')
    }

})

uiRouter.get("/login", (req, res) => {
    //if authrozied -> dashboard

    if (req.user) {
        res.redirect('/dashboard')
    }
    else {
        res.render('login')
    }

})

uiRouter.get("/about", (req, res) => {
    res.render('about')
})

uiRouter.get("/dashboard", (req, res) => {

    if (req.user) {
        console.log(req.session.cart)
        res.render('dashboard',{currentCart : req.session.cart})
    } else {
        res.redirect("/login")
    }

})


uiRouter.post("/dashboard", (req, res) => {

    if (req.user) {
        req.session.cart=req.session.cart+1
        res.render('dashboard',{currentCart : req.session.cart})
    } else {
        res.redirect("/login")
    }

})

module.exports = uiRouter