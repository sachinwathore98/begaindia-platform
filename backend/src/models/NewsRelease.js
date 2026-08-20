import mongoose from 'mongoose';

const newsReleaseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    marathiTitle: { type: String, required: true, trim: true },
    publication: { type: String, required: true, trim: true },
    edition: { type: String, required: true },
    category: {
      type: String,
      enum: ['BEGA Seva', 'Business Support', 'Events & Expo', 'MSME Subsidies', 'General'],
      default: 'General',
    },
    date: { type: String, default: () => new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) },
    summary: { type: String, required: true },
    tag: { type: String, default: 'Press Release' },
    externalUrl: { type: String, default: '' },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const NewsRelease = mongoose.models.NewsRelease || mongoose.model('NewsRelease', newsReleaseSchema);
export default NewsRelease;