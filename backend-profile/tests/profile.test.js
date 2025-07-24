import request from 'supertest';
import express from 'express';
import axios from 'axios';
import { getProfile } from '../controllers/profileController.js'; 

jest.mock('axios');

const app = express();

// Middleware to mock `req.user`
app.use((req, res, next) => {
  req.user = { id: '123' };
  next();
});

app.get('/api/profile', getProfile);

describe('GET /api/profile', () => {
  it('should return todos from todo service', async () => {
    const mockTodos = [
      { id: 1, task: 'Learn Docker' },
      { id: 2, task: 'Write tests' }
    ];

    axios.get.mockResolvedValueOnce({ data: mockTodos });

    const response = await request(app)
      .get('/api/profile')
      .set('Authorization', 'Bearer faketoken');

    expect(response.statusCode).toBe(200);
    expect(response.body.todos).toEqual(mockTodos);
    expect(axios.get).toHaveBeenCalledWith(
      'http://todo:5001/api/todos?user=123',
      { headers: { Authorization: 'Bearer faketoken' } }
    );
  });

  it('should handle error from todo service', async () => {
    axios.get.mockRejectedValueOnce({
      response: { status: 500, data: 'Todo Service Error' }
    });

    const response = await request(app)
      .get('/api/profile')
      .set('Authorization', 'Bearer faketoken');

    expect(response.statusCode).toBe(500);
    expect(response.body.msg).toBe('Server error');
  });
});
