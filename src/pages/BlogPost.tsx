import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import { SEOHead } from '@/components/SEOHead'
import { BLOG_POSTS } from '@/pages/Blog'
import { getFreelanceCalculator } from '@/calculators'

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = BLOG_POSTS.find(p => p.slug === slug)
  const otherPosts = BLOG_POSTS.filter(p => p.slug !== slug).slice(0, 3)

  if (!post) return (
    <div className="pt-28 pb-20 px-4 text-center">
      <SEOHead title="Not Found — Valcr Freelance" description="Post not found." />
      <h1 className="font-display font-bold text-ink-50 text-2xl mb-4">Post not found</h1>
      <Link to="/blog" className="btn-primary">Back to blog</Link>
    </div>
  )

  const calc = getFreelanceCalculator(post.calcSlug)

  // Simple markdown-like render: **bold**, newlines to paragraphs, [text](url) links
  function renderContent(text: string) {
    return text.trim().split('\n\n').map((para, i) => {
      if (para.startsWith('**') && para.endsWith('**') && !para.slice(2,-2).includes('**')) {
        return <h3 key={i} className="font-display font-bold text-ink-100 text-xl mt-8 mb-3">{para.slice(2,-2)}</h3>
      }
      // Replace **bold** inline
      const parts = para.split(/(\*\*[^*]+\*\*)/)
      const rendered = parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} className="text-ink-100 font-semibold">{part.slice(2,-2)}</strong>
        }
        // Replace [text](url) links
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
        const pieces = []
        let last = 0, match
        const str = part
        while ((match = linkRegex.exec(str)) !== null) {
          if (match.index > last) pieces.push(str.slice(last, match.index))
          const href = match[2]
          const isExternal = href.startsWith('http')
          pieces.push(isExternal
            ? <a key={match.index} href={href} target="_blank" rel="noopener noreferrer" className="text-acid hover:underline">{match[1]}</a>
            : <Link key={match.index} to={href} className="text-acid hover:underline">{match[1]}</Link>
          )
          last = match.index + match[0].length
        }
        pieces.push(str.slice(last))
        return <span key={j}>{pieces}</span>
      })
      return <p key={i} className="text-ink-300 leading-relaxed mb-4">{rendered}</p>
    })
  }

  return (
    <>
      <SEOHead
        title={`${post.title} — Valcr Freelance`}
        description={post.excerpt}
        canonicalPath={`/blog/${post.slug}`}
      />
      <div className="pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-ink-500 hover:text-ink-200 text-sm mb-8 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5"/>Back to blog
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-acid bg-acid/10 px-2 py-0.5 rounded">{post.category}</span>
            <span className="flex items-center gap-1 text-xs text-ink-600">
              <Clock className="w-3 h-3"/>{post.readTime}
            </span>
            <span className="text-xs text-ink-600">{post.date}</span>
          </div>

          <h1 className="font-display font-bold text-3xl sm:text-4xl text-ink-50 mb-6">{post.title}</h1>
          <p className="text-ink-300 text-lg border-b border-ink-800 pb-8 mb-8">{post.excerpt}</p>

          {/* Article content */}
          <div className="prose-valcr mb-12">{renderContent(post.content)}</div>

          {/* CTA to related calculator */}
          {calc && (
            <div className="card p-6 border-acid/20 bg-acid/5 mb-12">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{calc.icon}</span>
                <h3 className="font-display font-bold text-ink-50">{calc.name}</h3>
              </div>
              <p className="text-ink-400 text-sm mb-4">{calc.description}</p>
              <Link to={`/calculators/${calc.slug}`} className="btn-primary">
                Try the calculator free <ArrowRight className="w-4 h-4"/>
              </Link>
            </div>
          )}

          {/* More articles */}
          {otherPosts.length > 0 && (
            <div>
              <h2 className="font-display font-bold text-ink-50 text-xl mb-5">More from the blog</h2>
              <div className="space-y-3">
                {otherPosts.map(p => (
                  <Link key={p.slug} to={`/blog/${p.slug}`}
                    className="card p-4 hover:border-acid/30 hover:bg-acid/5 transition-all group flex items-center justify-between gap-4">
                    <div>
                      <p className="font-display font-bold text-ink-100 text-sm group-hover:text-acid transition-colors mb-1">{p.title}</p>
                      <p className="text-ink-500 text-xs">{p.category} · {p.readTime}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-ink-600 group-hover:text-acid transition-colors shrink-0"/>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
