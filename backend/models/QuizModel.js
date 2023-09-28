const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    id: {type: Number, required: true, unique: true},
    question: {type: String, required: true},
    correct: {type: Number, required: true},
    answers: {type: [String], required: true}
});

const globalQuizSchema = new mongoose.Schema({
    name: {type: String, required: true},
    questions: {type: [questionSchema], required: true}
})

const QuizSchema = mongoose.model('QuizSchema', globalQuizSchema);

module.exports = QuizSchema;