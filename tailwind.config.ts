import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom colors for the new theme
				neon: {
					yellow: '#ECD06F',
					teal: '#49c5b6',
					orange: '#FF652F',
					purple: '#9b87f5',
				},
				climbup: {
					blue: '#6a98f0',
					purple: '#9b87f5',
					orange: '#f97316',
					'soft-purple': '#e5deff',
					'soft-peach': '#fde1d3',
					'soft-blue': '#d3e4fd',
				},
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				display: ['Orbitron', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-out': {
					'0%': {
						opacity: '1',
						transform: 'translateY(0)'
					},
					'100%': {
						opacity: '0',
						transform: 'translateY(10px)'
					}
				},
				blob: {
					'0%': {
						transform: 'translate(0px, 0px) scale(1)'
					},
					'33%': {
						transform: 'translate(30px, -50px) scale(1.1)'
					},
					'66%': {
						transform: 'translate(-20px, 20px) scale(0.9)'
					},
					'100%': {
						transform: 'translate(0px, 0px) scale(1)'
					}
				},
				'glow-pulse': {
					'0%, 100%': {
						filter: 'brightness(1) drop-shadow(0 0 5px currentColor)'
					},
					'50%': {
						filter: 'brightness(1.2) drop-shadow(0 0 15px currentColor)'
					}
				},
				'neon-trace': {
					'0%': {
						backgroundPosition: '0% 0%',
						opacity: '0.5',
					},
					'50%': {
						backgroundPosition: '100% 0%',
						opacity: '1',
					},
					'100%': {
						backgroundPosition: '0% 0%',
						opacity: '0.5',
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'fade-out': 'fade-out 0.3s ease-out',
				'blob': 'blob 7s infinite',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'neon-trace': 'neon-trace 3s linear infinite',
			},
			backgroundImage: {
				'gradient-hero': 'linear-gradient(135deg, #d3e4fd 0%, #e5deff 100%)',
				'gradient-card': 'linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(155,135,245,0.2) 100%)',
				'gradient-cta': 'linear-gradient(135deg, #6a98f0 0%, #9b87f5 100%)',
				'dark-texture': 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'4\' height=\'4\' viewBox=\'0 0 4 4\'%3E%3Cpath fill=\'%23ffffff\' fill-opacity=\'0.05\' d=\'M1 3h1v1H1V3zm2-2h1v1H3V1z\'%3E%3C/path%3E%3C/svg%3E")',
			},
			transitionDelay: {
				'2000': '2000ms',
				'3000': '3000ms',
				'4000': '4000ms',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
