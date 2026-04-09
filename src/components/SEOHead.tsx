// SEOHead.tsx
import { useEffect } from 'react'

interface SEOHeadProps {
  title: string; description: string; canonicalPath?: string
  keywords?: string[]; noIndex?: boolean
}

export function SEOHead({ title, description, canonicalPath, keywords, noIndex }: SEOHeadProps) {
  useEffect(() => {
    document.title = title
    const set = (name: string, content: string, prop = false) => {
      const attr = prop ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el) }
      el.content = content
    }
    set('description', description)
    if (keywords?.length) set('keywords', keywords.join(', '))
    set('robots', noIndex ? 'noindex' : 'index, follow')
    set('og:title', title, true)
    set('og:description', description, true)
    set('og:type', 'website', true)
    set('og:site_name', 'Valcr Freelance', true)
    if (canonicalPath) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
      if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link) }
      link.href = `https://freelance.valcr.site${canonicalPath}`
    }
  }, [title, description, canonicalPath, keywords, noIndex])
  return null
}
