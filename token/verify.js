const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()



function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    console.log(bearerHeader)
    if(bearerHeader) {
      console.log(bearerHeader)
    
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      // Next middleware
      jwt.verify(bearerToken, process.env.SECRET_KEY, (err, user) => {
        if(err) {
          res.status(403).send({"message": "Token not exist"});
        } else {
          req.user = user
          next()
        }
      });
      
    } else {
      // Forbidden
      res.sendStatus(403);
    }
    
    } 
   
    //  fanction refreshToken
    async function reIssueTokens (refreshToken){
      const payload = await verifyRefreshToken(refreshToken);
      const userId = payload.aud;
      let userToken = await UserToken.findone({ where: { id: userId }, raw: true }).sort({createdAt: -1}).limit(1);
    
      userToken =  userToken[1];
      if(!userToken)
          throw {isError: true, message: 'User token does not exist'};
      if(userToken.refreshToken !== refreshToken)
          throw {isError: true, message: 'Old token. Not valid anymore.'}
    
      const [accessToken, refToken] = await Promise.all([signAccessToken(userId), signRefreshToken(userId)]);
    
      await UserToken.findOneAndUpdate({_id: userToken._id}, {$set :{refreshToken : refToken}});
    
      return {accessToken : accessToken ,refreshToken : refToken };
    }
    

module.exports.verifyToken =verifyToken
module.exports.reIssueTokens=reIssueTokens