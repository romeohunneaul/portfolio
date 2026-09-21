import { Logo } from "@/components/ui/logo";
import { Mark } from "@/components/ui/mark";
import { Sticker } from "@/components/ui/sticker";
import { profile } from "@/data/profile";

/** The 272px margin column: the sun sets behind the ridge on grid paper, one sticker
 *  that doubles as the standing contact target. LinkedIn is the one channel. */
export function Margin() {
  return (
    <aside className="hidden flex-col gap-6 pt-2 lg:flex" aria-label="Margin">
      <div
        className="border-rule bg-card flex h-[210px] items-center justify-center border-[length:var(--border)]"
        style={{ backgroundImage: "var(--paper-grid-fine)" }}
      >
        <Logo size={150} variant="sunset" className="[--logo-fill:var(--paper-card)]" />
      </div>
      <a
        href={profile.links.linkedin}
        rel="noreferrer"
        target="_blank"
        className="flex items-center gap-2 self-start no-underline"
        aria-label="Say hi on LinkedIn"
      >
        <Mark name="arrow" />
        <Sticker>have a look around or say hi on linkedin</Sticker>
      </a>
    </aside>
  );
}
