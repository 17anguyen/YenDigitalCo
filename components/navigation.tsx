'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/',           label: 'Home'      },
  { href: '/video',      label: 'Video'     },
  { href: '/photos',     label: 'Photos'    },
  { href: '/retainers',  label: 'Retainers' },
  { href: '/contact',    label: 'Contact'   },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav>
      <Link href="/" className="logo" onClick={() => window.scrollTo(0, 0)}>
        Yê<span>n</span>
      </Link>
      <ul className="nav-links">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className={pathname === href ? 'active' : ''}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
