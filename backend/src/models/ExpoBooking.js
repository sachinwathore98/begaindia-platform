import mongoose from 'mongoose';

const expoBookingSchema = new mongoose.Schema(
  {
    bookingId: { type: String, required: true, unique: true, index: true },
    stallNumber: { type: String, required: true },
    stallTier: {
      type: String,
      required: true,
      enum: ['Standard Stall (3x3m)', 'Premium Corner (4x3m)', 'Sponsor Island Pavilion (6x6m)'],
    },
    companyName: { type: String, required: true, trim: true },
    contactPerson: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    mobile: { type: String, required: true, trim: true },
    businessCategory: { type: String, required: true },
    productsToExhibit: { type: String, required: true },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Reserved', 'Confirmed', 'Cancelled'],
      default: 'Reserved',
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Completed'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

const ExpoBooking = mongoose.models.ExpoBooking || mongoose.model('ExpoBooking', expoBookingSchema);
export default ExpoBooking;