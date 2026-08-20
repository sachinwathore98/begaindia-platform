import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Megaphone,
  Newspaper,
  PlusCircle,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Send,
  ExternalLink,
  Sparkles,
  RefreshCw,
  BellRing,
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://begaindia-api.onrender.com';

export default function CMSAdmin() {
  const [activeTab, setActiveTab] = useState('notices'); // 'notices' | 'news'
  const [notices, setNotices] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);

  // New Notice Form State
  const [noticeForm, setNoticeForm] = useState({
    title: '',
    type: 'Urgent Alert',
    message: '',
    actionLink: '/support',
    actionText: 'Register Issue',
    priority: 1,
  });

  // New News Form State
  const [newsForm, setNewsForm] = useState({
    title: '',
    marathiTitle: '',
    publication: 'Lokmat (लोकमत)',
    edition: 'Chhatrapati Sambhajinagar',
    category: 'BEGA Seva',
    summary: '',
    tag: 'Official Press Release',
  });

  useEffect(() => {
    fetchCMSData();
  }, []);

  const fetchCMSData = async () => {
    try {
      setLoading(true);
      const [noticesRes, newsRes] = await Promise.allSettled([
        axios.get(`${API_URL}/api/cms/notices/active`),
        axios.get(`${API_URL}/api/cms/news`),
      ]);

      if (noticesRes.status === 'fulfilled' && noticesRes.value.data?.success) {
        setNotices(noticesRes.value.data.data);
      } else {
        setNotices([
          {
            _id: 'n1',
            title: 'BEGA Mahaadhiveshan Stall Booking Open',
            type: 'Conclave Update',
            message: 'Stall allocations for CIDCO Exhibition Grounds are now 60% reserved. Early-bird registration closing soon.',
            actionLink: '/expo',
            actionText: 'Book Stall Now',
          },
        ]);
      }

      if (newsRes.status === 'fulfilled' && newsRes.value.data?.success) {
        setNewsList(newsRes.value.data.data);
      } else {
        setNewsList([
          {
            _id: 'nw1',
            title: 'BEGA BSR Desk Expedites Industrial Approvals in DMIC Corridor',
            marathiTitle: 'शेंद्रा व वाळूज DMIC मधील परवान्यांवर बेगा समन्वय',
            publication: 'Sakal',
            edition: 'State Edition',
            category: 'Business Support',
            summary: 'Assisted 18 fabrication and forging units in clearing DIC documentation.',
          },
        ]);
      }
    } catch (err) {
      console.warn('Using local CMS state fallback');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNotice = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/cms/notices`, noticeForm);
      if (res.data?.success) {
        setNotices([res.data.data, ...notices]);
        setNoticeForm({ title: '', type: 'Urgent Alert', message: '', actionLink: '', actionText: 'Learn More', priority: 1 });
        alert('Notice broadcast live!');
      }
    } catch (err) {
      const mockNotice = { _id: Date.now().toString(), ...noticeForm };
      setNotices([mockNotice, ...notices]);
      setNoticeForm({ title: '', type: 'Urgent Alert', message: '', actionLink: '', actionText: 'Learn More', priority: 1 });
    }
  };

  const handleDeleteNotice = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/cms/notices/${id}`);
      setNotices(notices.filter((n) => n._id !== id));
    } catch (err) {
      setNotices(notices.filter((n) => n._id !== id));
    }
  };

  const handleCreateNews = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/cms/news`, newsForm);
      if (res.data?.success) {
        setNewsList([res.data.data, ...newsList]);
        setNewsForm({ title: '', marathiTitle: '', publication: 'Lokmat', edition: '', category: 'BEGA Seva', summary: '', tag: 'Press Release' });
        alert('News item published!');
      }
    } catch (err) {
      const mockNews = { _id: Date.now().toString(), ...newsForm };
      setNewsList([mockNews, ...newsList]);
      setNewsForm({ title: '', marathiTitle: '', publication: 'Lokmat', edition: '', category: 'BEGA Seva', summary: '', tag: 'Press Release' });
    }
  };

  const handleDeleteNews = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/cms/news/${id}`);
      setNewsList(newsList.filter((n) => n._id !== id));
    } catch (err) {
      setNewsList(newsList.filter((n) => n._id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-8 space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#F57C00] bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
            Publishing & Alert Control
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-2">
            Dynamic CMS & Live Broadcast Desk
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Push marquee banners, publish press releases, and manage site announcements without code changes.
          </p>
        </div>

        <button
          onClick={fetchCMSData}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-800 flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Refresh CMS
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('notices')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
            activeTab === 'notices'
              ? 'bg-[#F57C00] text-slate-950 shadow-md font-black'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <BellRing className="w-4 h-4" /> Live Marquee & Alert Banners ({notices.length})
        </button>
        <button
          onClick={() => setActiveTab('news')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
            activeTab === 'news'
              ? 'bg-[#F57C00] text-slate-950 shadow-md font-black'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          <Newspaper className="w-4 h-4" /> Media & Press Release Desk ({newsList.length})
        </button>
      </div>

      {/* TAB 1: MARQUEE ALERTS & NOTICES */}
      {activeTab === 'notices' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in">
          
          {/* Create Alert Form */}
          <div className="lg:col-span-5 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-[#F57C00]" /> Broadcast New Marquee Alert
            </h2>

            <form onSubmit={handleCreateNotice} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Notice Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Government MSME Subsidy Drive"
                  value={noticeForm.title}
                  onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-[#F57C00]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Alert Category</label>
                  <select
                    value={noticeForm.type}
                    onChange={(e) => setNoticeForm({ ...noticeForm, type: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                  >
                    <option>Urgent Alert</option>
                    <option>Government Scheme</option>
                    <option>Conclave Update</option>
                    <option>General Announcement</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Action Button Text</label>
                  <input
                    type="text"
                    placeholder="e.g. Apply Now"
                    value={noticeForm.actionText}
                    onChange={(e) => setNoticeForm({ ...noticeForm, actionText: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Target Route / Link</label>
                <input
                  type="text"
                  placeholder="e.g. /schemes or /support"
                  value={noticeForm.actionLink}
                  onChange={(e) => setNoticeForm({ ...noticeForm, actionLink: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Announcement Message *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter alert message rendered on the homepage banner..."
                  value={noticeForm.message}
                  onChange={(e) => setNoticeForm({ ...noticeForm, message: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#F57C00] hover:bg-[#e06f00] text-slate-950 font-extrabold rounded-xl shadow transition flex items-center justify-center gap-2 mt-2"
              >
                <Send className="w-4 h-4" /> Publish Alert Banner
              </button>
            </form>
          </div>

          {/* Active Notices List */}
          <div className="lg:col-span-7 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active Broadcasts ({notices.length})
            </h2>

            <div className="space-y-3">
              {notices.map((n) => (
                <div
                  key={n._id}
                  className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2 flex justify-between items-start gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-orange-500/20 text-[#F57C00] text-[10px] font-extrabold rounded-full border border-orange-500/30">
                        {n.type}
                      </span>
                      <h3 className="text-sm font-extrabold text-white">{n.title}</h3>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{n.message}</p>
                    {n.actionLink && (
                      <span className="text-[11px] font-bold text-blue-400 inline-flex items-center gap-1">
                        Link: {n.actionLink} ({n.actionText})
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleDeleteNotice(n._id)}
                    className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: NEWS & MEDIA PUBLISHER */}
      {activeTab === 'news' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in">
          
          {/* Create News Form */}
          <div className="lg:col-span-5 bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-[#F57C00]" /> Publish Press Release
            </h2>

            <form onSubmit={handleCreateNews} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Headline (English) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BEGA India Organizes State MSME Summit"
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Headline (मराठी) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. बेगा इंडिया तर्फे राज्यस्तरीय एमएसएमई परिषद"
                  value={newsForm.marathiTitle}
                  onChange={(e) => setNewsForm({ ...newsForm, marathiTitle: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Publication Source</label>
                  <input
                    type="text"
                    placeholder="Lokmat / Sakal / Bureau"
                    value={newsForm.publication}
                    onChange={(e) => setNewsForm({ ...newsForm, publication: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Category</label>
                  <select
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                  >
                    <option>BEGA Seva</option>
                    <option>Business Support</option>
                    <option>Events & Expo</option>
                    <option>MSME Subsidies</option>
                    <option>General</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Summary / Press Brief *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter news summary..."
                  value={newsForm.summary}
                  onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#F57C00] hover:bg-[#e06f00] text-slate-950 font-extrabold rounded-xl shadow transition flex items-center justify-center gap-2 mt-2"
              >
                <Send className="w-4 h-4" /> Publish to News Portal
              </button>
            </form>
          </div>

          {/* Active News List */}
          <div className="lg:col-span-7 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Published Press Releases ({newsList.length})
            </h2>

            <div className="space-y-3">
              {newsList.map((nw) => (
                <div
                  key={nw._id}
                  className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2 flex justify-between items-start gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-400 text-[10px] font-extrabold rounded-full border border-blue-500/30">
                        {nw.publication}
                      </span>
                      <span className="text-[10px] text-slate-500">{nw.category}</span>
                    </div>
                    <h3 className="text-sm font-extrabold text-white leading-snug">{nw.title}</h3>
                    <p className="text-xs text-[#F57C00] font-semibold">{nw.marathiTitle}</p>
                    <p className="text-xs text-slate-400">{nw.summary}</p>
                  </div>

                  <button
                    onClick={() => handleDeleteNews(nw._id)}
                    className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}