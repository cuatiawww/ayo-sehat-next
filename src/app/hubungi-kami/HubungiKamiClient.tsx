'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  User,
  Building2
} from 'lucide-react'
import CustomBreadcrumb from '@/components/CustomBreadcrump'
import { Button } from '@/components/ui/button'

export default function HubungiKamiClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    alert('Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    })
    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telepon',
      content: '(021) 5223002',
      subContent: 'Senin - Jumat: 08:00 - 16:00 WIB',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'kontak@kemkes.go.id',
      subContent: 'Kami akan membalas dalam 1x24 jam',
    },
    {
      icon: MapPin,
      title: 'Alamat',
      content: 'Jl. H.R. Rasuna Said Blok X.5 Kav. 4-9',
      subContent: 'Jakarta Selatan 12950',
    },
    {
      icon: Clock,
      title: 'Jam Operasional',
      content: 'Senin - Jumat: 08:00 - 16:00 WIB',
      subContent: 'Sabtu & Minggu: Tutup',
    },
  ]

  const subjects = [
    'Informasi Umum',
    'Layanan Kesehatan',
    'Program Vaksinasi',
    'Kampanye Kesehatan',
    'Kemitraan',
    'Pengaduan',
    'Lainnya',
  ]

  return (
    <>
      <div className="min-h-screen bg-white">
        <CustomBreadcrumb currentPage="Hubungi Kami" />

        {/* Hero Section */}
        <section className="relative bg-brand-gradient py-12 lg:py-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="font-bold text-display-sm sm:text-display-md lg:text-display-lg leading-tight text-white mb-4">
                Hubungi Kami
              </h1>
              <p className="text-body-md lg:text-body-lg leading-relaxed text-white/95">
                Kami siap membantu Anda dengan informasi kesehatan dan layanan yang Anda butuhkan. 
                Jangan ragu untuk menghubungi kami melalui formulir atau kontak di bawah ini.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="section-padding-lg bg-gray-50">
          <div className="container-custom">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4">
                    <info.icon className="w-6 h-6 text-brand-primary" />
                  </div>
                  <h3 className="text-body-lg font-semibold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-body-md text-brand-primary font-medium mb-1">
                    {info.content}
                  </p>
                  <p className="text-body-sm text-gray-600">
                    {info.subContent}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Form & Map Section */}
        <section className="section-padding-lg bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-8">
                  <h2 className="text-heading-lg sm:text-display-sm text-brand-primary font-bold mb-3">
                    Kirim Pesan
                  </h2>
                  <p className="text-body-md text-gray-600">
                    Isi formulir di bawah ini dan kami akan segera menghubungi Anda
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-body-md font-medium text-gray-700 mb-2">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all outline-none"
                        placeholder="Masukkan nama lengkap Anda"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-body-md font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all outline-none"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-body-md font-medium text-gray-700 mb-2">
                        Nomor Telepon
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all outline-none"
                          placeholder="08xx xxxx xxxx"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-body-md font-medium text-gray-700 mb-2">
                      Subjek <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all outline-none appearance-none bg-white"
                      >
                        <option value="">Pilih subjek pesan</option>
                        {subjects.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-body-md font-medium text-gray-700 mb-2">
                      Pesan <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all outline-none resize-none"
                        placeholder="Tulis pesan Anda di sini..."
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary-dark text-white px-8 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Kirim Pesan
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>

              {/* Map & Additional Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Map */}
                <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2087516369934!2d106.83214931476891!3d-6.2383549954730215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e4471e2c85%3A0x7d52b1b5b5b5b5b5!2sKementerian%20Kesehatan%20Republik%20Indonesia!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi Kementerian Kesehatan RI"
                  />
                </div>

                {/* FAQ Links */}
                <div className="bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-2xl p-6 text-white">
                  <h3 className="text-heading-sm font-bold mb-3">
                    Pertanyaan Umum?
                  </h3>
                  <p className="text-body-sm mb-4 text-white/90">
                    Mungkin pertanyaan Anda sudah terjawab di halaman FAQ kami
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full bg-white text-brand-primary border-white hover:bg-white/90"
                  >
                    <a href="/faq">Lihat FAQ</a>
                  </Button>
                </div>

                {/* Social Media */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-heading-sm font-bold text-gray-900 mb-3">
                    Ikuti Kami
                  </h3>
                  <p className="text-body-sm text-gray-600 mb-4">
                    Dapatkan update terbaru tentang kesehatan
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="https://facebook.com/kemenkes.ri"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-brand-primary hover:text-brand-primary transition-all"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a
                      href="https://twitter.com/kemenkes_ri"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-brand-primary hover:text-brand-primary transition-all"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a
                      href="https://instagram.com/kemenkes_ri"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-brand-primary hover:text-brand-primary transition-all"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
