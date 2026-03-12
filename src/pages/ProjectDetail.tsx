import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { projects } from "@/data/projects";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-3xl px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-12">
          {/* Back */}
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to all projects
          </Link>

          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-5xl" role="img" aria-label={project.name}>
                {project.icon}
              </span>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {project.name}
                </h1>
                <p className="mt-1 text-lg text-muted-foreground">{project.tagline}</p>
              </div>
            </div>
          </div>

          {/* Meta info */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 rounded-xl border bg-card p-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Role</p>
              <p className="mt-1 text-sm font-medium text-card-foreground">{project.role}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Team</p>
              <p className="mt-1 text-sm font-medium text-card-foreground">{project.teamSize}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Timeline</p>
              <p className="mt-1 text-sm font-medium text-card-foreground">{project.timeline}</p>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">About</h2>
            {project.description.map((para, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="px-3 py-1.5 text-sm font-medium">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Screenshots */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">Screenshots</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {project.screenshots.map((src, i) => (
                <div key={i} className="aspect-[9/16] overflow-hidden rounded-xl border bg-muted">
                  <img src={src} alt={`${project.name} screenshot ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {/* App Store Link */}
          {project.appStoreUrl && (
            <Button asChild>
              <a href={project.appStoreUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                View on App Store
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default ProjectDetail;
