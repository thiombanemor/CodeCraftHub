require('dotenv').config({ path: './user-service/.env' }); // ✅ Charge les variables d’environnement
process.env.NODE_ENV = 'test'; // ✅ Définit NODE_ENV pour Jest

// require('dotenv').config();  // ✅ Charge les variables d’environnement

const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/userModel');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
});

describe('User Service', () => {
    let userToken;

    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/users/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('User created successfully');
    });

    it('should login an existing user', async () => {
        const response = await request(app)
            .post('/api/users/login')
            .send({
                email: 'test@example.com',
                password: 'password123',
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();
        userToken = response.body.token;
    });

    it('should fetch the user profile', async () => {
        const response = await request(app)
            .get('/api/users/profile')
            .set('Authorization', `Bearer ${userToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.user).toHaveProperty('username', 'testuser');
    });
});
