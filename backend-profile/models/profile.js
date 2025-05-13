import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
});

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
