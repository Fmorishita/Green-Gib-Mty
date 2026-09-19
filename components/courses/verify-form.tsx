"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** Formulario de búsqueda por folio en la página pública de verificación. */
export function VerifyForm({ defaultValue }: { defaultValue?: string }) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    router.push(`/certificados/verificar?folio=${encodeURIComponent(value.trim())}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="GG-2026-A3F9K2"
        aria-label="Folio del certificado"
        className="uppercase"
      />
      <Button type="submit" className="flex-shrink-0">
        <Search className="h-4 w-4" aria-hidden />
        Verificar
      </Button>
    </form>
  );
}
