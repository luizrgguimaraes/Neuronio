
const FRAMERATE = 60;
const CANVASW = 400;
const CANVASH = 1300;
const CORFUNDOCANVAS = 30;
class G{}




G.EntradasDefault = [
//      new Entrada('x1',1) ,new Entrada('x2',2) ,new Entrada('x3',3)
//     ,new Entrada('m1',1) ,new Entrada('m2',2) ,new Entrada('m3',3)
//     ,new Entrada('r1',0.1) ,new Entrada('r2',0.2) ,new Entrada('r3',0.3) ,new Entrada('r4',0.4)
   new Entrada('x1',1) ,new Entrada('x2',0) ,new Entrada('x3',0)
    ,new Entrada('m1',2) ,new Entrada('m2',2) ,new Entrada('m3',2)
    ,new Entrada('r1',0.01) ,new Entrada('r2',0.01) ,new Entrada('r3',0.01) ,new Entrada('r4',0.01)
    ,new Entrada('p1',0) ,new Entrada('p2',0) ,new Entrada('p3',0)
    ,new Entrada('h',1)
    ,new Entrada('iMax',1000)
    ];


function setup(user) {
    try{

        
        if(user){ 
            if(!G.auto){ 
                G.auto = true; loop(); return; 
            }else{ 
                G.auto = false; noLoop(); 
            } 
        }else{ 
            $('h1Titulo').innerHTML = 'SISTEMA MASSA MOLA';
            adicionarLinhaParametros(G.EntradasDefault);
            noLoop(); G.auto = false; 
        }

    	frameRate(FRAMERATE);
        createCanvas(CANVASH, CANVASW);

        //pegar valores do usuario        
        G.valor = new Array();
        
        for(var entrada in G.EntradasDefault){
            var nome = G.EntradasDefault[entrada].nome;
            G.valor[nome] = getValue(nome);
        }
    
        G.t = 0;
        G.i = 0;
        G.iMax = G.valor['iMax'];
        
        G.pontosx1 = new Pontos();
        G.pontosx2 = new Pontos();
        G.pontosx3 = new Pontos();
        
        G.pontosp1 = new Pontos();
        G.pontosp2 = new Pontos();
        G.pontosp3 = new Pontos();
        
        G.pontosx1p1 = new Pontos();
        
        //noLoop();        
        
        //imprmir rotulos
        
        var arrayPrint = new Array();
        arrayPrint.push('i');
        for(var valor in G.valor){
            arrayPrint.push(valor);
        }
        Print.tabela(arrayPrint,true);
        
        
        //loop();
        
        }catch(err){ alert('Erro setup: '+err); }                
}



