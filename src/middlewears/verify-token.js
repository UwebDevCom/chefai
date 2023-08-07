import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    console.log(req.headers)
    const token = req.headers.authorization;
    console.log(token);
    if (token) {
        jwt.verify(token, "secret", (err) => {
            if (err) return res.sendStatus(403);
            next();
        });
    } else { 
        res.sendStatus(401);
    }
} 