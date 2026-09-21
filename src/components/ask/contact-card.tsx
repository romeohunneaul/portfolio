import { TextLink } from "@/components/ui/text-link";
import { profile } from "@/data/profile";

/** Shown when the assistant has no answer, or is unavailable: the shortest path to the human. */
export function ContactCard({ reason }: { reason?: string }) {
  const text = encodeURIComponent(reason ? `Hi François — a question from your site: ${reason}` : "Hi François — a question from your site.");
  const whatsapp = profile.links.whatsapp ? `${profile.links.whatsapp}?text=${text}` : null;

  return (
    <div className="border-rule bg-card flex flex-col gap-2 border-[length:var(--border)] px-4 py-3">
      <span className="font-semibold">Ask François directly</span>
      <span className="flex flex-wrap gap-x-5 gap-y-1">
        {whatsapp && <TextLink href={whatsapp}>WhatsApp</TextLink>}
        <TextLink href={`mailto:${profile.email}?subject=${encodeURIComponent("From your site")}&body=${text}`}>Mail</TextLink>
        <TextLink href={profile.links.linkedin}>LinkedIn</TextLink>
      </span>
    </div>
  );
}
