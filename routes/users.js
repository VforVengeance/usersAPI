var express = require ('express');
var manage = require ('users-management');
var bodyParser = require('body-parser');
var router = express.Router();


var users = [];
users.push(manage.addUser("carlo", "leonardi"));
users.push(manage.addUser("giuseppe", "marchese"));
users.push(manage.addUser("andrea", "ardenti"));
users.push(manage.addUser("daniele", "mauro"));


router.get("/", function(req, res, next){
    if(manage.filteredByName(req.query.username)[0] != undefined){
        return res.status(200).json({
            "the user exist": manage.filteredByName(req.query.username)
        });
    }
    else{
        return res.status(400).json({
            "error": "the user does not exist."
        });
    }
})

router.get("/:id", function(req, res, next){
    if(req.params.id == undefined){
        return res.status(400).json({
            "error": "the user does not exist"
        });
    }
    else{
        return res.status(200).json({
            "user": manage.getUserByID(parseInt(req.params.id))
        });
    }
})

module.exports = router;