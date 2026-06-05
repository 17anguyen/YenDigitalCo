'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const links = [
  { href: '/',           label: 'Home'      },
  { href: '/video',      label: 'Video'     },
  { href: '/photos',     label: 'Photos'    },
  { href: '/retainers',  label: 'Retainers' },
  { href: '/contact',    label: 'Contact'   },
]

export default function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav>
        <Link href="/" className="logo" onClick={() => window.scrollTo(0, 0)}>
          Yê<span>n</span>
        </Link>

        {/* Desktop links */}
        <ul className="nav-links">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={pathname === href ? 'active' : ''}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger button — mobile only */}
        <button
          className="nav-burger"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          <span className={`burger-line ${open ? 'open' : ''}`} />
          <span className={`burger-line ${open ? 'open' : ''}`} />
          <span className={`burger-line ${open ? 'open' : ''}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="mobile-menu" onClick={() => setOpen(false)}>
          <div className="mobile-menu-inner" onClick={e => e.stopPropagation()}>
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`mobile-link ${pathname === href ? 'active' : ''}`}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
