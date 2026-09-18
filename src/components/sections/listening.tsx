import { EntryRow } from "@/components/ui/entry-row";
import { music, playlistId } from "@/data/music";

/** The Spotify playlist of the moment; a plain list when there is no embed. */
export function Listening() {
  const id = playlistId(music.playlist);

  if (id) {
    return (
      <iframe
        title="Spotify playlist — what I'm listening to"
        src={`https://open.spotify.com/embed/playlist/${id}?theme=0`}
        width="100%"
        height={352}
        loading="lazy"
        allow="encrypted-media; picture-in-picture"
        className="border-rule border-[length:var(--border)]"
      />
    );
  }

  if (music.tracks.length === 0) {
    return <p className="text-soft m-0">The playlist of the moment lands here. Soon.</p>;
  }

  return (
    <div>
      {music.tracks.map((t) => (
        <EntryRow key={t.url} href={t.url} title={t.title} detail={t.artist} />
      ))}
    </div>
  );
}
