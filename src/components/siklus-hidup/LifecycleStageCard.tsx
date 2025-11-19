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

        {/* LABEL KUNING - RESPONSIVE */}
        <div
          className={`
            absolute bottom-[-8px] xs:bottom-[-10px] sm:bottom-[-14px] lg:bottom-[-18px] xl:bottom-[-22px]
            left-1/2 -translate-x-1/2 z-40
            bg-brand-accent rounded-lg sm:rounded-xl lg:rounded-2xl 
            px-2 xs:px-3 sm:px-4 lg:px-6 xl:px-8
            py-1.5 xs:py-2 sm:py-2.5 lg:py-3 xl:py-4
            min-w-[80px] xs:min-w-[100px] sm:min-w-[130px] lg:min-w-[180px] xl:min-w-[220px]
            flex flex-col items-center justify-center
            shadow-lg sm:shadow-xl lg:shadow-2xl transition-all duration-400
            ${isSelected 
              ? 'bg-brand-accent-dark scale-105 sm:scale-110 shadow-[0_8px_25px_rgba(213,221,35,0.6)] sm:shadow-[0_15px_40px_rgba(213,221,35,0.6)] -translate-y-1 sm:-translate-y-2' 
              : 'group-hover:bg-brand-accent-dark group-hover:scale-[1.02] sm:group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgba(213,221,35,0.5)] sm:group-hover:shadow-[0_12px_30px_rgba(213,221,35,0.5)]'
            }
          `}
        >
          {/* Name */}
          <p className={`
            font-bold text-[8px] xs:text-[9px] sm:text-[11px] md:text-[13px] lg:text-[15px] xl:text-[18px] 
            leading-tight text-gray-900 text-center tracking-tight
            ${isSelected ? 'drop-shadow-md sm:drop-shadow-lg' : ''}
          `}>
            {stage.name}
          </p>
          
          {/* Age */}
          <p className={`
            text-[6px] xs:text-[7px] sm:text-[9px] md:text-[10px] lg:text-[12px] xl:text-[14px] 
            font-semibold text-gray-800 mt-0.5 sm:mt-1 leading-tight
            ${isSelected ? 'text-gray-900 font-bold sm:font-black' : ''}
          `}>
            {stage.age}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
