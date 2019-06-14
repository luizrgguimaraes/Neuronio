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
        //createCanvas(CANVASH, CANVASW);
        //background(CORFUNDOCANVAS);

//        GLOBALS.passo = 0.1;
       GLOBALS.maxIteracao = 100;
       GLOBALS.iteracao = 0;
//        GLOBALS.resultado = null;
//        GLOBALS.analitico = null;
        GLOBALS.x = new Array();
        GLOBALS.x[0] = 13;
        GLOBALS.y = new Array();//congruencial
        GLOBALS.y[0] = 13;
        GLOBALS.i = new Array();
        
        
        GLOBALS.p = 71;
        GLOBALS.m = 2033;
        GLOBALS.a = 150;
        //noLoop();
        
    }catch(err){alert('Erro setup: '+err);}
    
        
}
function draw() {
    try{
            //background(CORFUNDOCANVAS);
            
            
            
            GLOBALS.x[GLOBALS.iteracao+1]  = (100*GLOBALS.x[GLOBALS.iteracao])%GLOBALS.p;
            GLOBALS.y[GLOBALS.iteracao+1]  = (GLOBALS.a + 100*GLOBALS.x[GLOBALS.iteracao])%GLOBALS.p;
            GLOBALS.i.push(GLOBALS.iteracao);
            GLOBALS.iteracao++;
            if(GLOBALS.iteracao>GLOBALS.maxIteracao){
                noLoop();
                Print.tabela(GLOBALS.i,true);
                Print.tabela(GLOBALS.x);
                Print.tabela(GLOBALS.y);
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