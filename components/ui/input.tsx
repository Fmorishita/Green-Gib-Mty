import * as React from "react";
import { cn } from "@/lib/utils";

const baseField =
  "w-full rounded-md border border-stone/50 bg-cream/50 px-4 py-3 text-charcoal placeholder:text-charcoal-muted/60 transition-colors focus:border-green-deep focus:outline-none focus:ring-2 focus:ring-green-deep/15 disabled:opacity-60";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(baseField, className)} {...props} />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(baseField, "min-h-[120px] resize-y", className)} {...props} />
));
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(baseField, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%2326261F%22><path stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%222%22 d=%22M19 9l-7 7-7-7%22/></svg>')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10", className)}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

/** Envoltura de campo con label accesible y mensaje de error. */
export function Field({ label, htmlFor, error, required, children, className }: FieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-charcoal">
        {label}
        {required && <span className="ml-0.5 text-terracotta">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-terracotta-dark" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