function draw(user) {
    try{
    
        if(user){ 
            if(G.auto){ 
                G.auto = false; 
                noLoop(); 
                return; 
            }
        }
    
        
        background(CORFUNDOCANVAS);
        
        var arrayPrint = new Array();
        arrayPrint.push(G.i);
        for(var valor in G.valor){
            arrayPrint.push(G.valor[valor]);
        }
        
        Print.tabela(arrayPrint);
        
        if(!G.extremosx){G.extremosx = new Extremos(null,null,null,null);}
        G.pontosx1.add(new Ponto(G.t,G.valor['x1'])); G.extremosx.atualiza(G.pontosx1.setExtremos()); G.pontosx1.setRelative(G.extremosx,0.1,0.1); Desenho.desenharLinhas(G.pontosx1,Cores.getNewCor(1,0),3);
        //G.pontosx2.add(new Ponto(G.t,G.valor['x2'])); extremosx = extremosx.atualiza(G.pontosx2.setExtremos()); G.pontosx2.setRelative(extremosx,0.1,0.1); Desenho.desenharLinhas(G.pontosx2,Cores.getNewCor(2,0),3);
        //G.pontosx3.add(new Ponto(G.t,G.valor['x3'])); extremosx = extremosx.atualiza(G.pontosx3.setExtremos()); G.pontosx3.setRelative(extremosx,0.1,0.1); Desenho.desenharLinhas(G.pontosx3,Cores.getNewCor(3,0),3);
        
        if(!G.extremosp){G.extremosp = new Extremos(null,null,null,null);}
        G.pontosp1.add(new Ponto(G.t,G.valor['p1'])); G.extremosp.atualiza(G.pontosp1.setExtremos()); G.pontosp1.setRelative(G.extremosp,0.1,0.1); Desenho.desenharLinhas(G.pontosp1,Cores.getNewCor(2,0),3);
        //G.pontosp2.add(new Ponto(G.t,G.valor['p2'])); extremosp = extremosp.atualiza(G.pontosp2.setExtremos()); G.pontosp2.setRelative(extremosp,0.1,0.1); Desenho.desenharLinhas(G.pontosp2,Cores.getNewCor(2,1),3);
        //G.pontosp3.add(new Ponto(G.t,G.valor['p3'])); extremosp = extremosp.atualiza(G.pontosp3.setExtremos()); G.pontosp3.setRelative(extremosp,0.1,0.1); Desenho.desenharLinhas(G.pontosp3,Cores.getNewCor(3,1),3);

        if(!G.extremosxp){G.extremosxp = new Extremos(null,null,null,null);}
        G.pontosx1p1.add(new Ponto(G.valor['x1'],G.valor['p1'])); G.extremosxp.atualiza(G.pontosx1p1.setExtremos()); G.pontosx1p1.setRelative(G.extremosxp,0.1,0.1); Desenho.desenharLinhas(G.pontosx1p1,Cores.getNewCor(3,0),3);        
        
        var caixaOriginal1 = new CaixaOriginal(100,100,);
        var caixaOriginal2 = new CaixaOriginal(100+200,100);
        var caixaOriginal3 = new CaixaOriginal(100+400,100);

        var caixa1 = new Caixa(100+G.valor['x1'],100,Cores.getNewCor(1,0),G.valor['x1']);
        var caixa2 = new Caixa(100+200+G.valor['x2'],100,Cores.getNewCor(2,0),G.valor['x2']);
        var caixa3 = new Caixa(100+400+G.valor['x3'],100,Cores.getNewCor(3,0),G.valor['x3']);
        
        
        var h = G.valor['h'];
        G.t += h;
        
        var k1x1 = calculoX(1, G.valor['p1']);
        
        var k1x2 = calculoX(2, G.valor['p2']);
        var k1x3 = calculoX(3, G.valor['p3']);
        var k1p1 = momento1(G.valor['x1'],G.valor['x2'],G.valor['x3']);
        var k1p2 = momento2(G.valor['x1'],G.valor['x2'],G.valor['x3']);
        var k1p3 = momento3(G.valor['x1'],G.valor['x2'],G.valor['x3']);
        
        var k2x1 = calculoX(1, G.valor['p1']+ h/2*k1x1);
        var k2x2 = calculoX(2, G.valor['p2']+ h/2*k1x2);
        var k2x3 = calculoX(3, G.valor['p3']+ h/2*k1x3);
        
        //Print.tabela([G.valor['x1'],h/2,k1p1]);
        var k2p1 = momento1(G.valor['x1']+h/2*k1p1, G.valor['x2']+h/2*k1p1,G.valor['x3']+h/2*k1p1);
        var k2p2 = momento2(G.valor['x1']+h/2*k1p2, G.valor['x2']+h/2*k1p2,G.valor['x3']+h/2*k1p2);
        var k2p3 = momento3(G.valor['x1']+h/2*k1p3, G.valor['x2']+h/2*k1p3,G.valor['x3']+h/2*k1p3);
        
        var k3x1 = calculoX(1, G.valor['p1']+ h/2*k2x1);
        var k3x2 = calculoX(2, G.valor['p2']+ h/2*k2x2);
        var k3x3 = calculoX(3, G.valor['p3']+ h/2*k2x3);
        var k3p1 = momento1(G.valor['x1']+h/2*k2p1, G.valor['x2']+h/2*k2p1,G.valor['x3']+h/2*k2p1);
        var k3p2 = momento2(G.valor['x1']+h/2*k2p2, G.valor['x2']+h/2*k2p2,G.valor['x3']+h/2*k2p2);
        var k3p3 = momento3(G.valor['x1']+h/2*k2p3, G.valor['x2']+h/2*k2p3,G.valor['x3']+h/2*k2p3);
        
        var k4x1 = calculoX(1, G.valor['p1']+ h*k3x1);
        var k4x2 = calculoX(2, G.valor['p2']+ h*k3x2);
        var k4x3 = calculoX(3, G.valor['p3']+ h*k3x3);
        var k4p1 = momento1(G.valor['x1']+h*k3p1, G.valor['x2']+h*k3p1,G.valor['x3']+h*k3p1);
        var k4p2 = momento2(G.valor['x1']+h*k3p2, G.valor['x2']+h*k3p2,G.valor['x3']+h*k3p2);
        var k4p3 = momento3(G.valor['x1']+h*k3p3, G.valor['x2']+h*k3p3,G.valor['x3']+h*k3p3);
        
        G.valor['x1'] = G.valor['x1'] + h/6*(k1x1 + 2*k2x1 + 2*k3x1 + k4x1); 
        G.valor['x2'] = G.valor['x2'] + h/6*(k1x2 + 2*k2x2 + 2*k3x2 + k4x2);
        G.valor['x3'] = G.valor['x3'] + h/6*(k1x3 + 2*k2x3 + 2*k3x3 + k4x3);
        G.valor['p1'] = G.valor['p1'] + h/6*(k1p1 + 2*k2p1 + 2*k3p1 + k4p1);
        G.valor['p2'] = G.valor['p2'] + h/6*(k1p2 + 2*k2p2 + 2*k3p2 + k4p2);
        G.valor['p3'] = G.valor['p3'] + h/6*(k1p3 + 2*k2p3 + 2*k3p3 + k4p3);
        
        G.i++;
        if(G.i > G.iMax){
            noLoop();
        }
        
        }catch(err){ alert('Erro draw: '+err); }
}


