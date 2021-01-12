const bodyParser = require("body-parser")
const express = require("express")
const path = require("path")
const router = express.Router()
const Workout = require("../Models/fitness.js")

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})
router.get("/styles.css", (req, res) => {
    console.log("hit styles")
    res.sendFile(path.join(__dirname, "../public/style.css"))
})
router.get("/exercise", (req, res) => {
    console.log("hit styles")
    res.sendFile(path.join(__dirname, "../public/exercise.html"))
})

router.get("/api/workouts", (req, res) => {
    Workout.find({})
        .then(workouts => {
            res.json(workouts)
        })
})

router.post("/api/workouts", (req, res) => {
    Workout.create({})
        .then(workouts => {
            res.json(workouts)
        })
        .catch(err => {
            res.json(err)
        })

})

router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"))
})

router.get("/api/workouts/range", (req, res) => {

    /* Here we use the aggregate function to dynamically add up and return the total
        duration for each workout */
        Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        }
    ])
    // sorting the workout results by id 
        .sort({ _id: 1 })
    // limiting the results to 7 
        .limit(7)
    // returning the results
        .then(results => {
            res.json(results)
        })
        .catch(err => {
            res.json(err)
        })
})


router.put( "/api/workouts/:id", ({body, params}, res) => {
    // finding by id and updating
    Workout.findByIdAndUpdate(params.id, {exercises: body}, function(err, result) {
        if(err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
})


module.exports = router