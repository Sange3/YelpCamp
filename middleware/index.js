var Campground = require("../models/campground");
var Comment = require("../models/comment");

// all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
           if(err || !foundCampground){
               req.flash("error", "Lugar no encontrado");
               res.redirect("atras");
           }  else {
               // does user own the campground?
            if(foundCampground.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "No tienes permiso de hacer eso");
                res.redirect("atras");
            }
           }
        });
    } else {
        req.flash("error", "Debes iniciar sesion para hacer eso");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err || !foundComment){
               req.flash("error", "Comentario no encontrado");
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "No tienes permiso de hacer eso ");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "Debes iniciar sesion para hacer eso ");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Debes iniciar sesion para hacer eso");
    res.redirect("/login");
}

module.exports = middlewareObj;