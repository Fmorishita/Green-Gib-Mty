/**
 * Campo trampa anti-spam.
 *
 * Invisible y fuera del flujo de tabulación para personas y lectores de
 * pantalla, pero presente en el DOM para los bots que rellenan todo input que
 * encuentran. El servidor descarta cualquier envío que lo traiga lleno.
 *
 * Requiere que el formulario contenedor sea `relative`, para que el
 * posicionamiento fuera de pantalla no provoque scroll horizontal.
 */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="hp-company">No llenar este campo</label>
      <input id="hp-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
