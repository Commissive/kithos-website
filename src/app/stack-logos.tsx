/* Real monochrome marks for the B2B commercial stack — sourced from
   SimpleIcons (CC0) via react-icons. Used in the "Right Now" section
   to show the fragments revenue decisions get made from.

   For brands not in SimpleIcons (LinkedIn, Apollo, Gong, ZoomInfo,
   Clay) the asset files are kept in /public/logos/ and applied via
   CSS mask-image, so the cell's currentColor drives the rendering
   uniformly across both themes — no per-icon recolour, no copying
   third-party path data into source. */

import type { ComponentType } from "react";

/* StackTool — Mark can be any component that accepts width/height +
   the standard aria attributes. Both SimpleIcons SVG components (which
   render with fill=currentColor) and <img>-based wrappers (which carry
   their own brand colours) fit this signature. */
export type StackTool = {
  name: string;
  Mark: ComponentType<{
    width?: number | string;
    height?: number | string;
    "aria-hidden"?: boolean;
    focusable?: boolean;
  }>;
  size?: number;
  /* Brand colour applied to SimpleIcons (and LinkedIn) marks via
     a parent span; ignored by image-based marks which carry colour
     in the image itself. */
  color?: string;
};

/* ---- image-based wrapper ----
   For brand assets the project owner provided in /public/logos/.
   Renders the file directly as an <img>, in its original brand colours.
   Trade-off vs. the earlier mask approach: the cell's currentColor no
   longer tints these icons, but multi-colour brand marks (Notion's N,
   Google docs/sheets/cal) keep their detail intact. */
type ImageMarkOptions = {
  src: string;
  /* Optional CSS object-position; used to crop a portion of a wider
     source SVG (e.g. Apollo's symbol-plus-wordmark). */
  objectPosition?: string;
  /* Optional override for how the image fills its container. */
  scale?: number;
};

function makeImageMark({
  src,
  objectPosition,
  scale = 0.78,
}: ImageMarkOptions): ComponentType<{
  width?: number | string;
  height?: number | string;
  "aria-hidden"?: boolean;
  focusable?: boolean;
}> {
  function ImageMark({
    width = 44,
    height = 44,
    "aria-hidden": ariaHidden,
  }: {
    width?: number | string;
    height?: number | string;
    "aria-hidden"?: boolean;
    focusable?: boolean;
  }) {
    const w = typeof width === "number" ? width * scale : width;
    const h = typeof height === "number" ? height * scale : height;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        aria-hidden={ariaHidden}
        loading="lazy"
        decoding="async"
        style={{
          width: w,
          height: h,
          objectFit: "contain",
          objectPosition: objectPosition ?? "center",
        }}
      />
    );
  }
  ImageMark.displayName = `ImageMark(${src})`;
  return ImageMark;
}

/* Project-owner-supplied brand assets in /public/logos/. Per-mark
   scale tunes visual weight; Apollo uses a custom wrapper because the
   source SVG is wide (symbol + wordmark) and needs the symbol cropped. */
const SalesforceMark = makeImageMark({ src: "/logos/salesforce.svg", scale: 0.82 });
const HubspotMark = makeImageMark({ src: "/logos/hubspot.svg" });
const GmailMark = makeImageMark({ src: "/logos/gmail.svg" });
/* Slack — source SVG is 270×270 but the pinwheel only occupies the
   middle ~46% of the viewBox (coords ~73-197). Rendered via
   background-image with backgroundSize 165% so the empty padding is
   zoomed past and the pinwheel fills the cell at parity with the
   other logos. */
