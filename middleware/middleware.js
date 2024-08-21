import jwt from 'jsonwebtoken';

const { JWT_SCRETE } = process.env;

export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send({ error: 'Token not found' });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SCRETE);
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(403).send({ error: 'Invalid token' });
  }
};
