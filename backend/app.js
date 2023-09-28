const express = require('express');
const mongoose = require('mongoose')

const stuffRoutes = require('./routes/stuff')
mongoose.connect('mongodb+srv://jacquesdurst:dPYM0BSU4DUdu4KI@cluster0.awpvbap.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

//  MIDDLEWARE FUNCTION : request handler

// Intercepte toutes les requetes Content-Type = json et mettent à disposition ce contenu sur l'objet requette dans req.body
// bodyParser = ancienne méthode
app.use(express.json());

// Middleware de sécurité : il ne prend pas d'adresse pour pouvoir s'appliquer à toutes les routes
app.use((req, res, next) => {
    // L'API est accesible depuis n'importe quelle origine (*)
    res.setHeader('Access-Control-Allow-Origin', '*');
    // On autorise certains headers sur la requête
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // On autorise certaines méthodes
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    // On passe au middleware suivant
    next();
});

app.use('/quiz/', stuffRoutes)

module.exports = app;