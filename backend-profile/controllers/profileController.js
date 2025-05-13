import axios from 'axios';

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;  
    const headers = { Authorization: req.headers.authorization };

    // Fetch this user's todos from the Todo service
    const { data: todos } = await axios.get(
      `http://todo:5001/api/todos?user=${userId}`,
      { headers }
    );

    return res.json({ todos });
  } catch (err) {
    console.error(
      'Profile service error:',
      err.response?.status,
      err.response?.data || err.message
    );
    return res.status(500).json({ msg: 'Server error' });
  }
};
