import { pedirCarta } from "./";
/**
 * Turno de la computadora
 * @param {Number} puntosMinimos puntos minimos que la computadora necesita para ganar
 * @param {Array<String>} deck 
 */
export const turnoComputadora = ( puntosMinimos, deck=[] )=>{
    if(!puntosMinimos) throw new Error('Puntos mínimos es necesario');
    if(!deck) throw new Error('El Deck es necesario');
      let puntosComputadora=0;
      do{

          const carta = pedirCarta(deck);
          puntosComputadora = acumularPuntos(carta, puntosJugadores.length-1);
          crearCarta(carta, puntosJugadores.length-1);

      } while((puntosComputadora<puntosMinimos) && (puntosMinimos<=21));
      determinarGanador();
  }