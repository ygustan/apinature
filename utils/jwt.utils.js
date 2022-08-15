// Importation 
const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = '5d6a880ec4b2fa5fee71c99584455bade78cd9bb1c6fae55766f3d497bb1856656380820240dafc9ec91564781e0f948';
// const JWT_REFRESH_SECRET = '0282703276d64c155550d8d8b2f6d8cc2a57ccb92622065c30851a5be45386424bf906c6923ee29eaf56b55b7ed45557';

// Exporation des functions
module.exports = {
    
    signUserToken: function(userData){
        return jwt.sign({
            Id_utilisateur: userData.Id_utilisateur,
            Role: userData.roles[0].Nom
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '1h'
        })
    },

    signUserRefreshToken: function(userData){
        return jwt.sign({
            Id_utilisateur: userData.Id_utilisateur,
            Producteur: userData.producteur,
            EstAdmin: userData.EstAdmin
        },
        JWT_REFRESH_SECRET
        )
    },

    verifyRefreshToken: function(refreshToken){
        return jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, user) => {
            if(err){
                logger.error(err);
                return 'Invalid signature';
            }
            const token = module.exports.signUserToken(user);
            return token;
        });
    },

    authenticateToken: function(req, res, next){
        const tokenTaken = req.header('Authorization');
        const token = tokenTaken && tokenTaken.split(' ')[1];
        
        if(!token){
            return res.status(401).send('Access Denied');
        }

        try {
            const verified = jwt.verify(token, JWT_SIGN_SECRET);
            req.user = verified;
            next();
        } catch (err) {
            return res.status(400).send('Invalid Token');
        }
    },

    refreshUserToken: function(userData){
        return jwt.sign(user, JWT_REFRESH_SECRET);
    },

    ParseAuthorization: function(authorization){
        return (authorization != null) ? authorization.replace('Bearer', '') : null;
    },
    
    getUserId: function(authorization){
        var Id_utilisateur = -1;
        var token = module.exports.ParseAuthorization(authorization);
        if(token != null){
            try {
                var jwtToken = jwt.verify(token, JWT_REFRESH_SECRET); // JWT_REFRESH_SECRET ou JWT_SIGN_SECRET
                if(jwtToken != null){
                    Id_utilisateur = jwtToken.Id_utilisateur;
                }
            } catch (err) {
                console.log(err);
            }
        }
        return Id_utilisateur;
    },

    getUserAutorization: function(authorization){
        var EstAdmin = false;
        var token = module.exports.ParseAuthorization(authorization);
        if(token != null){
            try {
                var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if(jwtToken != null){
                    EstAdmin = jwtToken.EstAdmin;
                }
            } catch (err) {
                console.log(err)
            }
        }
        return EstAdmin;
    }

}