import React, { useState } from 'react';

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <section className="py-16 bg-brand-white border-t border-brand-pale" id="contact">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-forest rounded-2xl p-8 lg:p-12 text-brand-white reveal-item">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Information */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">College Office</h2>
              <p className="text-brand-light text-sm leading-relaxed">
                Contact the administrative office for student records, certifications, and institutional inquiries.
              </p>

              <div className="space-y-3 pt-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-brand-sage flex items-center justify-center shrink-0">📍</span>
                  <span>
                    <a
                      href="https://maps.app.goo.gl/UMsXzzu46QNMNwcB8"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline"
                    >
                      J/Kopay Christian College, Kopay, Jaffna, Sri Lanka
                    </a>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-brand-sage flex items-center justify-center shrink-0">📞</span>
                  <span>021 223 0040</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-brand-sage flex items-center justify-center shrink-0">✉️</span>
                  <span>kcckopay@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-7 bg-brand-white text-slate-800 p-6 rounded-xl border border-brand-pale shadow-sm">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Name"
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-brand-forest text-sm bg-brand-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-brand-forest text-sm bg-brand-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Inquiry topic"
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-brand-forest text-sm bg-brand-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Message</label>
                  <textarea
                    rows="3"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-brand-forest text-sm bg-brand-white transition-colors"
                  />
                </div>

                {formSubmitted && (
                  <div className="p-3 bg-brand-light text-brand-forest text-xs font-semibold rounded-lg border border-brand-pale text-center transition-all">
                    Your message has been received by the college administration.
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-brand-forest hover:bg-brand-forestHover text-brand-white font-semibold py-2.5 rounded-lg transition-all duration-200 text-sm shadow-sm active:translate-y-0 hover:-translate-y-0.5 cursor-pointer"
                >
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
