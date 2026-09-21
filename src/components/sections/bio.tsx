import { Highlight } from "@/components/ui/highlight";
import { Mark } from "@/components/ui/mark";
import { Sticker } from "@/components/ui/sticker";
import { profile } from "@/data/profile";

/** The top of the home page: the headline is the h1, the bio follows at reading size. */
export function Bio() {
  return (
    <div className="flex max-w-[var(--measure)] flex-col gap-4">
      <h1 className="text-lede m-0 font-semibold text-balance">{profile.headline}</h1>
      {/* profile.bio[0] is the elevator pitch. Suppressed when it duplicates the headline. */}
      {(() => {
        const pitch: string = profile.bio[0];
        if (!pitch || pitch === profile.headline) return null;
        return <p className="text-title m-0">{pitch.replace(`${profile.headline} `, "")}</p>;
      })()}
      <p className="m-0">{profile.bio[1]}</p>
      <p className="m-0">
        The rest of the time I am <Highlight>in the mountains</Highlight>, reading nerd articles, or listening to music.
        All of it ends up in this notebook.
      </p>
      {/* Hand-drawn arrow → paper sticker, borrowed from the Margin motif. Whole sticker is one link. */}
      <a
        href={profile.links.linkedin}
        rel="noreferrer"
        target="_blank"
        className="mt-2 inline-flex items-center gap-2 self-start no-underline"
        aria-label="Say hi on LinkedIn"
      >
        <Mark name="arrow" />
        <Sticker>say hi on linkedin</Sticker>
      </a>
    </div>
  );
}
