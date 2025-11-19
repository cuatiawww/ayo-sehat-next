'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import CustomBreadcrumb from '@/components/CustomBreadcrump'
import Link from 'next/link'

type RegistrationType = 'tenaga-kesehatan' | 'tenaga-pendidikan' | 'masyarakat-umum'

export default function RegisterClient() {
  // State untuk form
  const [step, setStep] = useState<'type' | 'details'>('type')
  const [registrationType, setRegistrationType] = useState<RegistrationType | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    province: '',
    city: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Data untuk dropdown provinsi dan kota
  const provinces = [
    'DKI Jakarta',
    'Jawa Barat',
    'Jawa Tengah',
    'Jawa Timur',
    'Banten',
    'Bali',
    'Sumatera Utara',
    'Sumatera Barat',
    'Sumatera Selatan',
    'Kalimantan Timur',
  ]

  const cities = {
    'DKI Jakarta': [
      'Jakarta Pusat',
      'Jakarta Utara',
      'Jakarta Selatan',
      'Jakarta Timur',
      'Jakarta Barat',
    ],
    'Jawa Barat': ['Bandung', 'Bekasi', 'Depok', 'Bogor', 'Cimahi'],
    'Jawa Tengah': ['Semarang', 'Solo', 'Magelang', 'Salatiga', 'Pekalongan'],
  }

  const registrationTypes = [
    {
      id: 'tenaga-kesehatan' as RegistrationType,
      title: 'Tenaga Kesehatan',
      icon: (
        <svg
          className="w-16 h-16 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
        </svg>
      ),
    },
    {
      id: 'tenaga-pendidikan' as RegistrationType,
      title: 'Tenaga Pendidikan',
      icon: (
        <svg
          className="w-16 h-16 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
        </svg>
      ),
    },
    {
      id: 'masyarakat-umum' as RegistrationType,
      title: 'Masyarakat Umum',
      icon: (
        <svg
          className="w-16 h-16 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      ),
    },
  ]

  const handleTypeSelect = (type: RegistrationType) => {
    setRegistrationType(type)
    setStep('details')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Reset city jika provinsi berubah
    if (name === 'province') {
      setFormData((prev) => ({
        ...prev,
        city: '',
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulasi proses registrasi
    setTimeout(() => {
      console.log('Registration data:', {
        registrationType,
        ...formData,
      })
      setIsLoading(false)
      // Tambahkan logic registrasi Anda di sini
    }, 1500)
  }

  const handleBack = () => {
    setStep('type')
    setRegistrationType(null)
  }

  // JSON-LD untuk SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Daftar - Portal Ayo Sehat',
    description:
      'Daftar untuk mengakses portal eksklusif Tenaga Kesehatan, Tenaga Pendidikan, atau Masyarakat Umum di Portal Ayo Sehat Kemenkes.',
    url: 'https://staging-ayo-sehat-v2.vercel.app/register',
  }

//   const heroImage =
//     'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200'

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gray-50">
        <CustomBreadcrumb currentPage="Daftar" />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-brand-primary to-brand-primary-dark text-white py-12 lg:py-16 overflow-hidden">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-heading-lg sm:text-display-sm lg:text-display-md font-bold mb-4">
                  Portal Ayo Sehat
                </h1>
                <p className="text-body-lg sm:text-heading-sm leading-relaxed">
                  Silakan masuk untuk mengakses portal eksklusif Tenaga
                  Kesehatan, menemukan informasi terbaru dan sumber daya
                  edukasi profesional.
                </p>
              </motion.div>

              {/* Right Image */}
              {/* <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="hidden lg:block"
              >
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={heroImage}
                    alt="Portal Ayo Sehat"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div> */}
            </div>
          </div>
        </section>

        {/* Registration Form Section */}
        <section className="section-padding-lg">
          <div className="container-custom">
            {/* Step 1: Pilih Jenis Pendaftaran */}
            {step === 'type' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="text-center mb-12">
                  <h2 className="text-heading-lg sm:text-heading-xl font-bold text-gray-800 mb-3">
                    Pilih Jenis Pendaftaran
                  </h2>
                  <p className="text-body-md text-gray-600">
                    Pilih kategori yang sesuai dengan status Anda
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {registrationTypes.map((type, index) => (
                    <motion.button
                      key={type.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onClick={() => handleTypeSelect(type.id)}
                      className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
                        registrationType === type.id
                          ? 'border-brand-primary'
                          : 'border-transparent hover:border-brand-primary'
                      }`}
                    >
                      {/* Icon */}
                      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        {type.icon}
                      </div>

                      {/* Title */}
                      <h3 className="text-heading-sm font-bold text-gray-800 mb-2 text-center">
                        {type.title}
                      </h3>

                      {/* Radio indicator */}
                      <div className="flex justify-center mt-4">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            registrationType === type.id
                              ? 'border-brand-primary bg-brand-primary'
                              : 'border-gray-300'
                          }`}
                        >
                          {registrationType === type.id && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Next Button */}
                {registrationType && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center mt-8"
                  >
                    <button
                      onClick={() => setStep('details')}
                      className="bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-3 px-12 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-body-md"
                    >
                      Selanjutnya
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 2: Detail Pendaftaran */}
            {step === 'details' && registrationType && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  {/* Header with back button */}
                  <div className="flex items-center mb-6">
                    <button
                      onClick={handleBack}
                      className="mr-4 p-2 text-gray-500 hover:text-brand-primary transition-colors"
                      aria-label="Kembali"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                      </svg>
                    </button>
                    <div>
                      <h2 className="text-heading-md font-bold text-gray-800">
                        Detail Pendaftaran
                      </h2>
                      <p className="text-body-sm text-gray-600 mt-1">
                        Jenis Pendaftaran:{' '}
                        <span className="text-brand-primary font-medium">
                          {
                            registrationTypes.find((t) => t.id === registrationType)
                              ?.title
                          }
                        </span>
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-body-md font-medium text-gray-700 mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Masukan email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all outline-none text-body-md"
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-body-md font-medium text-gray-700 mb-2"
                      >
                        Kata Sandi
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="••••••••••"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all outline-none text-body-md pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-brand-primary transition-colors"
                          aria-label="Toggle password visibility"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            {showPassword ? (
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                              />
                            ) : (
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                              />
                            )}
                            {!showPassword && (
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            )}
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Nama Lengkap */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-body-md font-medium text-gray-700 mb-2"
                      >
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Masukan nama lengkap"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all outline-none text-body-md"
                      />
                    </div>

                    {/* Nomor Telepon */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-body-md font-medium text-gray-700 mb-2"
                      >
                        Nomor Telepon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Masukan nomor telepon atau WhatsApp"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all outline-none text-body-md"
                      />
                    </div>

                    {/* Provinsi Domisili */}
                    <div>
                      <label
                        htmlFor="province"
                        className="block text-body-md font-medium text-gray-700 mb-2"
                      >
                        Provinsi Domisili
                      </label>
                      <select
                        id="province"
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all outline-none text-body-md bg-white cursor-pointer"
                      >
                        <option value="">Pilih provinsi</option>
                        {provinces.map((province) => (
                          <option key={province} value={province}>
                            {province}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Kabupaten/Kota */}
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-body-md font-medium text-gray-700 mb-2"
                      >
                        Kabupaten/Kota
                      </label>
                      <select
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        disabled={!formData.province}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all outline-none text-body-md bg-white cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
                      >
                        <option value="">Pilih kabupaten/kota</option>
                        {formData.province &&
                          cities[formData.province as keyof typeof cities]?.map(
                            (city) => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            )
                          )}
                      </select>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-body-md mt-6"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Memproses...
                        </span>
                      ) : (
                        'Daftar'
                      )}
                    </button>

                    {/* Login Link */}
                    <p className="text-center text-body-sm text-gray-600 mt-4">
                      Sudah punya akun?{' '}
                      <Link
                        href="/login"
                        className="text-brand-primary hover:text-brand-primary-dark font-medium underline"
                      >
                        Login di sini
                      </Link>
                    </p>
                  </form>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
