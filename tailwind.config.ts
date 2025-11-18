/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1600px'
  		}
  	},
  	extend: {
  		colors: {
  			brand: {
  				primary: '#18b3ab',
  				'primary-dark': '#15a098',
  				'primary-light': '#1cc4bb',
  				'primary-hover': '#13918a',
  				accent: '#d5dd23',
  				'accent-dark': '#c5cd13',
  				'accent-hover': '#bdc312'
  			},
  			gray: {
  				'50': '#fafafa',
  				'100': '#f5f5f5',
  				'200': '#e5e5e5',
  				'300': '#d4d4d4',
  				'400': '#a3a3a3',
  				'500': '#737373',
  				'600': '#525252',
  				'700': '#404040',
  				'800': '#262626',
  				'900': '#171717'
  			},
  			success: '#22c55e',
  			warning: '#f59e0b',
  			error: '#ef4444',
  			info: '#3b82f6',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			poppins: [
  				'var(--font-poppins)',
  				'sans-serif'
  			],
  			sans: [
  				'var(--font-poppins)',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			'display-lg': [
  				'44px',
  				{
  					lineHeight: '1.2',
  					fontWeight: '600'
  				}
  			],
  			'display-md': [
  				'36px',
  				{
  					lineHeight: '1.2',
  					fontWeight: '600'
  				}
  			],
  			'display-sm': [
  				'28px',
  				{
  					lineHeight: '1.3',
  					fontWeight: '600'
  				}
  			],
  			'heading-lg': [
  				'26px',
  				{
  					lineHeight: '1.3',
  					fontWeight: '500'
  				}
  			],
  			'heading-md': [
  				'20px',
  				{
  					lineHeight: '1.4',
  					fontWeight: '500'
  				}
  			],
  			'heading-sm': [
  				'18px',
  				{
  					lineHeight: '1.4',
  					fontWeight: '500'
  				}
  			],
  			'body-lg': [
  				'16px',
  				{
  					lineHeight: '1.6',
  					fontWeight: '400'
  				}
  			],
  			'body-md': [
  				'15px',
  				{
  					lineHeight: '1.6',
  					fontWeight: '400'
  				}
  			],
  			'body-sm': [
  				'14px',
  				{
  					lineHeight: '1.5',
  					fontWeight: '400'
  				}
  			],
  			'body-xs': [
  				'13px',
  				{
  					lineHeight: '1.5',
  					fontWeight: '400'
  				}
  			],
  			'caption': [
  				'12px',
  				{
  					lineHeight: '1.4',
  					fontWeight: '400'
  				}
  			],
  			'tiny': [
  				'11px',
  				{
  					lineHeight: '1.4',
  					fontWeight: '400'
  				}
  			]
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem',
  			'128': '32rem'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			'xl': '10px',
  			'2xl': '16px'
  		},
  		boxShadow: {
  			'card': '0 4px 16px rgba(24, 179, 171, 0.12)',
  			'card-hover': '0 8px 24px rgba(24, 179, 171, 0.18)',
  			'button': '0 2px 8px rgba(24, 179, 171, 0.25)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
  			'fade-in': {
  				from: {
  					opacity: '0'
  				},
  				to: {
  					opacity: '1'
  				}
  			},
  			'slide-up': {
  				from: {
  					transform: 'translateY(10px)',
  					opacity: '0'
  				},
  				to: {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in': 'fade-in 0.5s ease-out',
  			'slide-up': 'slide-up 0.5s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

export default config