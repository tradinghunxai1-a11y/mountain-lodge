import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageCircle } from 'lucide-react';
import { hotelData, getWhatsAppUrl } from '../data/hotelData';

export const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!phone.trim() || phone.trim().length < 7) {
      nextErrors.phone = 'Please enter a valid contact phone number.';
    }
    if (!message.trim() || message.trim().length < 10) {
      nextErrors.message = 'Please enter a message of at least 10 characters.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  const whatsappDirectLink = getWhatsAppUrl(
    `Assalam-o-Alaikum Mountain Lodge Skardu,\nName: ${name || 'Guest'}\nEmail: ${email || 'N/A'}\nPhone: ${phone || 'N/A'}\nInquiry: ${message || 'I would like to inquire about a stay.'}`
  );

  if (isSubmitted) {
    return (
      <div
        className="bg-white rounded-2xl p-6 sm:p-8 border border-[#DCE2D5] space-y-5"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-3.5">
          <CheckCircle2 className="w-6 h-6 text-[#3D6135] shrink-0 mt-0.5" />
          <div>
            <h3 className="font-display text-2xl font-semibold text-[#1B2618]">
              Inquiry Prepared Locally
            </h3>
            <p className="text-sm text-[#4A5745] mt-1 leading-relaxed">
              Thank you, <span className="font-semibold text-[#1B2618]">{name}</span>. Your message
              has been validated and recorded in this browser preview. Because no automated email
              server is connected yet, you can send this exact inquiry directly to Mountain Lodge
              Skardu via WhatsApp or telephone below.
            </p>
          </div>
        </div>

        <div className="bg-[#F6F7F2] rounded-xl p-4 border border-[#E2E6DC] text-xs text-[#3B4738] space-y-1.5">
          <div>
            <span className="font-semibold">Guest:</span> {name} ({email} · {phone})
          </div>
          <div>
            <span className="font-semibold">Message:</span> {message}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={whatsappDirectLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#3D6135] hover:bg-[#2F4C28] text-white text-xs sm:text-sm font-medium inline-flex items-center gap-2 transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open in WhatsApp ({hotelData.phone})</span>
          </a>
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setName('');
              setEmail('');
              setPhone('');
              setMessage('');
            }}
            className="px-4 py-2.5 rounded-xl border border-[#C5D0BC] hover:bg-[#ECEFE6] text-[#1B2618] text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
          >
            Write Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E6DC] space-y-5"
    >
      <div>
        <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#1B2618]">
          Send an Inquiry
        </h3>
        <p className="text-sm text-[#54614F] mt-1">
          Have a question about room availability, group stays, or arrival along Satpara Road? Fill
          out the form below or reach us directly at{' '}
          <span className="font-medium text-[#1B2618] tabular-nums">{hotelData.phone}</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-semibold text-[#2E3B2B] mb-1.5"
          >
            Full Name *
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
            placeholder="e.g. Tariq Mahmood"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#1B2618] bg-[#FAFBF8] focus:bg-white focus:outline-2 focus:outline-[#3D6135] transition-colors ${
              errors.name ? 'border-red-500' : 'border-[#D5DDD0]'
            }`}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'err-contact-name' : undefined}
          />
          {errors.name && (
            <p id="err-contact-name" className="mt-1 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-phone"
            className="block text-xs font-semibold text-[#2E3B2B] mb-1.5"
          >
            Phone / WhatsApp Number *
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) setErrors({ ...errors, phone: '' });
            }}
            placeholder="e.g. +92 300 1234567"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#1B2618] bg-[#FAFBF8] focus:bg-white focus:outline-2 focus:outline-[#3D6135] transition-colors tabular-nums ${
              errors.phone ? 'border-red-500' : 'border-[#D5DDD0]'
            }`}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'err-contact-phone' : undefined}
          />
          {errors.phone && (
            <p id="err-contact-phone" className="mt-1 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block text-xs font-semibold text-[#2E3B2B] mb-1.5"
        >
          Email Address *
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors({ ...errors, email: '' });
          }}
          placeholder="you@example.com"
          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#1B2618] bg-[#FAFBF8] focus:bg-white focus:outline-2 focus:outline-[#3D6135] transition-colors ${
            errors.email ? 'border-red-500' : 'border-[#D5DDD0]'
          }`}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'err-contact-email' : undefined}
        />
        {errors.email && (
          <p id="err-contact-email" className="mt-1 text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs font-semibold text-[#2E3B2B] mb-1.5"
        >
          Your Message or Stay Inquiry *
        </label>
        <textarea
          id="contact-message"
          rows={4}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors({ ...errors, message: '' });
          }}
          placeholder="Let us know your preferred check-in dates, number of guests, or any questions..."
          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-[#1B2618] bg-[#FAFBF8] focus:bg-white focus:outline-2 focus:outline-[#3D6135] transition-colors ${
            errors.message ? 'border-red-500' : 'border-[#D5DDD0]'
          }`}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'err-contact-message' : undefined}
        />
        {errors.message && (
          <p id="err-contact-message" className="mt-1 text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.message}</span>
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 rounded-xl bg-[#3D6135] hover:bg-[#2F4C28] disabled:opacity-60 text-white font-medium text-sm inline-flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
        >
          <Send className="w-4 h-4" />
          <span>{isSubmitting ? 'Validating Inquiry...' : 'Submit Inquiry'}</span>
        </button>

        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-[#3D6135] hover:text-[#2F4C28] underline underline-offset-4"
        >
          Prefer instant chat? Message on WhatsApp →
        </a>
      </div>
    </form>
  );
};
