import { ProjectCard } from '@/components/ui/ProjectCard'
import { projects } from '@/lib/data/projects'

export default function ProjectsSection() {
  const [first, second, third] = projects

  return (
    <section className="w-full border-b border-[color:var(--color-border)]">
      <div
        style={{
          maxWidth: 'var(--container-max)',
          marginInline: 'auto',
          padding: 'var(--space-7) var(--space-7) var(--space-9)',
        }}
      >
        <div className="flex flex-col" style={{ gap: 'var(--space-1)' }}>
          <span
            className="font-display uppercase text-[color:var(--color-muted)]"
            style={{ fontSize: 'var(--text-label)', letterSpacing: '0.08em', marginBottom: 'var(--space-5)' }}
          >
            Selected Work
          </span>
          {first && <ProjectCard project={first} featured />}

          {(second || third) && (
            <div className="grid grid-cols-2" style={{ gap: 'var(--space-1)' }}>
              {second && (
                <ProjectCard project={second} layout="vertical" imageFirst={false} />
              )}
              {third && (
                <ProjectCard project={third} layout="vertical" imageFirst={true} />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
