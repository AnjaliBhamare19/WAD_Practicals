
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const StudentMarks = require("./StudentMarks")
const bodyparser = require("body-parser")


app.use(express.json())
app.use(bodyparser.urlencoded({extended : true}))
app.use(bodyparser.json())


const db_connection = "mongodb://localhost:27017/Student123"
const port = 4000

app.post("/add", async function(req, response){
    const student = await StudentMarks.create({
        name: req.body.name,
        Roll_No: req.body.Roll_No,
        WAD_Marks: req.body.WAD_Marks,
        CC_Marks: req.body.CC_Marks,
        DSBDA_Marks: req.body.DSBDA_Marks,
        CNS_Marks:req.body.CNS_Marks,
        AI_Marks:req.body.AI_Marks
    })

    response.send({message: "Data is Inserted", student})
})

app.get("/displaycountofdocument", async function(request, response){
    const student = await StudentMarks.countDocuments()
    response.send({"Total Documents" : student})
})

app.get("/gotmorethan20inDSBDA", async function(request, response){
    const student = await StudentMarks.find({ DSBDA_Marks: { $gt : 20}}, {name: 1})
    const html = `
       <ul>
           ${student.map( s2 => `<li>${s2.name}</li>`).join("")}
       </ul>`
    
    response.send(html)
})

app.get("/gotmore25inallsubject", async function(request, response){
    const student = await StudentMarks.find({
          DSBDA_Marks : {$gt:25},
          WAD_Marks : {$gt:25},
          CC_Marks : {$gt:25},
          AI_Marks : {$gt:25},
          CNS_Marks : {$gt:25}
    }, {name:1})

   let html = `
       <ul>
        ${student.map(s1 => `<li> ${s1.name}</li>`).join("")}
       </ul>`
       response.send(html)
})

app.get("/lessthan40inWADCC", async function(request, response){
    const student = await StudentMarks.find({
        CC_Marks : { $gt:40},
        WAD_Marks : { $lt:40}
    }, {name : 1})

    let html = ` <ul>
     ${student.map( s2 => `<li>${s2.name}</li>`).join("")}
    </ul>`

    response.send(html);
})

app.put("/update10marks", async function( request, response){
  
    const student = 
    await StudentMarks.updateMany(
        {}, 
        {$inc :{
            WAD_Marks: 10,
            AI_Marks: 10,
            CC_Marks: 10,
            DSBDA_Marks: 10,
            CNS_Marks: 10,
        }},
        {
            new: true
        })

        response.json({student})
})

app.delete("/deletestudent/:id", async function(request,response){
    const studentID = request.params.id
    const deletestudent = await StudentMarks.findOneAndDelete({
        _id: studentID})
        response.send({message: "Data Deleted Successfully", deletestudent})

})

app.get("/displayalldataintable", async function(request, response){
    const student  = await StudentMarks.find()

    let html = "<table style = 'border-collapse: collapse'></table>"

    html += `<tr>
              <th>Name</th>
              <th>Roll_No</th>
            <th>WAD_Marks</th>
            <th>CC_Marks</th>
            <th>DSBDA_Marks</th>
            <th>CNS_Marks</th>
            <th>AI_Marks</th>
    </tr>`

    student.map(function (student){
        html += "<tr>"
        html += "<td>" + student.name + "</td>"
        html += "<td>" + student.Roll_No + "</td>"
        html += "<td>" + student.WAD_Marks + "</td>"
        html += "<td>" + student.CC_Marks + "</td>"
        html += "<td>" + student.DSBDA_Marks + "</td>"
        html += "<td>" + student.CNS_Marks+ "</td>"
        html += "<td>" + student.AI_Marks + "</td>"
        html += "</tr>"
    })

    html+= "</table>"

    response.send(html)
})

app.get("/", async function(request,response){
    response.send("Welcome")
})
mongoose.connect(db_connection)
    .then(() => {
        app.listen(port, function () {
            console.log(">>>> Database connected successfully and server is started")
            console.log("http://localhost:" + port)
        })
    })
    .catch((error) => {
        console.log("problem to connect with database")
        console.log(error)
    })