'use client'

import Link from 'next/link'
import { Home, ChevronRight } from 'lucide-react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

interface CustomBreadcrumbProps {
  items?: Array<{
    label: string
    href?: string
  }>
  currentPage: string
}

export default function CustomBreadcrumb({
  items = [],
  currentPage,
}: CustomBreadcrumbProps) {
  return (
    <div className="relative bg-gradient-to-b from-gray-50 to-white py-3 sm:py-4 lg:py-5 border-b border-gray-100">
      <div className="container-custom">
        <Breadcrumb>
          <BreadcrumbList className="flex-wrap">
            {/* Home */}
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href="/"
                  className="flex items-center gap-1.5 text-gray-600 hover:text-brand-primary transition-colors group"
                >
                  <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-body-xs sm:text-body-sm">Beranda</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {/* Dynamic items */}
            {items.map((item, index) => (
              <div key={index} className="flex items-center">
                <BreadcrumbSeparator>
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  {item.href ? (
                    <BreadcrumbLink asChild>
                      <Link
                        href={item.href}
                        className="text-body-xs sm:text-body-sm text-gray-600 hover:text-brand-primary transition-colors"
                      >
                        {item.label}
                      </Link>
                    </BreadcrumbLink>
                  ) : (
                    <span className="text-body-xs sm:text-body-sm text-gray-600">
                      {item.label}
                    </span>
                  )}
                </BreadcrumbItem>
              </div>
            ))}

            {/* Current Page */}
            <BreadcrumbSeparator>
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-body-xs sm:text-body-sm text-brand-primary font-medium">
                {currentPage}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  )
}
