const FRAMERATE = 60;
const CANVASW = 400;
const CANVASH = 700;
const CORFUNDOCANVAS = 50;
class GLOBALS{}

function setup(flag) {
    try{
        frameRate(FRAMERATE);
        createCanvas(CANVASH, CANVASW);
        background(CORFUNDOCANVAS);
        
        GLOBALS.neuronio = new Neuronio();        
        
        GLOBALS.neuronio.i = 1;

        if(!GLOBALS.extremos){
            GLOBALS.extremos = new Extremos(null,null,null,null);
        }
        
        
    }catch(err){alert('Erro setup: '+err);}
    
        
}
const IMAX = 10;
function draw() {
    try{
        background(CORFUNDOCANVAS);
        //GLOBALS.barra.printLinha(GLOBALS.barra.linha);
        
        GLOBALS.neuronio.calcularLinha(GLOBALS.neuronio.i);

        for(var x = 0; x < 10;x++){
        
            GLOBALS.neuronio.pontos[x].add(new Ponto(GLOBALS.neuronio.t[GLOBALS.neuronio.i],GLOBALS.neuronio.matriz[V][GLOBALS.neuronio.i][x+1]));
        
        }
        
        
        GLOBALS.neuronio.i++;
        if(GLOBALS.neuronio.i > GLOBALS.neuronio.tMaxDivisoes){
            GLOBALS.neuronio.print(IMAX);
            
            for(var x = 0; x < 10;x++){
                GLOBALS.extremos.atualiza(GLOBALS.neuronio.pontos[x].setExtremos());
                GLOBALS.extremos.imprimir();
                
            }
            for(var x = 0; x < 10;x++){
                GLOBALS.neuronio.pontos[x].setRelative(GLOBALS.extremos,0,0,0,0);
                Desenho.desenharLinhas(GLOBALS.neuronio.pontos[x],corModelo[x],2);
            }
            
            
            
            noLoop();
        }
        
        
    
    }catch(err){alert('Erro draw: '+err);}
}

    


alert('temperatura OK');