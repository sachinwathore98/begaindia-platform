import mongoose from 'mongoose';

const sponsorshipSchema = new mongoose.Schema(
  {
    sponsorshipId: { type: String, required: true, unique: true, index: true },
    packageTier: {
      type: String,
      required: true,
      enum: [
        'Adopt a Village (एक महिना – एक गाव)',
        'Primary School Digital Classroom',
        'Rural Health & Diagnostic Camp',
        '500-Tree Community Sanctuary',
      ],
    },
    sponsorshipAmount: { type: Number, required: true },

    // Corporate Entity & KYC Details
    companyName: { type: String, required: true, trim: true },
    cinNumber: { type: String, trim: true },
    companyPan: { type: String, required: true, trim: true },
    gstNumber: { type: String, trim: true },
    authorizedPerson: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    mobile: { type: String, required: true, trim: true },

    // Preferred CSR Impact Location
    preferredDistrict: { type: String, required: true },
    preferredTaluka: { type: String, required: true },

    // 80G Tax Exemption & Receipt Status
    requires80GReceipt: { type: Boolean, default: true },
    status: {
      type: String,
      enum: ['Pledge Submitted', 'Under Scrutiny', 'MoU Signed', 'Funds Received', 'Impact Executed'],
      default: 'Pledge Submitted',
    },
    impactMilestone: {
      villageAdopted: { type: String, default: 'Allocation in progress' },
      treesPlanted: { type: Number, default: 0 },
      studentsBenefited: { type: Number, default: 0 },
      patientsTreated: { type: Number, default: 0 },
      reportUrl: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

const Sponsorship = mongoose.models.Sponsorship || mongoose.model('Sponsorship', sponsorshipSchema);
export default Sponsorship;