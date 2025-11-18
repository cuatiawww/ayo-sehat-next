'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  id: number
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: 'Apa Itu Mitra Kementerian Kesehatan?',
    answer:
      'Program kemitraan Kementerian Kesehatan adalah bentuk kolaborasi antara Kementerian Kesehatan dengan berbagai pihak seperti organisasi, perusahaan, dan institusi untuk bersama-sama meningkatkan derajat kesehatan masyarakat Indonesia melalui program-program kesehatan yang inovatif dan berkelanjutan.',
  },
  {
    id: 2,
    question: 'Apa manfaat kegiatan Mitra Kementerian Kesehatan?',
    answer:
      'Manfaat kegiatan Mitra Kementerian Kesehatan meliputi: (1) Memperluas jangkauan program kesehatan ke seluruh Indonesia, (2) Meningkatkan kualitas layanan kesehatan melalui kolaborasi sumber daya, (3) Mendorong inovasi dalam pelayanan kesehatan, (4) Membangun kesadaran masyarakat tentang pentingnya kesehatan, dan (5) Menciptakan dampak sosial yang berkelanjutan untuk Indonesia yang lebih sehat.',
  },
]

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(null)

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section className="bg-white section-padding-lg">
      <div className="container-custom">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-heading-lg sm:text-display-sm lg:text-display-md text-brand-primary font-bold mb-4">
            FAQ
          </h2>
          <p className="text-body-md sm:text-body-lg text-gray-600 max-w-2xl mx-auto">
            Berikut beberapa pertanyaan yang sering diajukan terkait dengan
            Mitra Kementerian Kesehatan
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="text-body-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-brand-primary flex-shrink-0 transition-transform duration-300 ${
                    openId === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-body-md text-gray-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
