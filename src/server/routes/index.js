var express = require('express');
// var restaurantsDB = require('../../client/js/restaurantsDB.js');
var router = express.Router();

var options = {
    // initalization of options
};

var pgp = require('pg-promise')(options);
var CN = process.env.DATABASE_URL || 'postgress://localhost/library'
var db = pgp(CN);

// GET ROUTES FOR FRONT PAGE
router.get('/', function(req, res, next) {
    db.any('Select * FROM restaurants')
        .then(function (data) {
            res.render('index', {
                title: 'gTable',
                restaurantsDB: data
            });
        })
        .catch (function (err) {
            return next(err);
        });
});

router.get('/restaurants', function(req, res, next) {
    db.any('Select * FROM restaurants')
	    .then(function (data) {
            res.redirect('/');
    })
    .catch (function (err) {
        return next(err);
    });  
});

// GET FOR NEW RESTAURANT

router.get('/restaurants/new', function(req,res,next) {
    res.render('new', {title: 'Add A Restaurant'});
});


// POST CREATE NEW RESTAURANT

router.post('/restaurants/new', function (req,res,next) {
    db.none('INSERT INTO restaurants (name, city, state, cuisine, rating, image, description) VALUES ($1, $2, $3, $4, $5, $6, $7)', 
    [req.body.name, req.body.city, req.body.state, req.body.cuisine, req.body.rating, req.body.image, req.body.description])
        .then(function (data) {
            res.redirect('/')
        })
        .catch (function (err) {
            return next(err);
        });
});

// GET ROUTE BY SINGLE RESTAURANT ID
// Includes double query for reviews
       // Needs to be fixed for new restauraunts that have no reviews

router.get('/restaurants/:id', function(req, res, next) {
    var restaurantID = req.params.id;
    db.one('Select * From restaurants where id=$1', restaurantID)
    .then(function (data) {
        return db.query('Select *, r.name FROM reviews rw RIGHT JOIN restaurants r ON rw.restaurant_id = r.id WHERE r.id='+restaurantID);
    })
    // take these joined tables and then render the data of the first and second queries together as an array of objects
        .then(function (data) {
            res.render('restaurants', {
                title: data[0].name,
                restaurantsDB: data,
                reviews: data
            });  
            })        
            .catch (function (err) {
                return next(err);
            });
});

// EDIT PAGE FOR SINGLE RESTAURANT

router.get('/restaurants/:id/edit', function(req,res,next) {
    var restaurantID = req.params.id;
    db.one('Select * FROM restaurants where id=$1', restaurantID)
        .then(function (data) {
            res.render('edit', {
                title: 'Edit Restaurant',
                restaurantsDB: data});
        })
        .catch (function (err) {
            return next(err);
        });
});

router.get('/edit/:id', function(req,res,next) {
    var restaurantID = req.params.id;
    db.one('Select * FROM restaurants where id=$1', restaurantID)
        .then(function (data) {
            res.render('edit', {
                title: 'Edit Restaurant',
                restaurantsDB: data});
        })
        .catch (function (err) {
            return next(err);
        });
});

// POST to edit restaurant page information

router.post('/restaurants/:id/edit', function (req,res,next) {
    var restaurantID = req.params.id;

    console.log('I am trying to post!');
    db.none('UPDATE restaurants SET name=$1, city=$2, state=$3, cuisine=$4, rating=$5, image=$6, description=$7 WHERE id=$8', 
    [req.body.name, req.body.city, req.body.state, req.body.cuisine, req.body.rating, req.body.image, req.body.description, restaurantID])

        .then(function (data) {
            res.redirect('/restaurants/'+restaurantID)
        })
        .catch (function (err) {
            return next(err);
        });
});

// DELETE FOR RESTAURANT PAGE

router.post('/restaurants/:id/delete', function(req, res, next) {
    db.none('DELETE FROM restaurants WHERE id=$1', req.params.id)
        .then(function (data) {
            res.redirect('/')
        })
        .catch (function (err) {
            return next(err);
        });
});

// GET FOR REVIEW PAGE

router.get('/restaurants/:id/reviews', function (req,res, next) {
    var restaurantID = req.params.id;
    db.one('Select * FROM restaurants where id=$1', restaurantID)
        .then(function (data) {
            res.render('reviews', {
                title: 'Review Restaurant',
                restaurantsDB: data});
        })
        .catch (function (err) {
            return next(err);
        });
});

router.post('/restaurants/:id/reviews', function (req,res,next) {
    db.none('INSERT INTO reviews (customerName, review, restaurant_id) VALUES ($1, $2, $3)', 
    [req.body.customerName, req.body.review, req.params.id])
        .then(function (data) {
            console.log(data);
            res.redirect('/')
        })
        .catch (function (err) {
            return next(err);
        });
});

module.exports = router;
