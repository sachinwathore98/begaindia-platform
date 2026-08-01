import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, default: '' },
  company: { type: String, default: '' },
  avatar: { type: String, default: '' },
  quote: { type: String, required: true },
  rating: { type: Number, default: 5 },
});

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  buttonText: { type: String, default: 'Learn More' },
  buttonLink: { type: String, default: '/membership' },
  imageUrl: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
});

const cmsSchema = new mongoose.Schema(
  {
    heroTitle: {
      type: String,
      default: 'Empowering B2B Founders & Entrepreneurs Across India',
    },
    heroSubtitle: {
      type: String,
      default: 'Join Maharashtra’s premiere B2B networking ecosystem. Enrol for summits, claim entry passes, and grow your enterprise.',
    },
    aboutUsHeadline: {
      type: String,
      default: 'Building the Future of Indian MSMEs & Startup Networks',
    },
    aboutUsDescription: {
      type: String,
      default: 'BEGAINDIA unites manufacturers, technology pioneers, real estate innovators, and corporate leaders into a unified growth engine.',
    },
    banners: [bannerSchema],
    testimonials: [testimonialSchema],
  },
  { timestamps: true }
);

const CMS = mongoose.model('CMS', cmsSchema);
export default CMS;