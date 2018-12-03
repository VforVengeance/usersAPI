var express = require ('express');
var manage = require ('users-management');
var bodyParser = require('body-parser');
var router = express.Router();

var users = [];
users.push(manage.addUser("carlo", "leonardi"));
users.push(manage.addUser("giuseppe", "marchese"));
users.push(manage.addUser("andrea", "ardenti"));
users.push(manage.addUser("daniele", "mauro"));


var auth = function(req, res, next){
    if(req.query.token % 2 === 0){
        next();
    }
    else{
        res.status(401).json({
            "error": "Token not valid."
        });
    }
}

router.get("/show", function(req, res, next){
    return res.status(200).json({
        "numberOfUsers": manage.getUsers()
    });
})

router.post("/newuser", auth, function(req, res, next){
    manage.addUser(req.body.name, req.body.surname);
    res.status(201).json({"new user": manage.filteredByName(req.body.name)}); 
})

router.get("/reset", auth, function(req, res, next){
    manage.reset();
    res.status(200).json();
})

router.delete("/delete/:id", auth, function(req, res, next){
    manage.deleteUser(parseInt(req.params.id));
    res.status(200).json({message: "User has been erased"});
})
module.exports = router;

