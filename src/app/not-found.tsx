/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, ArrowLeft, Search, FileQuestion } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary/5 via-white to-brand-primary/10 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.8 
          }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-brand-primary/20 rounded-full blur-3xl" />
            <div className="relative bg-white rounded-full p-8 shadow-2xl border-4 border-brand-primary/20">
              <FileQuestion className="w-24 h-24 text-brand-primary" strokeWidth={1.5} />
            </div>
          </div>
        </motion.div>

        {/* 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-[120px] sm:text-[150px] font-bold text-brand-primary leading-none mb-4 tracking-tight">
            404
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-brand-primary to-transparent mx-auto mb-6" />
        </motion.div>

        {/* Main Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-heading-lg sm:text-display-sm font-bold text-gray-900 mb-4">
            Halaman Sedang Dalam Pengembangan
          </h2>
          <p className="text-body-lg text-gray-600 max-w-md mx-auto leading-relaxed">
            Mohon maaf, halaman yang Anda cari sedang kami kembangkan untuk memberikan pengalaman terbaik.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-brand-primary hover:bg-brand-primary-dark text-white px-8 py-6 text-body-lg rounded-xl shadow-lg hover:shadow-xl transition-all group min-w-[200px]"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Kembali ke Beranda
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-8 py-6 text-body-lg rounded-xl transition-all group min-w-[200px]"
          >
            <Link href="/kegiatan" className="flex items-center gap-2">
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Lihat Kegiatan
            </Link>
          </Button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-body-sm text-gray-500">
            Butuh bantuan?{' '}
            <Link
              href="/kontak"
              className="text-brand-primary hover:text-brand-primary-dark font-semibold underline underline-offset-4"
            >
              Hubungi Kami
            </Link>
          </p>
        </motion.div>

        {/* Floating Animation Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-10 w-72 h-72 bg-brand-primary/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              x: [0, -10, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl"
          />
        </div>
      </div>
    </div>
  )
}
