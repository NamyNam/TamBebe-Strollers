/**
 * A dashed perforation line with punch-hole notches at each end,
 * like the tear-line on an inventory ticket. `bg` should match the
 * color behind the notches so they read as cut-outs.
 */
export function TicketNotch({ bg, lineColor }: { bg: string; lineColor: string }) {
  return (
    <div className="relative flex items-center w-full" aria-hidden="true">
      <div className="w-3.5 h-3.5 rounded-full -ml-[7px]" style={{ backgroundColor: bg }} />
      <div className="flex-1 border-t-2" style={{ borderColor: lineColor, borderStyle: "dashed" }} />
      <div className="w-3.5 h-3.5 rounded-full -mr-[7px]" style={{ backgroundColor: bg }} />
    </div>
  );
}
