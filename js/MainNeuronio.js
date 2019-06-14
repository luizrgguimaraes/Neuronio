const FRAMERATE = 100;
const CANVASW = 400;
const CANVASH = 700;
const CORFUNDOCANVAS = 50;
class GLOBALS{}

function lerParametros(){        
    try{
        GLOBALS.passoT = parseFloat($('passoT').value);
        GLOBALS.passoX = parseFloat($('passoX').value);
        GLOBALS.tempoMaximo = parseFloat($('tempoMaximo').value);
         
    }catch(err){
        alert('Erro lerParametros: '+err);
    }        
}        


function setup(flag) {
    try{
        frameRate(FRAMERATE);
        createCanvas(CANVASH, CANVASW);
        background(CORFUNDOCANVAS);
        
        
        lerParametros();
        
        GLOBALS.neuronio = new Neuronio(GLOBALS.passoT,GLOBALS.passoX,GLOBALS.tempoMaximo);        
        GLOBALS.neuronio.i = 1;
        


        if(!GLOBALS.extremos){
            GLOBALS.extremos = new Extremos(null,null,null,null);
        }
        
        
        for(var x = 0; x < 9;x++){
            GLOBALS.neuronio.pontos[x].add(new Ponto(0,GLOBALS.neuronio.matriz[V][0][0]));
        }
        
        GLOBALS.neuronio.printHead(0);
        GLOBALS.neuronio.printLinha(0);
        

        noLoop();
        
    }catch(err){alert('Erro setup: '+err);}
    
        
}
const IMAX = 10;
function draw() {
    try{
        background(CORFUNDOCANVAS);
        //GLOBALS.barra.printLinha(GLOBALS.barra.linha);

        //Calculo
        GLOBALS.neuronio.calcularLinha(GLOBALS.neuronio.i);

        //reset nos pontos do Grafico Espaca x Voltagem
        GLOBALS.neuronio.pontosEspacoVoltagem = new Pontos();

        //adicionar pontos do Grafico Espaco x Voltagem
        for(var x = 0; x < 11;x++){
            GLOBALS.neuronio.pontosEspacoVoltagem.add(new Ponto(GLOBALS.neuronio.x[x],GLOBALS.neuronio.matriz[V][GLOBALS.neuronio.i][x]));
        }
        
        //apresentar grafico Espaco X Voltagem
        GLOBALS.extremos.atualiza(GLOBALS.neuronio.pontosEspacoVoltagem.setExtremos());
        GLOBALS.neuronio.pontosEspacoVoltagem.setRelative(GLOBALS.extremos,0.1,0.1,0.1,0.1);
        Desenho.desenharLinhas(GLOBALS.neuronio.pontosEspacoVoltagem,corModelo[2],1);
        Desenho.desenharElipses(GLOBALS.neuronio.pontosEspacoVoltagem,corModelo[0],5);
        Desenho.desenharTexto(GLOBALS.neuronio.pontosEspacoVoltagem.array,255);
        Desenho.desenharStatus(['tempo = '+GLOBALS.neuronio.t[GLOBALS.neuronio.i].toFixed(3)]);
        Desenho.desenharEixos2(GLOBALS.extremos,[255,0,0],0,'mV','metros');

        //imprmir linha atual 
        GLOBALS.neuronio.printLinha(GLOBALS.neuronio.i);

        //condicao de parada
        GLOBALS.neuronio.i++;
        if(GLOBALS.neuronio.i > GLOBALS.neuronio.tMaxDivisoes){
            noLoop();
        }
    

        
        //GLOBALS.neuronio.pontos[x].add(new Ponto(GLOBALS.neuronio.t[GLOBALS.neuronio.i],GLOBALS.neuronio.matriz[V][GLOBALS.neuronio.i][x+1]));
        


                
    
    }catch(err){alert('Erro draw: '+err);}
}

    


//alert('temperatura OK');