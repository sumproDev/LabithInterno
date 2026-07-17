import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
export default function NotFound(){return <section className="not-found"><span>404</span><p className="eyebrow">SPACE NOT FOUND</p><h1>This surface leads somewhere else.</h1><p>The page may have moved or the address may be incomplete.</p><div className="button-row"><Link className="button button-primary" href="/"><ArrowLeft/>Return home</Link><Link className="button button-secondary" href="/products">Explore products<Search/></Link></div></section>}
