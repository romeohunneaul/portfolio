import { describe, expect, it } from "vitest";
import { decimate, parseGpx, toSvg } from "./gpx";

const sample = `<?xml version="1.0"?>
<gpx><trk><name>Petite boucle</name><trkseg>
<trkpt lat="45.000" lon="6.000"><ele>1000</ele></trkpt>
<trkpt lat="45.009" lon="6.000"><ele>1050</ele></trkpt>
<trkpt lat="45.009" lon="6.013"><ele>1020</ele></trkpt>
<trkpt lat="45.000" lon="6.013"><ele>1002</ele></trkpt>
<trkpt lat="45.000" lon="6.000"><ele>1000</ele></trkpt>
</trkseg></trk></gpx>`;

describe("parseGpx", () => {
  it("lit le nom, les points et l'altitude", () => {
    const track = parseGpx(sample);
    expect(track.name).toBe("Petite boucle");
    expect(track.points).toHaveLength(5);
    expect(track.points[1]).toEqual({ lat: 45.009, lon: 6, ele: 1050 });
  });

  it("mesure la distance et le dénivelé positif", () => {
    const track = parseGpx(sample);
    // ~1 km nord + ~1 km est + ~1 km sud + ~1 km ouest
    expect(track.distanceKm).toBeGreaterThan(3.9);
    expect(track.distanceKm).toBeLessThan(4.2);
    expect(track.gainM).toBe(50);
    expect(track.maxEleM).toBe(1050);
    expect(track.minEleM).toBe(1000);
  });

  it("accepte les points sans altitude et l'ordre lon/lat inversé", () => {
    const track = parseGpx(`<trkpt lon="6" lat="45"></trkpt><trkpt lon="6.01" lat="45"><ele>10</ele></trkpt>`);
    expect(track.points).toHaveLength(2);
    expect(track.points[0].ele).toBe(0);
  });

  it("renvoie une piste vide sans planter", () => {
    const track = parseGpx("<gpx></gpx>");
    expect(track.points).toEqual([]);
    expect(track.distanceKm).toBe(0);
    expect(track.gainM).toBe(0);
  });
});

describe("decimate", () => {
  it("garde les extrémités et au plus `max` points", () => {
    const pts = Array.from({ length: 1000 }, (_, i) => i);
    const out = decimate(pts, 10);
    expect(out).toHaveLength(10);
    expect(out[0]).toBe(0);
    expect(out.at(-1)).toBe(999);
  });

  it("ne touche pas une liste déjà courte", () => {
    expect(decimate([1, 2, 3], 10)).toEqual([1, 2, 3]);
  });
});

describe("toSvg", () => {
  it("produit un tracé qui tient dans la boîte", () => {
    const svg = toSvg(parseGpx(sample), 100, 40);
    expect(svg.outline.startsWith("M")).toBe(true);
    const coords = svg.outline.match(/[\d.]+/g)!.map(Number);
    expect(Math.max(...coords)).toBeLessThanOrEqual(100);
    expect(Math.min(...coords)).toBeGreaterThanOrEqual(0);
    expect(svg.profileArea.endsWith("Z")).toBe(true);
  });

  it("renvoie des chemins vides pour une piste vide", () => {
    expect(toSvg(parseGpx("<gpx/>")).outline).toBe("");
  });
});
