import _ from 'underscore';

import { crearDeck, pedirCarta, valorCarta} from './usecases';

  let deck = [];
  const tipos = ['C','H','D','S'],
          especiales = ['A','J','Q','K'];

  let puntosJugadores = [];

  // Refrencias del HTML
  const btnNuevo = document.querySelector('#btnNuevo'),
      btnPedir = document.querySelector('#btnPedir'),
      btnDetener = document.querySelector('#btnDetener');

  const mostrarpuntaje = document.querySelectorAll('small'),
      divCartasJugadores = document. querySelectorAll('.divCartas');

  //Inicializa el juego
  const inicializarJuego = ( numJugadores = 2 ) => {
      deck = crearDeck(tipos, especiales);
      puntosJugadores=[];
      for(let i = 0; i<numJugadores; i++){
          puntosJugadores.push(0);
      }

      mostrarpuntaje.forEach( elem => elem.innerText=0);
      divCartasJugadores.forEach( elem => elem.innerHTML='');

      btnPedir.disabled = false;
      btnDetener.disabled = false;
  }


  //Turno: 0 = primer jugador y el último será de la computadora
  const acumularPuntos = ( carta, turno ) => {

      puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
      mostrarpuntaje[turno].innerText=puntosJugadores[turno];
      return puntosJugadores[turno];

  }
  const crearCarta = ( carta, turno ) => {
       const imgCarta = document.createElement('img');
       imgCarta.src=`assets/cartas/${carta}.png`;
       imgCarta.classList.add('carta');
       divCartasJugadores[turno].append(imgCarta);

  }
  const determinarGanador = () => {

      const [ puntosMinimos, puntosComputadora] = puntosJugadores


      setTimeout(() =>{
          if( puntosComputadora===puntosMinimos){
              alert('Empate');
          } else if(puntosMinimos>21){
              alert('Computadora gana');
          } else if(puntosComputadora>21){
              alert('Jugador Gana')
          } else{
              alert('Computadora Gana')
          }
      }, 100);
  }
  //Turno de la computadora
  const turnoComputadora = ( puntosMinimos )=>{
      let puntosComputadora=0;
      do{

          const carta = pedirCarta(deck);
          puntosComputadora = acumularPuntos(carta, puntosJugadores.length-1);
          crearCarta(carta, puntosJugadores.length-1);

      } while((puntosComputadora<puntosMinimos) && (puntosMinimos<=21));
      determinarGanador();
  }

  // Eventos
  btnNuevo.addEventListener('click', ()=>{
    inicializarJuego();
  });

  btnPedir.addEventListener('click', ()=>{
      
      const carta = pedirCarta(deck);
      const puntosJugador = acumularPuntos(carta, 0);
      crearCarta(carta, 0);

      if ( puntosJugador>21 ){
          console.warn('Game Over');
          btnPedir.disabled = true;
          btnDetener.disabled = true;
          turnoComputadora(puntosJugador);
      } else if( puntosJugador===21 ){
          console.warn('You Win');
          btnPedir.disabled = true;
          btnDetener.disabled = true;
          turnoComputadora(puntosJugador);
      }

  });

  btnDetener.addEventListener('click', ()=>{
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugadores);
  });

  

