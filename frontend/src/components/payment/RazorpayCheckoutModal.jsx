import React, { useState } from 'react';
import axios from 'axios';
import { ShieldCheck, Lock, CheckCircle2, X, Printer, AlertCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

const PLAN_PRICING = {
  'Basic Membership': { base: 1016.1, gst: 182.9, total: 1199 },
  'Business Membership': { base: 2541.52, gst: 457.48, total: 2999 },
  'Lifetime Membership': { base: 9322.03, gst: 1677.97, total: 11000 },
  'Executive Membership': { base: 17796.61, gst: 3203.39, total: 21000 },
};

export default function RazorpayCheckoutModal({ applicationData, onClose, onComplete }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(null);

  const plan = applicationData?.membershipPlan || 'Business Membership';
  const pricing = PLAN_PRICING[plan] || PLAN_PRICING['Business Membership'];

  // Dynamically load Razorpay standard checkout script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setErrorMessage('');
    setLoading(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Razorpay SDK failed to load. Check your internet connection.');
      }

      // Step 1: Request Order Creation from Backend
      const orderRes = await axios.post(`${API_URL}/api/payment/create-order`, {
        membershipPlan: plan,
        amount: pricing.total,
        currency: 'INR',
      });

      if (!orderRes.data?.success) {
        throw new Error(orderRes.data?.message || 'Failed to initiate order.');
      }

      const { order_id, amount, currency, key_id } = orderRes.data;

      // Step 2: Configure and Open Standard Razorpay Checkout Modal
      const options = {
        key: key_id || KEY_ID,
        amount: amount,
        currency: currency,
        name: 'BEGA INDIA',
        description: `Enrollment - ${plan}`,
        order_id: order_id,
        prefill: {
          name: applicationData?.name || '',
          email: applicationData?.email || '',
          contact: applicationData?.mobile || '',
        },
        theme: {
          color: '#0A3D91',
        },
        handler: async function (response) {
          try {
            // Step 3: Verify Payment Signature with Backend
            const verifyRes = await axios.post(`${API_URL}/api/payment/verify-payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              applicationData,
            });

            if (verifyRes.data?.success) {
              setPaymentSuccess(verifyRes.data.member || {
                name: applicationData.name,
                applicationNumber: `BEGA-CONFIRMED`,
                paymentDetails: {
                  invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
                },
              });
              if (onComplete) onComplete(verifyRes.data.member);
            } else {
              setErrorMessage('Payment verification failed on the server.');
            }
          } catch (verifyErr) {
            setErrorMessage(verifyErr.response?.data?.message || 'Signature verification failed.');
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);

      razorpayInstance.on('payment.failed', function (response) {
        setErrorMessage(`Payment Failed: ${response.error.description || 'Transaction declined'}`);
        setLoading(false);
      });

      razorpayInstance.open();
    } catch (err) {
      setErrorMessage(err.response?.data?.message || err.message || 'Error processing payment.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-5 animate-in fade-in">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0A3D91] rounded-lg flex items-center justify-center text-white font-bold">B</div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">Razorpay Secure Checkout</h3>
              <p className="text-[10px] text-slate-500">Standard 256-bit Encrypted</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {paymentSuccess ? (
          /* Payment Success & Receipt */
          <div className="space-y-5 text-center">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h2 className="text-lg font-extrabold text-slate-900">Payment Verified Successfully!</h2>
              <p className="text-xs text-slate-500">Membership activated and registered in the system.</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500">Member ID:</span>
                <span className="font-mono font-bold text-[#0A3D91]">{paymentSuccess.applicationNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Paid:</span>
                <span className="font-bold text-slate-900">₹{pricing.total}</span>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full py-3 bg-[#0A3D91] text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow"
            >
              <Printer className="w-4 h-4 text-amber-400" /> Print Receipt
            </button>
          </div>
        ) : (
          /* Checkout Breakdown */
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#0A3D91]">{plan}</span>
                <span className="font-extrabold text-slate-900">₹{pricing.base}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500 text-[11px]">
                <span>18% GST</span>
                <span>₹{pricing.gst}</span>
              </div>
              <div className="pt-2 border-t border-blue-200 flex justify-between items-center text-slate-900 font-extrabold text-sm">
                <span>Total Amount</span>
                <span className="text-[#0A3D91]">₹{pricing.total}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full py-3.5 bg-[#F57C00] hover:bg-[#e06f00] text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              {loading ? 'Initializing Payment...' : `Pay ₹${pricing.total} via Razorpay`}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}