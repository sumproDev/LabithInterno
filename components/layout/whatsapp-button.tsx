import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "910000000000";
  return <Link className="whatsapp" href={`https://wa.me/${number}?text=${encodeURIComponent("Hello Labith Interno, I would like to discuss an interior materials requirement.")}`} target="_blank" rel="noreferrer" aria-label="Chat with Labith Interno on WhatsApp"><MessageCircle /><span>WhatsApp</span></Link>;
}
