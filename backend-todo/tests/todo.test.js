import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import jwt from 'jsonwebtoken';
import app from '../server.js';
import Todo from '../models/Todo.js';

let mongoServer;
let token;
let userId = '64cf36b02ef6c1ff95f93717'; // fake ObjectId for testing

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // Create a valid JWT token manually
  token = jwt.sign({ id: userId }, process.env.JWT_SECRET || 'testsecret');
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Todo API', () => {
  it('should create a todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({ text: 'Write tests' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.text).toBe('Write tests');
  });

  it('should get all todos for user', async () => {
    await Todo.create({ text: 'Sample Todo', user: userId });

    const res = await request(app)
      .get('/api/todos')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a todo', async () => {
    const todo = await Todo.create({ text: 'Update me', user: userId });

    const res = await request(app)
      .put(`/api/todos/${todo._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ completed: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  it('should delete a todo', async () => {
    const todo = await Todo.create({ text: 'Delete me', user: userId });

    const res = await request(app)
      .delete(`/api/todos/${todo._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe('Todo deleted');
  });
});
