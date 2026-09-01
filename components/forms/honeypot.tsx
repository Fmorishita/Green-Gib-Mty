import { HONEYPOT_FIELD } from "@/lib/validations/lead";

/**
 * Campo trampa anti-spam.
 *
 * Invisible y fuera del flujo de tabulación para personas y lectores de
 * pantalla, pero presente en el DOM para los bots que rellenan todo input
 * que encuentran. El servidor descarta cualquier envío que lo traiga lleno.
 */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
      <label htmlFor={`hp-${HONEYPOT_FIELD}`}>No llenar este campo</label>
      <input
        id={`hp-${HONEYPOT_FIELD}`}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  );
}
