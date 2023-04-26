const jwt = require('jsonwebtoken');

class AuthService {
  static getToken(username) {
    try {
      return jwt.sign(
        { user: username },
        process.env.SIGNING_KEY,
        { expiresIn: '2 days' },
      )
    }
    catch (err){
      return null;
    }
  
    }
  static verifyToken = (req, res, next) => {
      const token =
        req.body.token || req.query.token || req.headers["access-token"];
    
      if (!token) {
        return res.status(403).send("A token is required for authentication");
      }
      try {
        const decoded = jwt.verify(token, process.env.SIGNING_KEY);
        req.user = decoded;
      } catch (err) {
        return res.status(401).send("Invalid Token");
      }
      return next();
    };
  }

module.exports = AuthService;
