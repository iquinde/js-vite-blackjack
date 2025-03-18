import _ from 'underscore'

/**
 * 
 * @param {Array<String>} tiposDeCarta Ejemplo: ['C','H','D','S']
 * @param {Array<String>} tiposEspeciales Ejemplo: ['A','J','Q','K']
 * @returns {Array<String>} Retorna un nuevo deck de cartas
 */
export const crearDeck=(tiposDeCarta, tiposEspeciales)=>{

    if (!tiposDeCarta || tiposDeCarta.length===0) 
        throw new Error('Tipo de carta es obligatorio como un arreglo de string');
    
    if (!tiposEspeciales || tiposEspeciales.length===0) 
        throw new Error('Tipo de carta es obligatorio como un arreglo de string');

    let deck=[];
    for( let i = 2; i<= 10;i++){
        for(let tipo of tiposDeCarta){
            deck.push(i+tipo);
        }
    }

    for(let tipo of tipos){
        for(let esp of tiposEspeciales){
            deck.push(esp+tipo);
        }
    }

    return _.shuffle(deck);
    
}