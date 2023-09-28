const Quiz = require("../models/QuizModel");

exports.createThing = (req, res, next) => {
    delete req.body._id;
    const quiz = new Quiz({
        ...req.body,
    });

    quiz.save()
        .then(() => { res.status(201).json({message: 'Quiz enregistré !'})})
        .catch(error => { res.status(400).json( { error })})
};

exports.modifyThing = (req, res, next) => {
    Quiz.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
        .then(() => res.status(200).json({message: 'Objet modifié ! '}))
        .catch(error => res.status(400).json({error}))
}

exports.getThing = (req, res, next) => {
    Quiz.findOne({_id: req.params.id})
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({error}));
}

exports.getEverything = (req, res, next) => {
    Quiz.find()
        .then(things => res.status(200).json(things))
        .catch((error) => res.status(400).json({error}))
}

exports.deleteThing = (req, res, next) => {
    Quiz.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: 'objet supprimé !'}))
        .catch(error => res.status(400).json({error}))
}