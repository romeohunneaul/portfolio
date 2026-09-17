import { Highlight } from "@/components/ui/highlight";
import { profile } from "@/data/profile";

/** The largest text on the page. Three sentences, first person. */
export function Bio() {
  return (
    <div className="flex max-w-[var(--measure)] flex-col gap-4 text-[length:var(--size-lede)] leading-[var(--leading-body)]">
      <p>{profile.bio[0]}</p>
      <p>{profile.bio[1]}</p>
      <p>
        The rest of the time I run <Highlight>up hills, slowly</Highlight>. Both go in the notebook.
      </p>
    </div>
  );
}
