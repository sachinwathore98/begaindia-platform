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

export default function ProfileManagement() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Form State
  const [formData, setFormData] = useState({
    companyName: '',
    designation: '',
    gstNumber: '',
    address: '',
    description: '',
    category: 'Information Technology',
  });

  // Media Preview & File States
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState('');
  
  const [brochureFile, setBrochureFile] = useState(null);
  const [brochureName, setBrochureName] = useState('');

  const [galleryFiles, setGalleryFiles] = useState([]);
  const [existingGallery, setExistingGallery] = useState([]);

  // Calculate Profile Completion
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
      if (res.success && res.data) {
        const d = res.data;
        setFormData({
          companyName: d.companyName || '',
          designation: d.designation || '',
          gstNumber: d.gstNumber || '',
          address: d.address || '',
          description: d.description || '',
          category: d.category || 'Information Technology',
        });
        if (d.logo) setLogoPreview(`${import.meta.env.VITE_API_URL || ''}${d.logo}`);
        if (d.brochure) setBrochureName(d.brochure.split('/').pop());
        if (d.gallery) setExistingGallery(d.gallery);
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
    } finally {
      setLoading(false);
    }
  };

  // Input Change Handlers
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

  // Form Submission
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
      if (res.success) {
        setMessage({ type: 'success', text: 'Business Profile and Promotion Assets updated successfully!' });
        fetchProfileData(); // Reload latest URLs
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  const completion = calculateCompletion();

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      
      {/* Header & Completion Meter */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Profile & Promotion Management</h1>
          <p className="text-slate-500 text-sm">Update your public business listing, branding assets, and promotional materials.</p>
        </div>
        <div className="w-full md:w-64 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="flex justify-between items-center text-sm font-semibold mb-2">
            <span className="text-slate-700">Profile Strength</span>
            <span className="text-blue-900">{completion}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                completion < 50 ? 'bg-amber-500' : completion < 80 ? 'bg-blue-600' : 'bg-emerald-500'
              }`} 
              style={{ width: `${completion}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Alert Feedback */}
      {message.text && (
        <div className={`p-4 rounded-xl flex items-center gap-3 ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
        }`}>
          {message.type === 'success' ? (
            <CheckCircleIcon className="w-6 h-6 text-emerald-600" />
          ) : (
            <ExclamationCircleIcon className="w-6 h-6 text-rose-600" />
          )}
          <span className="text-sm font-medium">{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Business Details */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <div className="flex items-center gap-2 text-lg font-bold text-slate-900 pb-4 border-b border-slate-100">
            <BuildingOfficeIcon className="w-6 h-6 text-blue-900" />
            Company Profile Details
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Company Name *</label>
              <input
                type="text"
                name="companyName"
                required
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                placeholder="e.g. SW Multimedia"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Designation *</label>
              <input
                type="text"
                name="designation"
                required
                value={formData.designation}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                placeholder="e.g. Founder & Managing Director"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">GST Number</label>
              <input
                type="text"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
                placeholder="27AAAAA0000A1Z5"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
              >
                <option value="Information Technology">Information Technology</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Manufacturing & Energy">Manufacturing & Energy</option>
                <option value="Real Estate & Construction">Real Estate & Construction</option>
                <option value="Media & Entertainment">Media & Entertainment</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Office Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
              placeholder="Full business location"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Company Description</label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 outline-none"
              placeholder="Describe your company services, offerings, and target market..."
            />
          </div>
        </div>

        {/* Section 2: Promotion & Branding Assets */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <div className="flex items-center gap-2 text-lg font-bold text-slate-900 pb-4 border-b border-slate-100">
            <PhotoIcon className="w-6 h-6 text-orange-600" />
            Promotion Assets & Media Gallery
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Company Logo Upload */}
            <div className="p-5 border border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-center bg-slate-50/50">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Company Logo (PNG/JPG)</label>
              {logoPreview ? (
                <img src={logoPreview} alt="Logo Preview" className="w-24 h-24 object-contain rounded-xl border bg-white p-2 mb-3" />
              ) : (
                <div className="w-20 h-20 bg-slate-200 rounded-xl flex items-center justify-center mb-3">
                  <PhotoIcon className="w-10 h-10 text-slate-400" />
                </div>
              )}
              <label className="cursor-pointer px-4 py-2 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
                <span>Select Logo</span>
                <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
              </label>
            </div>

            {/* Company Brochure Upload */}
            <div className="p-5 border border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-center bg-slate-50/50">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Company Brochure (PDF)</label>
              <DocumentCheckIcon className="w-12 h-12 text-blue-900 mb-2" />
              {brochureName && (
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-3 max-w-[200px] truncate">
                  {brochureName}
                </span>
              )}
              <label className="cursor-pointer px-4 py-2 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
                <span>Upload PDF Brochure</span>
                <input type="file" accept="application/pdf" onChange={handleBrochureChange} className="hidden" />
              </label>
            </div>
          </div>

          {/* Gallery Images Upload */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Showcase Gallery (Up to 10 Photos)</label>
            <div className="p-6 border border-dashed border-slate-300 rounded-2xl bg-slate-50/50 text-center">
              <CloudArrowUpIcon className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-600 mb-3">Drag & drop product, service, or event photos here</p>
              <label className="cursor-pointer px-5 py-2.5 bg-blue-900 text-white rounded-xl text-sm font-semibold hover:bg-blue-800 transition inline-block">
                <span>Browse Gallery Images</span>
                <input type="file" accept="image/*" multiple onChange={handleGalleryChange} className="hidden" />
              </label>
            </div>

            {/* Existing & Selected Preview Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-4">
              {existingGallery.map((imgUrl, idx) => (
                <img 
                  key={idx} 
                  src={`${import.meta.env.VITE_API_URL || ''}${imgUrl}`} 
                  alt="Gallery Item" 
                  className="w-full h-20 object-cover rounded-xl border border-slate-200" 
                />
              ))}
              {Array.from(galleryFiles).map((file, idx) => (
                <div key={idx} className="relative w-full h-20 rounded-xl overflow-hidden border border-blue-500">
                  <img src={URL.createObjectURL(file)} alt="New File" className="w-full h-full object-cover" />
                  <span className="absolute top-1 right-1 bg-blue-900 text-white text-[10px] px-1.5 py-0.5 rounded-full">New</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Save Button Bar */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-blue-900 text-white font-bold rounded-xl shadow-lg hover:bg-blue-800 transition disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Saving Profile...</span>
              </>
            ) : (
              <span>Save & Publish Changes</span>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}