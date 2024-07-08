import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  linkedinLogin:{
    type: String,
    required: [true, 'Please provide a login'],
  },  
  linkedinPass:{
    type: String,
    required: [true, 'Please provide a linkedin password'],
  },
   tempPass: {
    type: String,
  },
  
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);


export default User;
