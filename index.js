const express = require("express")

const fs = require("fs")

const path = require("path")

const app = express()

PORT = process.env.PORT || 8080



app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("public"))


app.get("/", (req,res) =>{
    res.send("Hey")
})


app.get("/mypage", (req,res) =>{
    res.sendFile(path.join(__dirname, "/index.html"))
})

app.get("/formpage", (req,res) =>{
    res.sendFile(path.join(__dirname, "/form.html"))
})


app.get("/api/readdb", (req,res) =>{

fs.readFile("db.json", "utf-8", (err,data)=>{
    if(err) throw err
    res.json(JSON.parse(data)) 
})
})

app.post("/api/create", (req,res)=>{




    const saveTo = {
        name:req.body.userName,
        isStudent:JSON.parse(req.body.trueOrFalse)
    }
    fs.readFile("db.json", "utf-8", (err,data)=>{
        if(err) {
            return res.sendStatus(500)
        }
        let readFrom = JSON.parse(data)
        readFrom.push(saveTo)
        console.log(readFrom);

        fs.writeFile("db.json", JSON.stringify(readFrom), err =>{
            if(err) throw err
            console.log("Done");
            res.json(true)
        } )
    })
})






app.listen(PORT, function(){
    console.log(`Yer running on port ${PORT}`);
})