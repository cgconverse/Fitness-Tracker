const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FitnessSchema = new Schema({

    day: {
        type: Date,
        default: () => new Date()
    },

    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "Enter an exercise type"
            }
        },
        {
            name: {
                type: String,
                trim: true,
                required: "Enter an exercise name"
            },

            duration: {
                type: Number,
                required: "Enter an exercise duration in minutes"
            },

            weight: {
                type: Number,
            },

            reps: {
                type: Number,
            },

            sets: {
                type: Number,
            },

            distance: {
                type: Number
            }
        }]


});


const Workout = mongoose.model("Fitness", FitnessSchema);

module.exports = Workout;
