import jwt from "jsonwebtoken";

export const createToken = (_id) => {
   return jwt.sign({ _id }, process.env.JWT_SECRET);
};

const Auth = async (req, res, next) => {
   try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
         return res.status(401).json({ error: "No token provided" });
      }

      const token = authHeader.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decodedToken;
      next();
   } catch (error) {
      res.status(401).json({ error: "Invalid or expired token" });
   }
};

export default Auth;
