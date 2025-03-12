const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization'); // ✅ Vérifie l'en-tête
    console.log('📌 Auth Header reçu:', authHeader); // ✅ Debugging

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1]; // ✅ Récupère le token
    console.log('📌 Token extrait:', token); // ✅ Debugging

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('✅ Token valide, utilisateur:', decoded); // ✅ Debugging
        req.user = decoded; // ✅ Ajoute l'utilisateur à `req`
        next();
    } catch (error) {
        console.error('❌ Erreur de validation du token:', error.message);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = authMiddleware;
