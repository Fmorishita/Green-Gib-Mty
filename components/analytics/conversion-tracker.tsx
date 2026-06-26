"use client";

import { useEffect } from "react";
import { trackEvent, type PixelEvent } from "@/lib/tracking";

interface ConversionTrackerProps {
  event: PixelEvent;
  params?: Record<string, unknown>;
}

/** Dispara un evento de conversión al montar (p. ej. en /gracias). */
export function ConversionTracker({ event, params }: ConversionTrackerProps) {
  useEffect(() => {
    trackEvent(event, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
