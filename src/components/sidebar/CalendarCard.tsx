'use client'

import { motion } from 'framer-motion'
import CustomCalendar from '@/components/CustomCalendar'

interface CalendarCardProps {
  delay?: number
}

export default function CalendarCard({ delay = 0.3 }: CalendarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <h3 className="text-body-lg sm:text-heading-sm font-bold text-brand-primary mb-1">
        Kalender Kesehatan
      </h3>
      <p className="text-body-sm sm:text-body-md text-gray-600 mb-3 sm:mb-4 leading-relaxed">
        Informasi terkait dengan hari besar dan agenda kesehatan satu tahun
        penuh
      </p>
      <CustomCalendar />
    </motion.div>
  )
}