function SlackMark({
  width = 44,
  height = 44,
  "aria-hidden": ariaHidden,
}: {
  width?: number | string;
  height?: number | string;
  "aria-hidden"?: boolean;
  focusable?: boolean;
}) {
  const w = typeof width === "number" ? width * 0.85 : width;
  const h = typeof height === "number" ? height * 0.85 : height;
  return (
    <span
      aria-hidden={ariaHidden}
      style={{
        display: "inline-block",
        width: w,
        height: h,
        backgroundImage: "url(/logos/slack.svg)",
        backgroundSize: "165% 165%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
const NotionMark = makeImageMark({ src: "/logos/notion.svg" });
const GoogleDocsMark = makeImageMark({ src: "/logos/Google_Google_Docs_4.svg", scale: 0.7 });
const GoogleSheetsMark = makeImageMark({ src: "/logos/Google_Google_Sheets_6.svg", scale: 0.7 });
const GoogleCalendarMark = makeImageMark({ src: "/logos/Google_google_calendar_0.svg" });
const GongMark = makeImageMark({ src: "/logos/gong.svg", scale: 0.8 });
const ZoomInfoMark = makeImageMark({ src: "/logos/zoominfo.svg", scale: 0.78 });
const ClayMark = makeImageMark({ src: "/logos/Clay.png" });
const LinkedInMark = makeImageMark({ src: "/logos/linkedin.svg" });
const LoomMark = makeImageMark({ src: "/logos/Loom.svg" });
const ChatGPTMark = makeImageMark({ src: "/logos/chatgpt.svg" });
/* Claude — source viewBox 184×40 with the icon in the leftmost ~40
   units (wordmark starts ~x=64). Crop ratio ≈ 184/40 = 4.6. */
const ClaudeMark = makeCroppedMark({
  src: "/logos/claude.svg",
  aspectCrop: 4.6,
});

/* makeCroppedMark — for source SVGs that pack a symbol next to a
   wordmark (Apollo, Claude, Perplexity). Renders the file as a
   background-image scaled so the symbol portion (assumed to be at the
   left) fills the cell; the wordmark sits off-frame to the right. The
   `aspectCrop` is the source viewBox's full width divided by the
   approximate symbol width — so 152/36 ≈ 4.22 for Apollo. */
function makeCroppedMark({
  src,
  aspectCrop,
  scale = 0.85,
}: {
  src: string;
  aspectCrop: number;
  scale?: number;
}): ComponentType<{
  width?: number | string;
  height?: number | string;
  "aria-hidden"?: boolean;
  focusable?: boolean;
}> {
  function CroppedMark({
    width = 44,
    height = 44,
    "aria-hidden": ariaHidden,
  }: {
    width?: number | string;
    height?: number | string;
    "aria-hidden"?: boolean;
    focusable?: boolean;
  }) {
    const w = typeof width === "number" ? width * scale : width;
    const h = typeof height === "number" ? height * scale : height;
    return (
      <span
        aria-hidden={ariaHidden}
        style={{
          display: "inline-block",
          width: w,
          height: h,
          backgroundImage: `url(${src})`,
          backgroundSize: `${aspectCrop * 100}% auto`,
          backgroundPosition: "left center",
          backgroundRepeat: "no-repeat",
        }}
      />
    );
  }
  CroppedMark.displayName = `CroppedMark(${src})`;
  return CroppedMark;
}

/* Apollo — symbol portion of a wider symbol-plus-wordmark file. */
const ApolloMark = makeCroppedMark({
  src: "/logos/apollo.svg",
  aspectCrop: 4.22, // 152/36
});

/* ---- Stack list ----
   24 tools — 6×4 grid of the modern commercial stack. Order follows
   the rough flow of an account: prospecting → outreach → meetings →
   notes → data → support → billing → AI. */
export const stackTools: StackTool[] = [
  // CRM
  { name: "Salesforce", Mark: SalesforceMark },
  { name: "HubSpot", Mark: HubspotMark },
  // Prospecting + enrichment
  { name: "LinkedIn", Mark: LinkedInMark },
  { name: "Apollo", Mark: ApolloMark },
  { name: "ZoomInfo", Mark: ZoomInfoMark },
  { name: "Clay", Mark: ClayMark },
  // Email + chat
  { name: "Gmail", Mark: GmailMark },
  { name: "Slack", Mark: SlackMark },
  // Scheduling
  { name: "Google Calendar", Mark: GoogleCalendarMark },
  // Async + recording
  { name: "Loom", Mark: LoomMark },
  { name: "Gong", Mark: GongMark },
  // Notes + docs
  { name: "Notion", Mark: NotionMark },
  { name: "Google Docs", Mark: GoogleDocsMark },
  // Spreadsheets
  { name: "Google Sheets", Mark: GoogleSheetsMark },
  // AI assistants — increasingly in the commercial flow
  { name: "ChatGPT", Mark: ChatGPTMark },
  { name: "Claude", Mark: ClaudeMark },
];
