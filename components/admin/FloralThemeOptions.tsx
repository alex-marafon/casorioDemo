"use client";

import { useState } from "react";
import { FLORAL_STYLES, FLORAL_STYLE_LABELS, type FloralStyle } from "@/lib/floral";

export function FloralThemeOptions({
  enabledDefault,
  styleDefault,
}: {
  enabledDefault: boolean;
  styleDefault: FloralStyle;
}) {
  const [enabled, setEnabled] = useState(enabledDefault);

  return (
    <div className="space-y-4 rounded-xl border border-black/8 bg-[#faf8f5] p-4">
      <p className="text-sm font-medium">Decoração floral no site</p>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="floralEnabled"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
        Aplicar floral no site
      </label>
      {enabled ? (
        <label className="block">
          <span className="admin-label">Estilo</span>
          <select className="admin-field" name="floralStyle" defaultValue={styleDefault}>
            {FLORAL_STYLES.map((style) => (
              <option key={style} value={style}>
                {FLORAL_STYLE_LABELS[style]}
              </option>
            ))}
          </select>
        </label>
      ) : (
        <input type="hidden" name="floralStyle" value={styleDefault} />
      )}
    </div>
  );
}
