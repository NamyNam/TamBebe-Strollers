import { Check } from "lucide-react";
import { brand, fonts } from "@/lib/brand";

interface StampBadgeProps {
  size?: number;
  rotate?: number;
  tone?: "stamp" | "pine" | "navy";
  topText?: string;
  bottomText?: string;
  className?: string;
}

const toneColor: Record<string, string> = {
  stamp: brand.stamp,
  pine: brand.pine,
  navy: brand.navy,
};

/**
 * Signature element: a rubber ink-stamp badge, styled after the paper tags
 * TamBebe's own inspectors use when a stroller passes certification.
 * Use boldly once (hero); keep restrained everywhere else.
 */
export function StampBadge({
  size = 168,
  rotate = -10,
  tone = "stamp",
  topText = "TAMBEBE ONAYLI",
  bottomText = "24 NOKTA KONTROL",
  className = "",
}: StampBadgeProps) {
  const color = toneColor[tone];
  return (
    <div
      className={`relative inline-block select-none ${className}`}
      style={{ width: size, height: size, transform: `rotate(${rotate}deg)` }}
    >
      <svg viewBox="0 0 220 220" className="w-full h-full overflow-visible">
        <circle cx="110" cy="110" r="103" fill="none" stroke={color} strokeWidth="3" strokeDasharray="2.5 5" opacity="0.8" />
        <circle cx="110" cy="110" r="87" fill="none" stroke={color} strokeWidth="2.5" />
        <circle cx="110" cy="110" r="69" fill="none" stroke={color} strokeWidth="1" opacity="0.55" />
        <path id="stampTopArc" d="M 28,112 A 82,82 0 1,1 192,112" fill="none" />
        <path id="stampBottomArc" d="M 36,112 A 74,74 0 1,0 184,112" fill="none" />
        <text fill={color} fontSize="15.5" fontWeight={700} letterSpacing="2.5" style={{ fontFamily: fonts.mono }}>
          <textPath href="#stampTopArc" startOffset="50%" textAnchor="middle">
            {topText}
          </textPath>
        </text>
        <text fill={color} fontSize="11.5" fontWeight={700} letterSpacing="1.5" style={{ fontFamily: fonts.mono }}>
          <textPath href="#stampBottomArc" startOffset="50%" textAnchor="middle">
            {bottomText}
          </textPath>
        </text>
        <line x1="75" y1="110" x2="90" y2="110" stroke={color} strokeWidth="2" opacity="0.6" />
        <line x1="130" y1="110" x2="145" y2="110" stroke={color} strokeWidth="2" opacity="0.6" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="rounded-full flex items-center justify-center"
          style={{ width: size * 0.29, height: size * 0.29, border: `2.5px solid ${color}` }}
        >
          <Check strokeWidth={3} style={{ width: size * 0.15, height: size * 0.15, color }} />
        </div>
      </div>
    </div>
  );
}
