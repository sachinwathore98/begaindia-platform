import PDFDocument from 'pdfkit';
import User from '../models/User.js';

// Mock/DB Event model simulation or database integration
const sampleEvents = [
  {
    id: 'evt-101',
    title: 'BEGAINDIA National Business Conclave 2026',
    date: '2026-08-25',
    time: '10:00 AM IST',
    location: 'Chhatrapati Sambhajinagar Grand Hall, Maharashtra',
    category: 'Networking',
    description: 'An exclusive gathering of entrepreneurs, startup founders, and business leaders across Maharashtra.',
  },
  {
    id: 'evt-102',
    title: 'Digital Growth & AI Strategy Workshop',
    date: '2026-09-10',
    time: '02:00 PM IST',
    location: 'Online Webinar (Zoom)',
    category: 'Workshop',
    description: 'Learn how to leverage generative AI, automation, and funnel architecture for corporate scaling.',
  }
];

// In-memory registration store (userId -> set of eventIds)
const registrations = new Map();

// @desc    Get All Upcoming Events
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res, next) => {
  try {
    return res.status(200).json({ success: true, data: sampleEvents });
  } catch (error) {
    return next(error);
  }
};

// @desc    Register Logged-in User for an Event
// @route   POST /api/events/register
// @access  Private
export const registerForEvent = async (req, res, next) => {
  try {
    const { eventId } = req.body;
    const userId = req.user.id;

    if (!eventId) {
      return res.status(400).json({ success: false, message: 'Event ID is required' });
    }

    const event = sampleEvents.find((e) => e.id === eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const userEvents = registrations.get(userId) || new Set();
    userEvents.add(eventId);
    registrations.set(userId, userEvents);

    return res.status(200).json({
      success: true,
      message: `Successfully registered for ${event.title}`,
      eventId,
    });
  } catch (error) {
    return next(error);
  }
};

// @desc    Get User Registered Events & Attendance History
// @route   GET /api/events/my-events
// @access  Private
export const getMyEvents = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userEventIds = registrations.get(userId) || new Set();

    const myEvents = sampleEvents.filter((evt) => userEventIds.has(evt.id));

    return res.status(200).json({ success: true, data: myEvents });
  } catch (error) {
    return next(error);
  }
};

// @desc    Download PDF Entry Pass for an Event
// @route   GET /api/events/:eventId/pass
// @access  Private
export const downloadEventPass = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;

    const event = sampleEvents.find((e) => e.id === eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    const user = await User.findById(userId);

    // Create PDF Document
    const doc = new PDFDocument({ size: 'A5', margin: 30 });

    // Set HTTP Response Headers for PDF streaming
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="BEGAINDIA-Pass-${eventId}.pdf"`
    );

    doc.pipe(res);

    // Card Header Banner
    doc
      .rect(0, 0, 420, 70)
      .fill('#0A3D91');

    doc
      .fillColor('#FFFFFF')
      .fontSize(20)
      .font('Helvetica-Bold')
      .text('BEGAINDIA', 30, 20)
      .fontSize(10)
      .fillColor('#F57C00')
      .text('OFFICIAL DELEGATE PASS', 30, 44);

    // Event Info Section
    doc
      .fillColor('#0F172A')
      .fontSize(14)
      .font('Helvetica-Bold')
      .text(event.title, 30, 95);

    doc
      .fontSize(10)
      .font('Helvetica')
      .fillColor('#475569')
      .text(`Date: ${event.date} | Time: ${event.time}`, 30, 120)
      .text(`Location: ${event.location}`, 30, 135);

    // Divider
    doc
      .moveTo(30, 160)
      .lineTo(390, 160)
      .strokeColor('#CBD5E1')
      .stroke();

    // Attendee Details
    doc
      .fontSize(11)
      .font('Helvetica-Bold')
      .fillColor('#0A3D91')
      .text('DELEGATE DETAILS', 30, 175);

    doc
      .fontSize(10)
      .font('Helvetica')
      .fillColor('#1E293B')
      .text(`Name: ${user?.name || 'Member'}`, 30, 195)
      .text(`Email: ${user?.email || 'N/A'}`, 30, 210)
      .text(`Mobile: ${user?.mobile || 'N/A'}`, 30, 225)
      .text(`Registration ID: BGN-${userId.toString().slice(-6).toUpperCase()}`, 30, 240);

    // Security Badge Box
    doc
      .rect(30, 270, 360, 40)
      .fill('#F8FAFC')
      .stroke('#E2E8F0');

    doc
      .fillColor('#0F172A')
      .fontSize(9)
      .font('Helvetica-Bold')
      .text('VERIFIED ATTENDEE PASS', 40, 285, { align: 'center' });

    doc.end();
  } catch (error) {
    return next(error);
  }
};