function calculoX(id, P){
    try{
        return P/G.valor['m'+id];
    }catch(err){ alert('Erro calculoDisparo: '+err); }
}

function momento1(x1,x2,x3){
    
    var res = G.valor['r2']*x2 - (G.valor['r1']+G.valor['r2'])*x1;
    return res;
}

function momento2(x1,x2,x3){
    return G.valor['r2']*x1 - (G.valor['r2']+G.valor['r3'])*x2 + G.valor['r3']*x3;
}

function momento3(x1,x2,x3){
    return G.valor['r3']*x2 - (G.valor['r3']+G.valor['r4'])*x3;
}


class GraficosColection{
    printRotulos(){
    
        var rotulos = new Array();
        rotulos.push('i', 't'); 
        for(var linha in G.EntradasDefault){
            for(var propName in this){
            
                if(this[propName][linha].cor){
                    rotulos.push([propName,this[propName][linha].cor]);
                }else{
                    rotulos.push(propName);
                }    
            }
        } 
        Print.tabela(rotulos,true);
    }    
    
    printLinha(nLinha){
        try{    
            
            if(nLinha == 0){
                this.printRotulos();
            }
            
            
            var tempo = 0;
            var resultados = new Array();
            for(var linha in G.EntradasDefault){
                for(var calculo in this){
                
                    if(nLinha >= this[calculo][linha].array.length){
                        resultados.push("");
                        continue;//cada calculo pode ter numero de iteracoes diferentes
                    }
                    tempo = this[calculo][linha].array[nLinha].x; 
                    resultados.push(this[calculo][linha].array[nLinha].y);
                }
            }
            
            var linha = new Array();
            linha.push(nLinha, tempo);
            for(var r in resultados){ linha.push(resultados[r]); }
            Print.tabela(linha);
            
        }catch(err){alert('Erro Diferencial.imprimirResultadoImediato(): '+err);}
    }
    
    setRelatives(){
        try{
            var extremos = new Array();
            
            var calculo;
            for(calculo in this){
                extremos[calculo] = this[calculo].setExtremos();
            }
            
            var extremosFinal = new Extremos(null,null,null,null);
            for(calculo in this){
                extremosFinal = extremosFinal.atualiza(extremos[calculo]);
            }
            
            for(calculo in this){
                this[calculo].setRelative(extremosFinal,0.1,0.1);
            }
            
            
            return extremosFinal;
            
        }catch(err){alert('Erro Diferencial.setRelatives(): '+err);}
    }
    
    desenharGraficos(){
        try{
            
            var calculo;
            
        for(var linha in G.EntradasDefault){    
            for(calculo in this){                                     
                var cor = [255,255,255];
                var strokeW = 3;
                
                if(this[calculo][linha].cor)cor = this[calculo][linha].cor;
                if(this[calculo][linha].strokeW) strokeW = this[calculo][linha].strokeW;
                
                Desenho.desenharLinhas(this[calculo][linha],cor,strokeW);
                //Desenho.desenharElipses(this[calculo],Cores.getNewCor(),5);
            }
        }
        }catch(err){alert('Erro Diferencial.desenharGraficos(): '+err);}
    }
}

class Caixa{
    constructor(X,Y, cor, posicao){
        try{

        noStroke();
        fill(cor);
        rect(X,Y,100,70);
        
       fill(255);
       strokeWeight(0);
       textSize(15);
       text(posicao.toFixed(2),X,Y-10);
            
        }catch(err){alert('Erro new Caixa(): '+err);}
    }

}

class CaixaOriginal{
    constructor(X,Y){
        try{

        noStroke();
        fill(255);
        rect(X,Y,100,70);
        
            
        }catch(err){alert('Erro new Caixa Original(): '+err);}
    }

}


//alert('disparo OK');