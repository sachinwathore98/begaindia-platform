// backend/src/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    mobile: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, default: 'user', enum: ['user', 'admin', 'executive'] },
    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    applicationNumber: { type: String, unique: true, sparse: true },
    district: { type: String, default: 'Chhatrapati Sambhajinagar' },
    taluka: { type: String, default: 'Aurangabad' },
    address: { type: String, default: '' },
    membership: {
      plan: {
        type: String,
        default: 'BEGA Basic Membership',
        enum: [
          'BEGA Basic Membership',
          'BEGA Membership with Monthly Booklet',
          'BEGA Membership with Directory',
          'BEGA State Core Committee',
          'BEGA Central Core Committee',
        ],
      },
      status: { type: String, default: 'Pending', enum: ['Pending', 'Active', 'Under Review', 'Expired'] },
      startDate: { type: Date },
      expiryDate: { type: Date },
      paymentId: { type: String, default: '' },
      orderId: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;