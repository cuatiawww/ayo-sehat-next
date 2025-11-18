'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface LifecycleStage {
  id: number
  name: string
  age: string
  slug: string
  image: string
  alt: string
  width: number
  height: number
}

interface LifecycleStageCardProps {
  stage: LifecycleStage
  index: number
  isSelected: boolean
  onClick: () => void
}

export default function LifecycleStageCard({
  stage,
  index,
  isSelected,
  onClick,
}: LifecycleStageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-pointer outline-none"
      onClick={onClick}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      {/* Container utama – hanya untuk layout */}
      <div className="relative flex flex-col items-center">
        {/* Gambar + Efek Scale  */}
        <motion.div
          animate={{
            scale: isSelected ? 1.12 : 0.94,
            y: isSelected ? -16 : 0,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`
            relative w-full aspect-square rounded-xl sm:rounded-2xl lg:rounded-3xl 
            overflow-hidden shadow-xl transition-shadow duration-500
            ${isSelected ? 'z-30 shadow-[0_20px_50px_rgba(24,179,171,0.4)]' : 'z-10'}
          `}
        >
          <Image
            src={stage.image || '/placeholder.png'}
            alt={stage.alt || stage.name}
            width={stage.width || 400}
            height={stage.height || 400}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            unoptimized
          />

          {/* Gradient overlay */}
          <div className={`
            absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent 
            transition-opacity duration-500
            ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
          `} />

          {/* Border kuning glow */}
          <div className={`
            absolute inset-0 rounded-xl sm:rounded-2xl lg:rounded-3xl border-4 border-transparent 
            transition-all duration-500 pointer-events-none
            ${isSelected ? 'border-brand-accent shadow-[0_0_40px_rgba(213,221,35,0.7)]' : ''}
            ${!isSelected ? 'group-hover:border-brand-accent group-hover:shadow-[0_0_25px_rgba(213,221,35,0.5)]' : ''}
          `} />
        </motion.div>

        {/* LABEL KUNING */}
        <div
          className={`
            absolute bottom-[-14px] sm:bottom-[-18px] lg:bottom-[-24px] xl:bottom-[-28px]
            left-1/2 -translate-x-1/2 z-40
            bg-brand-accent rounded-2xl px-5 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5
            min-w-[140px] sm:min-w-[160px] lg:min-w-[200px] xl:min-w-[240px]
            flex flex-col items-center justify-center
            shadow-2xl transition-all duration-400
            ${isSelected 
              ? 'bg-brand-accent-dark scale-110 shadow-[0_15px_40px_rgba(213,221,35,0.6)] -translate-y-2' 
              : 'group-hover:bg-brand-accent-dark group-hover:scale-105 group-hover:shadow-[0_12px_30px_rgba(213,221,35,0.5)]'
            }
          `}
        >
          <p className={`
            font-bold text-[10px] sm:text-[13px] lg:text-[17px] xl:text-[22px] 
            leading-none text-gray-900 text-center tracking-tight
            ${isSelected ? 'drop-shadow-lg' : ''}
          `}>
            {stage.name}
          </p>
          <p className={`
            text-[8px] sm:text-[10px] lg:text-[13px] xl:text-[16px] 
            font-semibold text-gray-800 mt-1 leading-none
            ${isSelected ? 'text-gray-900 font-black' : ''}
          `}>
            {stage.age}
          </p>
        </div>
      </div>
    </motion.div>
  )
}