import CMS from '../models/CMS.js';

// Default Fallback Data Seed
const defaultCMS = {
  heroTitle: 'Empowering B2B Founders & Entrepreneurs Across India',
  heroSubtitle: 'Join Maharashtra’s premiere B2B networking ecosystem. Enrol for summits, claim entry passes, and grow your enterprise.',
  aboutUsHeadline: 'Building the Future of Indian MSMEs & Startup Networks',
  aboutUsDescription: 'BEGAINDIA unites manufacturers, technology pioneers, real estate innovators, and corporate leaders into a unified growth engine.',
  banners: [
    {
      title: 'National MSME Growth & Innovation Conclave 2026',
      subtitle: 'August 25, 2026 • Chhatrapati Sambhajinagar',
      buttonText: 'Claim Pass',
      buttonLink: '/events',
      imageUrl: '/banner-conclave.jpg',
      isActive: true,
    },
  ],
  testimonials: [
    {
      name: 'SACHIN SUBHASH WATHORE',
      designation: 'Founder & Director',
      company: 'SW Digital Hub',
      avatar: '/avatars/sachin.jpg',
      quote: 'BEGAINDIA provided our digital agency with direct B2B client pipelines and high-value conclave access.',
      rating: 5,
    },
    {
      name: 'Priya Kulkarni',
      designation: 'Managing Partner',
      company: 'Trika Energy',
      avatar: '/avatars/priya.jpg',
      quote: 'The networking passes and verified directory placement helped us scale across regional markets.',
      rating: 5,
    },
  ],
};

// @desc    Get Current Public / Admin CMS Settings
// @route   GET /api/admin/cms
// @access  Public (or Admin)
export const getCMSData = async (req, res, next) => {
  try {
    let cms = await CMS.findOne();

    if (!cms) {
      cms = await CMS.create(defaultCMS);
    }

    return res.status(200).json({
      success: true,
      data: cms,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Update CMS Settings (Banners, Headlines, Testimonials)
// @route   PUT /api/admin/cms
// @access  Private/Admin
export const updateCMSData = async (req, res, next) => {
  try {
    const { heroTitle, heroSubtitle, aboutUsHeadline, aboutUsDescription, banners, testimonials } = req.body;

    let cms = await CMS.findOne();

    if (!cms) {
      cms = new CMS();
    }

    if (heroTitle !== undefined) cms.heroTitle = heroTitle;
    if (heroSubtitle !== undefined) cms.heroSubtitle = heroSubtitle;
    if (aboutUsHeadline !== undefined) cms.aboutUsHeadline = aboutUsHeadline;
    if (aboutUsDescription !== undefined) cms.aboutUsDescription = aboutUsDescription;
    if (banners !== undefined) cms.banners = banners;
    if (testimonials !== undefined) cms.testimonials = testimonials;

    await cms.save();

    return res.status(200).json({
      success: true,
      message: 'Website content & banners updated successfully!',
      data: cms,
    });
  } catch (error) {
    return next(error);
  }
};