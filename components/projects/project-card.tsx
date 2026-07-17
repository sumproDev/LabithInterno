import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return <article className="project-card"><div className="project-image"><Image src={project.image} alt={`${project.title} interior project`} fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div className="project-meta"><span>{project.type} · {project.location}</span><h3>{project.title}</h3><p>{project.products.join(" · ")}</p><Link href={`/projects/${project.slug}`}>View case study <ArrowUpRight /></Link></div></article>;
}
