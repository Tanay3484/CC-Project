const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const {body} = require("express-validator");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const session = require("express-session");


app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(methodOverride('_method'))
app.use(session({
    secret:"mySecret",
    resave:false,
    saveUninitialized:true
}));


const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({extended:false});
app.use(urlencodedParser);

function requireLogin(req,res,next){
    if(req.session & req.session.userId){
        next();
    }
    else{
        res.redirect('/');  
    }
}


app.get("/",requireLogin,(req,res)=>{
    res.render('login.ejs');
})

