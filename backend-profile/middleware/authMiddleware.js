// backend-todo/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer '))
    return res.status(401).json({ msg: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = userId;            // <-- just the user ID
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

export default authMiddleware;
