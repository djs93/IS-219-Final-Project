const express = require('express')
const router = express.Router()
const cityController = require('../controllers/cities.controllers');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://djs93.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'http://localhost:8000',
    issuer: 'https://djs93.us.auth0.com/',
    algorithms: ['RS256']
});

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(jwtCheck);

// Retrieve all city
router.get('/', cityController.findAll);

// Create a new city
router.post('/', (req, res) => {
    const { role } = req.user;

    if (role !== 'admin') {
        return res.sendStatus(403);
    }

    cityController.create(req, res);
});

// Retrieve a single city with id
router.get('/:id', cityController.findById);

// Update a city with id
router.put('/:id', (req, res) => {
    const { role } = req.user;

    if (role !== 'admin') {
        return res.sendStatus(403);
    }

    cityController.update(req, res);
});

// Delete a city with id
router.delete('/:id', (req, res) => {
    const { role } = req.user;

    if (role !== 'admin') {
        return res.sendStatus(403);
    }

    cityController.delete(req, res);
});

module.exports = router
