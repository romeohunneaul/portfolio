import { Highlight } from "@/components/ui/highlight";
import { profile } from "@/data/profile";

/** The top of the home page: the headline is the h1, the bio follows at reading size. */
export function Bio() {
  return (
    <div className="flex max-w-[var(--measure)] flex-col gap-4">
      <h1 className="text-lede m-0 font-semibold text-balance">{profile.headline}</h1>
      <p className="text-title m-0">{profile.bio[0].replace(`${profile.headline} `, "")}</p>
      <p className="m-0">{profile.bio[1]}</p>
      <p className="m-0">
        The rest of the time I am <Highlight>in the mountains</Highlight>, reading nerd articles, or listening to music.
        All of it ends up in this notebook.
      </p>
    </div>
  );
}
