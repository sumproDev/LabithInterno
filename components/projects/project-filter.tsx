"use client";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./project-card";

export function ProjectFilter() { const types = ["All", ...new Set(projects.map(p => p.type))]; const [type, setType] = useState("All"); const shown = type === "All" ? projects : projects.filter(p => p.type === type); return <><div className="project-filters"><div role="group" aria-label="Filter projects by type">{types.map(t => <button key={t} className={type === t ? "active" : ""} onClick={() => setType(t)}>{t}</button>)}</div><span><MapPin /> Location filter available when verified project locations are supplied</span></div><div className="projects-grid">{shown.map(p => <ProjectCard project={p} key={p.slug} />)}</div></>; }
