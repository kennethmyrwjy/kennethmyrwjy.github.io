import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/Header";
import { projects, skills } from "@/data/projects";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const Index = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast({ title: "Please enter a valid email.", variant: "destructive" });
      return;
    }
    toast({ title: "Message sent!", description: "Thanks for reaching out. I'll get back to you soon." });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-3xl px-6 py-16 space-y-24">
        {/* Hero */}
        <motion.section initial="hidden" animate="visible" variants={fadeUp} custom={0} className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Kenneth Mayer
            </h1>
            <p className="text-xl font-medium text-primary">Software Engineer</p>
          </div>
          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
            Well-versed in all tech-stacks and confident in end-to-end development process. Honed user-facing mentality. Comfortable in cross-discipline collaboration.
          </p>
          <div className="flex gap-3">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/kennethmyrwjy" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://www.linkedin.com/in/kenneth-mayer-wijaya-876776293/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:wkennethmayer@gmail.com" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Skills & Tech Stack</h2>
          <div className="space-y-6">
            {skills.map((group) => (
              <div key={group.category} className="space-y-3">
                <h3 className="text-lg font-medium text-foreground/80">{group.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1.5 text-sm font-medium">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Projects */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Projects</h2>
          <div className="space-y-4">
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <Link
                  to={`/projects/${project.slug}`}
                  className="group block rounded-xl border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border bg-muted flex items-center justify-center">
                      <img src={project.icon} alt={`${project.name} logo`} className="h-full w-full object-cover" loading="lazy" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                          {project.name}
                        </h3>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 shrink-0" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{project.tagline}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs font-normal">
                            {tech}
                          </Badge>
                        ))}
                        {project.techStack.length > 4 && (
                          <Badge variant="outline" className="text-xs font-normal">
                            +{project.techStack.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <Input
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={100}
            />
            <Input
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              maxLength={255}
            />
            <Textarea
              placeholder="Your message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              maxLength={1000}
              rows={4}
            />
            <Button type="submit">Send Message</Button>
          </form>
        </motion.section>

        {/* Footer */}
        <footer className="border-t pt-8 pb-12 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Kenneth Mayer. Built as a testament of learning.
        </footer>
      </main>
    </div>
  );
};

export default Index;
