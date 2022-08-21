const models = require('../../models');
const regex_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = {

    postNewsletter: function(req, res, next){

        const email = req.body.email;

        if(!regex_email.test(email)) return res.sendStatus(400);

        models.newsletter.findOne({
            where: { Mail: email }
        }).then(function(newsletter){
            if(!newsletter){
                models.newsletter.create({
                    Mail: email
                })
                .then(function(newsletter){
                    return res.status(200).json(newsletter);
                })
                .catch(function(err){
                    return res.status(500).json({'Error': `${err}`});
                });
            }else {
                return res.sendStatus(403);
            }

        }).catch(function(err){
            return res.status(500).json({'Error': `${err}`});
        });

    },

}