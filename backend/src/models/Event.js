import mongoose from 'mongoose';

const stallSchema = new mongoose.Schema({
  stallNumber: { type: String, required: true },
  category: { type: String, enum: ['Standard', 'Premium', 'Corporate Pavilion'], default: 'Standard' },
  dimensions: { type: String, default: '3m x 3m' },
  price: { type: Number, required: true },
  isBooked: { type: Boolean, default: false },
  bookedByCompany: { type: String, default: '' },
  bookedByEmail: { type: String, default: '' },
});

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    eventType: {
      type: String,
      required: true,
      enum: ['BEGA Mahaadhiveshan', 'BEGA Business Expo', 'B2B Meet', 'State Seminar', 'District Training', 'Taluka Meeting'],
    },
    theme: { type: String, default: 'Growth • Trust • Success' },
    date: { type: Date, required: true },
    endDate: { type: Date },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    district: { type: String, required: true },
    taluka: { type: String, default: 'All' },
    description: { type: String, required: true },
    isFree: { type: Boolean, default: false },
    registrationFee: { type: Number, default: 0 },
    bannerImage: { type: String, default: '' },
    stalls: [stallSchema],
    registeredAttendees: [
      {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        mobile: { type: String, required: true },
        companyName: { type: String, default: '' },
        passId: { type: String, required: true },
        registeredAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);
export default Event;