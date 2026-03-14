import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl border bg-muted shadow-sm flex items-center justify-center bg-white">
                <img src={project.icon} alt={`${project.name} logo`} className="h-full w-full object-cover" />
              </div>
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

          {/* Action Button */}
          <div className="flex flex-col items-start gap-2">
            {project.isPublic ? (
              <Button asChild size="lg">
                <a href={project.appStoreUrl || "#"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium">
                  View App / Website
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            ) : (
              <div className="space-y-1.5">
                <Button disabled size="lg" className="opacity-80 cursor-not-allowed">
                  Internal Application
                </Button>
                <p className="text-xs font-medium text-muted-foreground pl-1">
                  App not for public access
                </p>
              </div>
            )}
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

          {/* Technical Highlights */}
          {project.technicalHighlights && project.technicalHighlights.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Technical Highlights</h2>
              <div className="space-y-4">
                {project.technicalHighlights.map((highlight, index) => (
                  <div key={index} className="space-y-1.5 p-4 rounded-xl border bg-muted/30">
                    <h3 className="font-medium text-foreground">{highlight.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{highlight.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenges & Solutions */}
          {project.challenges && project.challenges.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Challenges & Solutions</h2>
              <div className="space-y-4">
                {project.challenges.map((challenge, index) => (
                  <div key={index} className="space-y-3 p-4 rounded-xl border bg-muted/30">
                    <h3 className="font-medium text-foreground">{challenge.title}</h3>
                    <div className="space-y-1.5 border-l-2 border-primary/20 pl-4">
                      <p className="text-sm font-medium text-foreground/80">The Challenge</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{challenge.description}</p>
                    </div>
                    <div className="space-y-1.5 border-l-2 border-primary/60 pl-4">
                      <p className="text-sm font-medium text-primary">The Solution</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{challenge.solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Screenshots */}
          <div className="space-y-3 w-full">
            <h2 className="text-xl font-semibold text-foreground">Screenshots</h2>
            <div className="flex gap-4 overflow-x-auto pb-6 snap-x pt-2 px-1 -mx-1 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/40">
              {project.screenshots.map((src, i) => (
                <Dialog key={i}>
                  <DialogTrigger asChild>
                    <div className="group relative cursor-pointer overflow-hidden rounded-xl border bg-muted transition-all hover:ring-2 hover:ring-primary/50 shrink-0 snap-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      <img
                        src={src}
                        alt={`${project.name} screenshot ${i + 1}`}
                        className="h-64 sm:h-80 md:h-96 w-auto object-contain transition-transform duration-300 group-[.focus-visible]:scale-[1.02] group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-[90vw] md:max-w-5xl border-none bg-transparent p-0 shadow-none">
                    <img
                      src={src}
                      alt={`${project.name} screenshot ${i + 1} expanded`}
                      className="w-full h-auto max-h-[90vh] object-contain rounded-md"
                    />
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ProjectDetail;
