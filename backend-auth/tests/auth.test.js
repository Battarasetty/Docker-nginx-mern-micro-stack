import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../server.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Auth API', () => {
  const userData = {
    email: 'testuser@example.com',
    password: 'testpassword'
  };

  it('should register a user and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send(userData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.msg).toBe('Signup successful');
  });

  it('should login the user and return a token', async () => {
    // user already created in previous test
    const res = await request(app)
      .post('/api/auth/login')
      .send(userData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not register duplicate user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send(userData);

    expect(res.statusCode).toBe(400);
    expect(res.body.msg).toBe('User already exists');
  });

  it('should not login with invalid password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: userData.email,
        password: 'wrongpassword'
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.msg).toBe('Invalid credentials');
  });
});
