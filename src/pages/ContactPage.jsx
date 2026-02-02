import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageCircle, 
  PhoneCall, 
  MapPin, 
  Clock, 
  Truck, 
  Instagram, 
  Facebook, 
  ChevronRight, 
  ArrowLeft,
  ExternalLink
} from 'lucide-react';
import { APP_CONFIG } from '../data/constants';
import { sendWhatsAppOrder, callRestaurant } from '../utils/whatsapp';

const ContactPage = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: 'What are the delivery charges?',
      answer: 'We charge ₹40 for delivery. Orders above ₹299 get FREE delivery!'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'Cash on delivery, UPI (GPay, PhonePe), and cards are accepted.'
    },
    {
      question: 'How long does delivery take?',
      answer: `We deliver within ${APP_CONFIG.deliveryTime} to your location.`
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-10">
      
      {/* 1. Curved Header (Matches Profile Theme) */}
      <div className="bg-slate-900 pb-24 rounded-b-[2.5rem] relative overflow-hidden shadow-xl">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

        {/* Navigation Bar */}
        <div className="px-4 py-4 flex items-center gap-4 relative z-10 text-white">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold tracking-tight">Support</h1>
        </div>

        {/* Header Content */}
        <div className="px-6 mt-2 relative z-10">
            <h2 className="text-3xl font-black text-white leading-tight">
                How can we <br/>
                <span className="text-orange-500">help you?</span>
            </h2>
            <p className="text-slate-400 text-sm mt-2 font-medium max-w-[250px]">
                Our team is available 10 AM - 10 PM to assist with your cravings.
            </p>
        </div>
      </div>

      {/* 2. Floating Action Grid (Overlapping Header) */}
      <div className="px-4 -mt-16 relative z-20 grid grid-cols-2 gap-4">
        {/* WhatsApp Card */}
        <button 
          onClick={sendWhatsAppOrder}
          className="bg-white p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center gap-3 active:scale-95 transition-all group"
        >
            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                <MessageCircle size={24} fill="currentColor" className="opacity-20 absolute" />
                <MessageCircle size={24} />
            </div>
            <div className="text-center">
                <span className="block text-sm font-black text-gray-900">WhatsApp</span>
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide">Quick Chat</span>
            </div>
        </button>

        {/* Call Card */}
        <button 
          onClick={callRestaurant}
          className="bg-white p-5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center gap-3 active:scale-95 transition-all group"
        >
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                 <PhoneCall size={24} fill="currentColor" className="opacity-20 absolute" />
                 <PhoneCall size={24} />
            </div>
            <div className="text-center">
                <span className="block text-sm font-black text-gray-900">Call Us</span>
                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide">Talk Now</span>
            </div>
        </button>
      </div>

      {/* 3. Info List Card */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Address */}
            <div className="p-5 border-b border-gray-50 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                    <MapPin size={20} />
                </div>
                <div className="flex-1">
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Our Location</h3>
                    <p className="text-sm font-bold text-gray-900 leading-snug">{APP_CONFIG.address}</p>
                </div>
                <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                >
                    <ExternalLink size={18} />
                </a>
            </div>

            {/* Hours */}
            <div className="p-5 border-b border-gray-50 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 shrink-0">
                    <Clock size={20} />
                </div>
                <div>
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Opening Hours</h3>
                    <p className="text-sm font-bold text-gray-900">{APP_CONFIG.openingHours}</p>
                </div>
            </div>

            {/* Delivery */}
            <div className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 shrink-0">
                    <Truck size={20} />
                </div>
                <div>
                    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Delivery Time</h3>
                    <p className="text-sm font-bold text-gray-900">Usually within {APP_CONFIG.deliveryTime}</p>
                </div>
            </div>
        </div>
      </div>

      {/* 4. Social Row */}
      <div className="px-4 mt-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <span className="text-sm font-bold text-gray-900 ml-2">Follow our journey</span>
            <div className="flex gap-3">
                <a href={APP_CONFIG.socialMedia.instagram} className="w-10 h-10 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-md active:scale-95 transition-transform">
                    <Instagram size={20} />
                </a>
                <a href={APP_CONFIG.socialMedia.facebook} className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md active:scale-95 transition-transform">
                    <Facebook size={20} />
                </a>
            </div>
          </div>
      </div>

      {/* 5. FAQs Accordion */}
      <div className="px-4 mt-8">
        <h3 className="text-lg font-black text-gray-900 mb-4 px-2">Common Questions</h3>
        <div className="space-y-3">
            {faqs.map((faq, index) => (
                <details key={index} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between p-5 text-gray-900">
                        <span className="text-sm font-bold">{faq.question}</span>
                        <span className="text-gray-400 transition group-open:rotate-90">
                            <ChevronRight size={20} />
                        </span>
                    </summary>
                    <div className="px-5 pb-5 pt-0">
                        <p className="text-xs font-medium text-gray-500 leading-relaxed bg-gray-50 p-3 rounded-xl">
                            {faq.answer}
                        </p>
                    </div>
                </details>
            ))}
        </div>
      </div>


    </div>
  );
};

export default ContactPage;