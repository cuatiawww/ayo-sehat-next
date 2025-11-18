import Link from 'next/link'
import { FileX } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-primary/10 mb-6">
          <FileX className="w-10 h-10 text-brand-primary" />
        </div>
        
        <h1 className="text-display-sm sm:text-display-md text-gray-900 font-bold mb-4">
          Topik Tidak Ditemukan
        </h1>
        
        <p className="text-body-md sm:text-body-lg text-gray-600 mb-8">
          Maaf, topik kesehatan yang Anda cari tidak ditemukan atau belum tersedia.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/page/topik-kesehatan"
            className="inline-flex items-center justify-center px-6 py-3 bg-brand-primary text-white rounded-xl hover:bg-brand-primary-dark transition-colors font-medium"
          >
            Kembali ke Topik Kesehatan
          </Link>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-brand-primary hover:text-brand-primary transition-colors font-medium"
          >
            Ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}