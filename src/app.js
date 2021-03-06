const express = require("express");
const path = require("path")
const hbs = require("hbs");
const User = require("./models/usermessage")
require("./db/conn"); // conn file has been required

const app = express();
const port = process.env.PORT || 3000;

//setting the path
const staticpath = path.join(__dirname,"../public");
const templetpath = path.join(__dirname,"../templets/views");
const partialspath = path.join(__dirname,"../templets/partials");

// middlewear
app.use('/css', express.static(path.join(__dirname , "../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstarp/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));
app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath))

app.set("view engine","hbs");

app.set("views",templetpath);
hbs.registerPartials(partialspath)


//routing
app.get("/",(req,res)=>{
    res.render("index")
});

app.post("/contact",async(req,res)=>{
    try {
        // res.send(req.body);
        const userData = new User(req.body)
        await userData.save();
        res.status(201).render("index");
    } catch (error) {
        res.status(500).send(error)
    }
})


// server create
app.listen(port,()=>{
    console.log(`the server is running at the port no ${port}`);
})