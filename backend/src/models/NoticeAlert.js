import mongoose from 'mongoose';

const noticeAlertSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['Urgent Alert', 'Government Scheme', 'Conclave Update', 'General Announcement'],
      default: 'General Announcement',
    },
    message: { type: String, required: true },
    actionLink: { type: String, default: '' },
    actionText: { type: String, default: 'Learn More' },
    isActive: { type: Boolean, default: true },
    priority: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const NoticeAlert = mongoose.models.NoticeAlert || mongoose.model('NoticeAlert', noticeAlertSchema);
export default NoticeAlert;