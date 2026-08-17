import React, { useState, useEffect } from 'react';
import {
  Layout,
  Image as ImageIcon,
  MessageSquare,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  Star,
} from 'lucide-react';
import { getCMSContent, updateCMSContent } from '../../services/adminService';

export default function CMSAdmin() {
  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'banners' | 'testimonials'
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  const [cmsData, setCmsData] = useState({
    heroTitle: '',
    heroSubtitle: '',
    aboutUsHeadline: '',
    aboutUsDescription: '',
    banners: [],
    testimonials: [],
  });

  useEffect(() => {
    fetchCMS();
  }, []);

  const fetchCMS = async () => {
    try {
      setLoading(true);
      const res = await getCMSContent();
      if (res.success && res.data) {
        setCmsData(res.data);
      }
    } catch (err) {
      console.error('Failed to fetch CMS content:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await updateCMSContent(cmsData);
      if (res.success) {
        setSavedMessage('Website content published successfully!');
        setTimeout(() => setSavedMessage(''), 4000);
      }
    } catch (err) {
      alert('Failed to update content');
    } finally {
      setSaving(false);
    }
  };

  // Banner Actions
  const handleAddBanner = () => {
    setCmsData({
      ...cmsData,
      banners: [
        ...cmsData.banners,
        {
          title: 'New Promotional Banner',
          subtitle: 'Subheading text',
          buttonText: 'Claim Offer',
          buttonLink: '/membership',
          imageUrl: '',
          isActive: true,
        },
      ],
    });
  };

  const handleRemoveBanner = (index) => {
    const updated = cmsData.banners.filter((_, i) => i !== index);
    setCmsData({ ...cmsData, banners: updated });
  };

  // Testimonial Actions
  const handleAddTestimonial = () => {
    setCmsData({
      ...cmsData,
      testimonials: [
        ...cmsData.testimonials,
        {
          name: 'Member Name',
          designation: 'CEO',
          company: 'Company Name',
          quote: 'Excellent platform for expanding regional B2B partnerships.',
          rating: 5,
        },
      ],
    });
  };

  const handleRemoveTestimonial = (index) => {
    const updated = cmsData.testimonials.filter((_, i) => i !== index);
    setCmsData({ ...cmsData, testimonials: updated });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-950 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-8 space-y-6 font-sans">
      
      {/* Top Header & Save Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
            Content Engine
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-2">Content Management System (CMS)</h1>
          <p className="text-slate-400 text-xs mt-1">Edit homepage hero copy, promotional banners, and customer testimonials dynamically.</p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Publishing...' : 'Publish Content Updates'}
        </button>
      </div>

      {savedMessage && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs rounded-2xl flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{savedMessage}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 w-fit">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'general' ? 'bg-orange-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layout className="w-4 h-4" /> Page Headlines & Content
        </button>
        <button
          onClick={() => setActiveTab('banners')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'banners' ? 'bg-orange-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <ImageIcon className="w-4 h-4" /> Promotional Banners ({cmsData.banners.length})
        </button>
        <button
          onClick={() => setActiveTab('testimonials')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'testimonials' ? 'bg-orange-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Testimonials ({cmsData.testimonials.length})
        </button>
      </div>

      {/* TAB 1: GENERAL HEADLINES */}
      {activeTab === 'general' && (
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6 max-w-3xl">
          <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">Homepage & About Copy</h2>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Hero Main Title</label>
              <input
                type="text"
                value={cmsData.heroTitle}
                onChange={(e) => setCmsData({ ...cmsData, heroTitle: e.target.value })}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Hero Subtitle</label>
              <textarea
                rows={3}
                value={cmsData.heroSubtitle}
                onChange={(e) => setCmsData({ ...cmsData, heroSubtitle: e.target.value })}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">About Us Section Headline</label>
              <input
                type="text"
                value={cmsData.aboutUsHeadline}
                onChange={(e) => setCmsData({ ...cmsData, aboutUsHeadline: e.target.value })}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-semibold">About Us Description</label>
              <textarea
                rows={3}
                value={cmsData.aboutUsDescription}
                onChange={(e) => setCmsData({ ...cmsData, aboutUsDescription: e.target.value })}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROMOTIONAL BANNERS */}
      {activeTab === 'banners' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-white">Homepage Banners</h2>
            <button
              onClick={handleAddBanner}
              className="px-4 py-2 bg-orange-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Banner
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cmsData.banners.map((b, idx) => (
              <div key={idx} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3 relative">
                <button
                  onClick={() => handleRemoveBanner(idx)}
                  className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-rose-400"
                  title="Delete Banner"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <h3 className="text-xs font-bold text-orange-400 uppercase tracking-wider">Banner #{idx + 1}</h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Banner Title</label>
                    <input
                      type="text"
                      value={b.title}
                      onChange={(e) => {
                        const updated = [...cmsData.banners];
                        updated[idx].title = e.target.value;
                        setCmsData({ ...cmsData, banners: updated });
                      }}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Subtitle / Details</label>
                    <input
                      type="text"
                      value={b.subtitle}
                      onChange={(e) => {
                        const updated = [...cmsData.banners];
                        updated[idx].subtitle = e.target.value;
                        setCmsData({ ...cmsData, banners: updated });
                      }}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Button Text</label>
                      <input
                        type="text"
                        value={b.buttonText}
                        onChange={(e) => {
                          const updated = [...cmsData.banners];
                          updated[idx].buttonText = e.target.value;
                          setCmsData({ ...cmsData, banners: updated });
                        }}
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Button Target Link</label>
                      <input
                        type="text"
                        value={b.buttonLink}
                        onChange={(e) => {
                          const updated = [...cmsData.banners];
                          updated[idx].buttonLink = e.target.value;
                          setCmsData({ ...cmsData, banners: updated });
                        }}
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TESTIMONIALS */}
      {activeTab === 'testimonials' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-white">Member Testimonials</h2>
            <button
              onClick={handleAddTestimonial}
              className="px-4 py-2 bg-orange-500 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Testimonial
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cmsData.testimonials.map((t, idx) => (
              <div key={idx} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3 relative">
                <button
                  onClick={() => handleRemoveTestimonial(idx)}
                  className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-rose-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>

                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Name</label>
                      <input
                        type="text"
                        value={t.name}
                        onChange={(e) => {
                          const updated = [...cmsData.testimonials];
                          updated[idx].name = e.target.value;
                          setCmsData({ ...cmsData, testimonials: updated });
                        }}
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Company</label>
                      <input
                        type="text"
                        value={t.company}
                        onChange={(e) => {
                          const updated = [...cmsData.testimonials];
                          updated[idx].company = e.target.value;
                          setCmsData({ ...cmsData, testimonials: updated });
                        }}
                        className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Testimonial Quote</label>
                    <textarea
                      rows={2}
                      value={t.quote}
                      onChange={(e) => {
                        const updated = [...cmsData.testimonials];
                        updated[idx].quote = e.target.value;
                        setCmsData({ ...cmsData, testimonials: updated });
                      }}
                      className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}