const FRAMERATE = 60;
const CANVASW = 400;
const CANVASH = 700;
const CORFUNDOCANVAS = 50;
class GLOBALS{}



// function lerParametros(){        
//     try{
//         GLOBALS.passoT = parseFloat($('passoT').value);
//         GLOBALS.passoX = parseFloat($('passoX').value);
//         GLOBALS.tempoMaximo = parseFloat($('tempoMaximo').value);
//          
//     }catch(err){
//         alert('Erro lerParametros: '+err);
//     }        
// }        


function setup(flag) {
    try{
        frameRate(FRAMERATE);
        createCanvas(CANVASH, CANVASW);
        background(CORFUNDOCANVAS);

        GLOBALS.passo = 0.1;
        GLOBALS.maxIteracao = 1/GLOBALS.passo;
        GLOBALS.iteracao = 0;
        GLOBALS.resultado = null;
        GLOBALS.analitico = null;
        GLOBALS.x = 0;
        
        //noLoop();
        
    }catch(err){alert('Erro setup: '+err);}
    
        
}
function draw() {
    try{
            //background(CORFUNDOCANVAS);
            
            Print.tabela([GLOBALS.x,'Numerico = '+GLOBALS.resultado,'Analitico = '+GLOBALS.analitico,'Erro = '+GLOBALS.erro]);
            
            GLOBALS.x += GLOBALS.passo;
            GLOBALS.resultado += (Math.cos(GLOBALS.x))**2*GLOBALS.passo;
            GLOBALS.analitico = GLOBALS.x/2 + Math.sin(2*GLOBALS.x)/4;
            GLOBALS.erro = GLOBALS.analitico - GLOBALS.resultado;   
            
            
            GLOBALS.iteracao++;
            if(GLOBALS.iteracao>GLOBALS.maxIteracao){
                noLoop();
            }
            //var mes = 1;
            //calcularMes(mes);
            //GLOBALS.barra.printLinha(GLOBALS.barra.linha);

            //GLOBALS.neuronio.calcularLinha(GLOBALS.neuronio.i);

                           
            //GLOBALS.neuronio.pontos[0] = new Pontos();
        
        
            //GLOBALS.neuronio.i++;
            //if(GLOBALS.neuronio.i > GLOBALS.neuronio.tMaxDivisoes){
            //GLOBALS.neuronio.print();
            
                //noLoop();
            //    break;
            //}
        
            
            //adicionar ponto
//             for(var x = 0; x < 9;x++){
//                 GLOBALS.neuronio.pontos[0].add(new Ponto(GLOBALS.neuronio.x[x],GLOBALS.neuronio.matriz[V][GLOBALS.neuronio.i][x]));
//             }
        

            //imprimir resultado parcial
//            GLOBALS.neuronio.printLinha(GLOBALS.neuronio.i);

            //canvas
//             GLOBALS.extremos.atualiza(GLOBALS.neuronio.pontos[0].setExtremos());
//             GLOBALS.neuronio.pontos[0].setRelative(GLOBALS.extremos,0,0,0,0);
//         Desenho.desenharLinhas(GLOBALS.neuronio.pontos[0],corModelo[2],1);
//         Desenho.desenharElipses(GLOBALS.neuronio.pontos[0],corModelo[0],5);
//         Desenho.desenharTexto(GLOBALS.neuronio.pontos[0].array,255);
//         Desenho.desenharStatus(['tempo = '+GLOBALS.neuronio.t[GLOBALS.neuronio.i].toFixed(3)]);
                
    
    }catch(err){alert('Erro draw: '+err);}
}


alert('temperatura OK');