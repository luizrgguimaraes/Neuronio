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
        GLOBALS.comprimento = parseFloat($('comprimento').value);
        GLOBALS.n = parseFloat($('n').value);
        GLOBALS.m = parseFloat($('m').value);
        GLOBALS.h = parseFloat($('h').value);
        GLOBALS.gk = parseFloat($('gk').value);
        GLOBALS.gna = parseFloat($('gna').value);
        GLOBALS.gl = parseFloat($('gl').value);
        GLOBALS.Vk = parseFloat($('Vk').value);
        GLOBALS.Vna = parseFloat($('Vna').value);
        GLOBALS.Vl = parseFloat($('Vl').value);
        GLOBALS.a = parseFloat($('a').value);
        GLOBALS.R = parseFloat($('R').value);
        GLOBALS.Cm = parseFloat($('Cm').value);
        GLOBALS.Vi = parseFloat($('Vi').value);
        GLOBALS.Vf = parseFloat($('Vf').value);
        
        if($('graficoEspacoVoltagem').checked){
            GLOBALS.graficoEspacoVoltagem = true;
        }else{
            GLOBALS.graficoEspacoVoltagem = false;        
        }         
    }catch(err){
        alert('Erro lerParametros: '+err);
    }        
}        


function setup(flag) {
    try{
        frameRate(FRAMERATE);
        createCanvas(CANVASH, CANVASW);
        background(CORFUNDOCANVAS);
        Print.limpar();
        
        lerParametros();
                                                                                            //n,    m,          h,      gk, gna,gl, Vk,     Vna,    Vl,     a,  R,      Cm, Vi,         Vf){  
        GLOBALS.neuronio = new Neuronio(GLOBALS.passoT,GLOBALS.passoX,GLOBALS.tempoMaximo,GLOBALS.comprimento,GLOBALS.n,GLOBALS.m,GLOBALS.h, GLOBALS.gk,GLOBALS.gna, GLOBALS.gl,GLOBALS.Vk, GLOBALS.Vna,  GLOBALS.Vl,GLOBALS.a, GLOBALS.R,   GLOBALS.Cm,  GLOBALS.Vi,    GLOBALS.Vf);        
        GLOBALS.neuronio.i = 1;
        
        if(!GLOBALS.extremos){
            GLOBALS.extremos = new Extremos(null,null,null,null);
        }
        if(!GLOBALS.extremos2){
            GLOBALS.extremos2 = new Extremos(null,null,null,null);
        }
        
        for(var x = 0; x <= GLOBALS.neuronio.xMaxDivisoes;x++){ //GLOBALS.neuronio.xMaxDivisoes
            if(GLOBALS.neuronio.pontos[x] == undefined){
                GLOBALS.neuronio.pontos[x] = new Pontos();
            }
            GLOBALS.neuronio.pontos[x].add(new Ponto(0,GLOBALS.neuronio.matriz[V][0][0]));
        }
        
        GLOBALS.neuronio.printHead(0);
        GLOBALS.neuronio.printLinha(0);
        GLOBALS.flagSegundaVez = false;

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

        
        if(GLOBALS.graficoEspacoVoltagem){
                //reset nos pontos do Grafico Espaca x Voltagem
                GLOBALS.neuronio.pontosEspacoVoltagem = new Pontos();
        
                //adicionar pontos do Grafico Espaco x Voltagem
                for(var x = 0; x <= GLOBALS.neuronio.xMaxDivisoes;x++){
                    GLOBALS.neuronio.pontosEspacoVoltagem.add(new Ponto(GLOBALS.neuronio.x[x],GLOBALS.neuronio.matriz[V][GLOBALS.neuronio.i][x]));
                }
                
                //apresentar grafico Espaco X Voltagem
                GLOBALS.extremos.atualiza(GLOBALS.neuronio.pontosEspacoVoltagem.setExtremos());
                GLOBALS.neuronio.pontosEspacoVoltagem.setRelative(GLOBALS.extremos,0.1,0.1,0.1,0.1);
                Desenho.desenharLinhas(GLOBALS.neuronio.pontosEspacoVoltagem,corModelo[2],1);
                Desenho.desenharElipses(GLOBALS.neuronio.pontosEspacoVoltagem,corModelo[0],5);
                Desenho.desenharTexto(GLOBALS.neuronio.pontosEspacoVoltagem.array,[255,0,0]);
                Desenho.desenharStatus(['tempo = '+GLOBALS.neuronio.t[GLOBALS.neuronio.i].toFixed(3)]);
                Desenho.desenharEixos2(GLOBALS.extremos,[255,0,0],0,'mV','metros');
        
        }else{
            for(var x = 0; x <= GLOBALS.neuronio.xMaxDivisoes;x++){
                    if(GLOBALS.flagSegundaVez ==false){
                        GLOBALS.neuronio.pontos[x].add(new Ponto(GLOBALS.neuronio.t[GLOBALS.neuronio.i],GLOBALS.neuronio.matriz[V][GLOBALS.neuronio.i][x]));
                    }
                    
                    GLOBALS.extremos2.atualiza(GLOBALS.neuronio.pontos[x].setExtremos());
                    
            }
            for(var x = 0; x <= GLOBALS.neuronio.xMaxDivisoes;x++){//nao precisa imprimir espaco 10 porque este é sempre 0
            //    var x = 0;
                GLOBALS.neuronio.pontos[x].setRelative(GLOBALS.extremos2,0.1,0.1,0.1,0.1);
                Desenho.desenharEixos2(GLOBALS.extremos2,[255,255,255],0,'mV',' s');
                Desenho.desenharLinhas(GLOBALS.neuronio.pontos[x],corModelo[x],1);
                
                Desenho.desenharTexto(GLOBALS.neuronio.pontos[x].array.slice(0,GLOBALS.neuronio.i+1),corModelo[x],true,-15);
                Desenho.desenharStatus(['tempo = '+GLOBALS.neuronio.t[GLOBALS.neuronio.i].toFixed(3)]);
            }
        }
        
        
        
    
        //imprmir linha atual 
        GLOBALS.neuronio.printLinha(GLOBALS.neuronio.i);

        //condicao de parada
        GLOBALS.neuronio.i++;
        if(GLOBALS.neuronio.i > GLOBALS.neuronio.tMaxDivisoes){
            GLOBALS.neuronio.i = 1;
            noLoop();
            GLOBALS.flagSegundaVez = true;
        }

        
        //GLOBALS.neuronio.pontos[x].add(new Ponto(GLOBALS.neuronio.t[GLOBALS.neuronio.i],GLOBALS.neuronio.matriz[V][GLOBALS.neuronio.i][x+1]));
        


                
    
    }catch(err){alert('Erro draw: '+err);}
}

    


//alert('temperatura OK');