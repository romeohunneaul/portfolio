import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { findProto, PROTOS } from "@/lab/manifest";
import { VariantProvider, VariantSwitcher } from "@/lab/variants";
import { LabAnnotation } from "@/lab/lab-annotation";

export const metadata: Metadata = { title: "Lab", robots: { index: false, follow: false } };
export const generateStaticParams = () => PROTOS.map((p) => ({ slug: p.slug }));

// dynamic() must run at module scope, not during render (react-hooks/static-components).
const PROTO_COMPONENTS = Object.fromEntries(PROTOS.map((p) => [p.slug, dynamic(p.load)]));

export default async function ProtoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const proto = findProto(slug);
  if (!proto) notFound();

  const Proto = PROTO_COMPONENTS[slug];

  return (
    <Suspense fallback={null}>
      <VariantProvider axes={proto.axes ?? []}>
        <Proto />
        <VariantSwitcher />
      </VariantProvider>
      <LabAnnotation />
    </Suspense>
  );
}
