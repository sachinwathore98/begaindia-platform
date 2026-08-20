// src/pages/dashboard/ProfileManagement.jsx
import React, { useState, useEffect } from 'react';
import { 
  BuildingOfficeIcon, 
  DocumentCheckIcon, 
  PhotoIcon, 
  CloudArrowUpIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { getMyProfile, updateProfile } from '../../services/businessService';

const API_BASE = (import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com').replace(/\/$/, '');

export default function ProfileManagement() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    companyName: '',
    designation: '',
    gstNumber: '',
    address: '',
    description: '',
    category: 'Information Technology',
  });

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  const [brochureFile, setBrochureFile] = useState(null);
  const [brochureName, setBrochureName] = useState('');
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [existingGallery, setExistingGallery] = useState([]);

  const calculateCompletion = () => {
    const fields = [
      formData.companyName,
      formData.designation,
      formData.gstNumber,
      formData.address,
      formData.description,
      logoPreview,
      brochureName || existingGallery.length > 0,
    ];
    const filled = fields.filter(Boolean).length;
    return Math.round((filled / fields.length) * 100);
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const res = await getMyProfile();
      if (res?.success && res.data) {
        const d = res.data;
        setFormData({
          companyName: d.companyName || '',
          designation: d.designation || '',
          gstNumber: d.gstNumber || '',
          address: d.address || '',
          description: d.description || '',
          category: d.category || 'Information Technology',
        });
        if (d.logo) setLogoPreview(d.logo.startsWith('http') ? d.logo : `${API_BASE}${d.logo}`);
        if (d.brochure) setBrochureName(d.brochure.split('/').pop());
        if (d.gallery) setExistingGallery(d.gallery);
      }
    } catch (err) {
      console.warn('Profile fetch error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleBrochureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBrochureFile(file);
      setBrochureName(file.name);
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (logoFile) data.append('logo', logoFile);
      if (brochureFile) data.append('brochure', brochureFile);
      if (galleryFiles.length > 0) {
        galleryFiles.forEach((file) => data.append('gallery', file));
      }

      const res = await updateProfile(data);
      if (res?.success) {
        setMessage({ type: 'success', text: 'Business Profile and Media Assets updated successfully!' });
        fetchProfileData();
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || err.message || 'Failed to update profile' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0A3D91]"></div>
      </div>
    );
  }

  const completion = calculateCompletion();

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 font-sans">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Profile & Media Management</h1>
          <p className="text-slate-500 text-xs">Update your public directory showcase, branding assets, and catalog.</p>
        </div>
        <div className="w-full md:w-64 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="flex justify-between items-center text-xs font-semibold mb-2">
            <span className="text-slate-700">Profile Strength</span>
            <span className="text-[#0A3D91] font-bold">{completion}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                completion < 50 ? 'bg-amber-500' : completion < 80 ? 'bg-blue-600' : 'bg-emerald-500'
              }`} 
              style={{ width: `${completion}%` }}
            ></div>
          </div>
        </div>
      </div>

      {message.text && (
        <div className={`p-4 rounded-xl flex items-center gap-3 text-xs font-bold ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
        }`}>
          {message.type === 'success' ? (
            <CheckCircleIcon className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <ExclamationCircleIcon className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center gap-2 text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
            <BuildingOfficeIcon className="w-5 h-5 text-[#0A3D91]" />
            Enterprise Details
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Company Name *</label>
              <input
                type="text"
                name="companyName"
                required
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:border-[#0A3D91]"
                placeholder="Company legal title"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Designation *</label>
              <input
                type="text"
                name="designation"
                required
                value={formData.designation}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:border-[#0A3D91]"
                placeholder="e.g. Managing Director / Founder"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">GST Number</label>
              <input
                type="text"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 uppercase font-mono outline-none focus:border-[#0A3D91]"
                placeholder="27AAAAA0000A1Z5"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Sector Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:border-[#0A3D91]"
              >
                <option value="Information Technology">Information Technology</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Manufacturing & Industrial">Manufacturing & Industrial</option>
                <option value="Real Estate & Construction">Real Estate & Construction</option>
                <option value="Agro & Food Processing">Agro & Food Processing</option>
                <option value="Services & Professional Consulting">Services & Consulting</option>
              </select>
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-slate-700 mb-1">Office / Works Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:border-[#0A3D91]"
              placeholder="Plot No., MIDC Industrial Area, District"
            />
          </div>

          <div className="text-xs">
            <label className="block font-semibold text-slate-700 mb-1">Company Description</label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 outline-none focus:border-[#0A3D91]"
              placeholder="Describe your capabilities, machinery, and commercial offerings..."
            />
          </div>
        </div>

        {/* Media & Attachments */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <div className="flex items-center gap-2 text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
            <PhotoIcon className="w-5 h-5 text-[#F57C00]" />
            Branding & Promotional Assets
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 border border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-center bg-slate-50/50">
              <label className="block text-xs font-semibold text-slate-700 mb-2">Company Logo (PNG/JPG)</label>
              {logoPreview ? (
                <img src={logoPreview} alt="Logo" className="w-20 h-20 object-contain rounded-xl border bg-white p-1 mb-2" />
              ) : (
                <div className="w-16 h-16 bg-slate-200 rounded-xl flex items-center justify-center mb-2">
                  <PhotoIcon className="w-8 h-8 text-slate-400" />
                </div>
              )}
              <label className="cursor-pointer px-4 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
                <span>Select Logo</span>
                <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
              </label>
            </div>

            <div className="p-5 border border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-center bg-slate-50/50">
              <label className="block text-xs font-semibold text-slate-700 mb-2">Product Brochure (PDF)</label>
              <DocumentCheckIcon className="w-10 h-10 text-[#0A3D91] mb-1" />
              {brochureName && (
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full mb-2 max-w-[200px] truncate">
                  {brochureName}
                </span>
              )}
              <label className="cursor-pointer px-4 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
                <span>Select PDF</span>
                <input type="file" accept="application/pdf" onChange={handleBrochureChange} className="hidden" />
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-[#0A3D91] hover:bg-[#083278] text-white text-xs font-bold rounded-xl shadow-lg transition disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? 'Publishing Changes...' : 'Save & Publish Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}