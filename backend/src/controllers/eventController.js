import Event from '../models/Event.js';

// Seed Initial Signature Events if database is empty
const initialEvents = [
  {
    title: 'BEGA Mahaadhiveshan 2026',
    eventType: 'BEGA Mahaadhiveshan',
    theme: 'Empowered Businesses • Stronger Communities • Nation Building',
    date: new Date('2026-11-15T09:30:00Z'),
    endDate: new Date('2026-11-16T18:00:00Z'),
    time: '09:30 AM - 06:00 PM',
    venue: 'CIDCO Exhibition & Convention Centre, Chhatrapati Sambhajinagar',
    district: 'Chhatrapati Sambhajinagar',
    taluka: 'Aurangabad',
    description: 'The premier annual gathering of Maharashtra entrepreneurs, MSME founders, startup innovators, and BEGA leadership.',
    isFree: false,
    registrationFee: 499,
    bannerImage: '/events/mahaadhiveshan.jpg',
    stalls: [
      { stallNumber: 'A-101', category: 'Premium', price: 15000, isBooked: false },
      { stallNumber: 'A-102', category: 'Premium', price: 15000, isBooked: false },
      { stallNumber: 'B-201', category: 'Standard', price: 8000, isBooked: false },
      { stallNumber: 'B-202', category: 'Standard', price: 8000, isBooked: false },
    ],
  },
  {
    title: 'BEGA Maharashtra Business Expo 2026',
    eventType: 'BEGA Business Expo',
    theme: 'B2B Opportunities • Market Linkage • Supply Chain Synergy',
    date: new Date('2026-12-05T10:00:00Z'),
    endDate: new Date('2026-12-07T19:00:00Z'),
    time: '10:00 AM - 07:00 PM',
    venue: 'Auto Cluster Exhibition Center, Pune',
    district: 'Pune',
    taluka: 'Haveli',
    description: '3-day commercial expo connecting manufacturers, distributors, institutional buyers, and retail chains across India.',
    isFree: true,
    registrationFee: 0,
    bannerImage: '/events/expo.jpg',
    stalls: [
      { stallNumber: 'EX-01', category: 'Corporate Pavilion', price: 25000, isBooked: false },
      { stallNumber: 'EX-02', category: 'Premium', price: 18000, isBooked: false },
      { stallNumber: 'EX-03', category: 'Standard', price: 10000, isBooked: false },
    ],
  },
  {
    title: 'District MSME & GST Compliance Workshop',
    eventType: 'District Training',
    theme: 'Tax Planning • E-Invoicing • Government Subsidy Schemes',
    date: new Date('2026-09-20T14:00:00Z'),
    time: '02:00 PM - 05:30 PM',
    venue: 'MIDC Industrial Association Hall, Nashik',
    district: 'Nashik',
    taluka: 'Nashik',
    description: 'Expert panel session with senior Chartered Accountants and GST officials to guide business owners on regulatory compliances.',
    isFree: true,
    registrationFee: 0,
    stalls: [],
  },
];

// @desc    Get All Events & Filter by Type/District
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res, next) => {
  try {
    const { eventType, district } = req.query;
    let query = {};

    if (eventType && eventType !== 'All') {
      query.eventType = eventType;
    }
    if (district && district !== 'All') {
      query.district = district;
    }

    let events = await Event.find(query).sort({ date: 1 });

    if (events.length === 0 && Object.keys(query).length === 0) {
      events = await Event.insertMany(initialEvents);
    }

    return res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Register Attendee for an Event & Generate Pass ID
// @route   POST /api/events/:id/register
// @access  Public / Member
export const registerForEvent = async (req, res, next) => {
  try {
    const { fullName, email, mobile, companyName } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const alreadyRegistered = event.registeredAttendees.some((a) => a.email === cleanEmail);

    if (alreadyRegistered) {
      return res.status(400).json({ success: false, message: 'You have already registered for this event.' });
    }

    const year = new Date().getFullYear();
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const passId = `BEGA-PASS-${year}-${randomCode}`;

    const attendee = {
      fullName,
      email: cleanEmail,
      mobile,
      companyName: companyName || 'Enterprise Delegate',
      passId,
    };

    event.registeredAttendees.push(attendee);
    await event.save();

    return res.status(201).json({
      success: true,
      message: 'Registration confirmed! Your Delegate Pass is ready.',
      pass: {
        passId,
        eventTitle: event.title,
        venue: event.venue,
        date: event.date,
        time: event.time,
        attendeeName: fullName,
        companyName: attendee.companyName,
      },
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Book a Commercial Stall at an Expo
// @route   POST /api/events/:id/book-stall
// @access  Public / Member
export const bookExpoStall = async (req, res, next) => {
  try {
    const { stallNumber, companyName, email } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Expo event not found.' });
    }

    const stall = event.stalls.find((s) => s.stallNumber === stallNumber);
    if (!stall) {
      return res.status(404).json({ success: false, message: 'Stall not found.' });
    }

    if (stall.isBooked) {
      return res.status(400).json({ success: false, message: 'This stall is already reserved.' });
    }

    stall.isBooked = true;
    stall.bookedByCompany = companyName;
    stall.bookedByEmail = email.trim().toLowerCase();

    await event.save();

    return res.status(200).json({
      success: true,
      message: `Stall ${stallNumber} successfully reserved for ${companyName}.`,
      stall,
    });
  } catch (error) {
    return next(error);
  }
};