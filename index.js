// Importation 
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// Importation des routes 
const routeUtilisateur = require('./routes/utilisateur.js');
const routeAnimaux = require('./routes/animaux.js');
const routeActualite = require('./routes/actualite.js');
const routeQuiz = require('./routes/quiz.js');
const routeAuth = require('./routes/auth.js');

// Settings
const PORT = process.env.PORT || 8888;
const apiRouter = '';

// Instanciation
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use(express.json());
app.use(cors());

app.use('/api/v1/', routeUtilisateur);
app.use('/api/v1/', routeAnimaux);
app.use('/api/v1/', routeActualite);
app.use('/api/v1/', routeAuth);
app.use('/api/v1/', routeQuiz);

app.get('/', (req, res) => {
    res.header('Content-type','text/html');
    res.status(200).send('<h1> API NATURE </h1>');
})

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});