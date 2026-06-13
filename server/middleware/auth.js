import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "test";

const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authentication required. Please sign in." });
    }

    const token = header.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret); // throws if invalid/expired
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token); // Google OAuth credential
      req.userId = decodedData?.sub;
    }

    if (!req.userId) {
      return res.status(401).json({ message: "Invalid session. Please sign in again." });
    }

    next();
  } catch (error) {
    // Expired or tampered token: respond instead of letting the request hang.
    return res.status(401).json({ message: "Your session has expired. Please sign in again." });
  }
};

export default auth;
