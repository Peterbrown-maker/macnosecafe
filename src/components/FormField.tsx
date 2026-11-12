import { cloneElement, useId, type ReactElement } from "react";

export const inputClass =
  "w-full h-12 px-4 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

/**
 * Label + one input/select/textarea, with the hint and error wired up through
 * aria-describedby so screen readers read them after the field's name.
 */
export function Field({ label, error, hint, children }: { label: string; error?: string; hint?: string; children: ReactElement }) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint && !error ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground mb-2">
        {label}
      </label>
      {cloneElement(children, { id, "aria-describedby": describedBy, "aria-invalid": error ? true : undefined })}
      {hint && !error && (
        <p id={hintId} className="text-xs text-muted-foreground mt-1.5">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-sm text-primary mt-1.5">
          {error}
        </p>
      )}
    </div>
  );
}

export const SA_PHONE = /^(\+27|0)[1-9]\d{8}$/;
