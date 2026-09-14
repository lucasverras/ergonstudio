import type { BreadcrumbItem } from '@/lib/schema'

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  // Breadcrumb schema is rendered by parent pages (ServicesHub, ServiceDetail, etc)
  // This component only renders the visual breadcrumb

  return (
    <nav aria-label="breadcrumb" className="mb-6 text-sm">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <a
              href={item.url}
              className="text-neutral-400 hover:text-neutral-600 transition-colors dark:text-neutral-500 dark:hover:text-neutral-400"
            >
              {item.name}
            </a>
            {i < items.length - 1 && <span className="text-neutral-300 dark:text-neutral-600">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
