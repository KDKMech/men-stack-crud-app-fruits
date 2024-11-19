const dotenv = require(`dotenv`);
dotenv.config()
const express =  require(`express`);
const { default: mongoose } = require("mongoose");
const app = express()
const PORT = 3000
const Fruit = require(`./models/fruit.js`)
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on(`connected`, () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
    
})


app.get(`/`, async (req,res) => {
    res.render(`index.ejs`)
})


app.get(`/fruits/new`, (req, res) => {
    res.render(`fruits/new.ejs`)
})


app.get(`/fruits`, async (req, res) => {
    const allFruits = await Fruit.find()
    console.log(allFruits);
    
    res.render(`fruits/index.ejs`, { fruits: allFruits})
})



app.post(`/fruits`, async (req, res) => {
    console.log(req.body);
    if (req.body.isReadyToEat === `on`) {
        req.body.isReadyToEat = true
    }
    else {
        req.body.isReadyToEat = false
    }
    await Fruit.create(req.body)
    res.redirect(`/fruits`)
    
})
app.get(`/fruits/:fruitId`, async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId)
    
    res.render(`fruits/show.ejs`, { fruit: foundFruit})
})












app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
    
})

// app.get(`/fruits`)