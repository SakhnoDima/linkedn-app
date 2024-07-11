import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email:{
    type: String,
    required: [true, 'Please provide a email'],
  },
  isLinkedinAuth:{
    type: Boolean,
    default: false
  },  
   tempPass: {
    type: String,
  },
  
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);


export default User;
