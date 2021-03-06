//Dados
const proffys = [
    {
    name: "Diego Fernander",
    avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
    whatsapp: "89987654534", 
    bio:"Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
    subject: "Química", 
    cost: "20", 
    weekday: [0], 
    time_from: [720], 
    time_to: [1220]
    },

    {
    name: "Mayk Brito",
    avatar: "https://avatars2.githubusercontent.com/u/6643122?s=460&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4",
    whatsapp: "89987654534", 
    bio:"Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
    subject: "Química", 
    cost: "20", 
    weekday: [1], 
    time_from: [720], 
    time_to: [1220]
    },
]
const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
] 

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
] 
//Funcionalidades
function getSubject(subjectNumber){
    const position = +subjectNumber - 1
    return subjects[position]
}

function pageLanding(req, res){
    return res.render("index.html")
} 

function pageStudy(req, res){
    const filters = req.query
    return res.render("study.html", {
        proffys:proffys, 
        filters:filters, 
        subjects:subjects,
        weekdays:weekdays})
}

function pageGiveClasses(req, res){
    const data = req.query
    
    //se tiver dados
    const inNotEmpty = Object.keys(data).length > 0
    if(inNotEmpty){

        data.subject = getSubject(data.subject)
        //Add dados na lista de proffys
        proffys.push(data)

        return res.redirect("/study")
    }
   

    return res.render("give-classes.html" , {
        subjects:subjects,
        weekdays:weekdays
    })
}

const express = require("express")
const server = express()
const nunjucks = require("nunjucks")

//Confg Nunjucks
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

//Para arquivos estáticos (css, scripts, img)
server.use(express.static("public"))

//Rotas
server.get("/", pageLanding)
server.get("/study", pageStudy)
server.get("/give-classes", pageGiveClasses)


const port = 8080
server.listen(port, () => {
    console.log("Servidor rodando na porta 8080.")
})