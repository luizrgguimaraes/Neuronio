const FRAMERATE = 60;
const CANVASW = 400;
const CANVASH = 800;
const CORFUNDOCANVAS = 30;
class G{}
class H{}


class Entrada{
    constructor(nome, padrao){
        this.nome = nome;
        this.padrao = padrao;
    }

}

G.EntradasDefault = new Array();

G.EntradasDefault[0] = [
    new Entrada('massa','0.0095')     //https://armasdefogoemunicoes.blogspot.com/2008/12/uma-munio-762x51mm-p-spl-de-potncia.html
    ,new Entrada('C','0.5')          
    ,new Entrada('Par','1.293')      //https://pt.wikipedia.org/wiki/Equa%C3%A7%C3%A3o_do_arrasto
    ,new Entrada('Area',Math.pow(7.62/2*Math.pow(10,-3),2)*Math.PI)
    ,new Entrada('g','10')
    ,new Entrada('v0','850') //https://saladearmas-oficial.blogspot.com/2017/01/fuzil-fn-fal-cal-762.html
    ,new Entrada('h','0.1')
    ];

G.EntradasDefault[1] = [
    new Entrada('massa','0.0095')
    ,new Entrada('C','0.5')
    ,new Entrada('Par','1.225')
    ,new Entrada('Area','0.00001197')
    ,new Entrada('g','10')
    ,new Entrada('v0','100')
    ,new Entrada('h','0.1')
    ];


G.EntradasDefault[2] = [
    new Entrada('massa','1')
    ,new Entrada('C','0.5')
    ,new Entrada('Par','1.225')
    ,new Entrada('Area','0.00001197')
    ,new Entrada('g','10')
    ,new Entrada('v0','30')
    ,new Entrada('h','0.1')
    ];


function setup(flag) {
    try{

        
        if(flag){
            if(!G.auto){
                G.auto = true;
                loop();
                

                return;
                
            }else{
                G.auto = true;
                loop();
                
                //novo Calculo
                //$('tabelaResultados').innerHTML="";
            }
        }else{
            noLoop();
            G.auto = true;

        }


        
        if(!flag){

            $('h1Titulo').innerHTML = 'Calculo de velocidade e distância percorrida por um projétil';
            for(var linha in G.EntradasDefault){

                adicionarLinhaParametros(linha);
            }
        }
        
    	frameRate(FRAMERATE);
        createCanvas(CANVASH, CANVASW);
        

        G.entrada = new Array();
        G.alfa = new Array();
        G.continuar = new Array();
        for(var linha in G.EntradasDefault){

            for(var entrada in G.EntradasDefault[0]){
                var nome = G.EntradasDefault[0][entrada].nome;
                //alert(nome); 
                G.entrada[nome+linha] = getValue(nome,linha);
                //alert('85'+G.entrada[nome]);
                
            }
            G.alfa[linha] = (1/2)*(1/G.entrada['massa'+linha]) * G.entrada['C'+linha] * G.entrada['Par'+linha] * G.entrada['Area'+linha];
        } 
                
        //alert('GAlfa = '+G.alfa);
        
        G.t = new Array();
        
        G.i = 0;
        G.iMax = 350;        
        G.v = new Array();
        G.y = new Array();
        G.gc  = new GraficosColection();
        G.gc.dvdx = new Array();
        G.gc.dydx = new Array();
        G.gc.arrasto = new Array();
        G.gc.peso = new Array();

        for(var linha in G.EntradasDefault){
            G.t[linha] = 0;
            G.v[linha] = G.entrada['v0'+linha];
            G.y[linha] = 0;
            G.gc.dvdx[linha] = new Pontos();
            G.gc.dydx[linha] = new Pontos();
            G.gc.arrasto[linha] = new Pontos();
            G.gc.peso[linha] = new Pontos();
            
            
            G.gc.dvdx[linha].cor = Cores.getNewCor(linha,0);
            G.gc.dydx[linha].cor = Cores.getNewCor(linha,1);
            G.continuar[linha] = true;
        }        
        
        
        H.hMax = 0.1;
        H.hMin = 0.001;
        H.t = 0;
        H.tMax = 32;
        H.w = G.v[0];
        H.h = 0.001;
        H.FLAG = 1;
        H.TOL = 1;
        H.pontos = new Pontos();
        H.pontosh = new Pontos();
        H.pontos.cor = Cores.getNewCor(4,0);
                
        //Print.tabela([H.t,H.w]);                
        
        
        
        
        }catch(err){ alert('Erro setup: '+err); }                
}



function draw(flagDraw) {
    try{
    
        if(flagDraw){
            if(G.auto){
                G.auto = false;
                noLoop();
                return;
            }
        }
    
        background(CORFUNDOCANVAS);
        
        var extremoVelocidade = new Extremos(null,null,null,null);
        var extremoAltura = new Extremos(null,null,null,null);
        
        for(var linha in G.EntradasDefault){
            
            if(G.continuar[linha])G.gc.dvdx[linha].add(new Ponto(G.t[linha], G.v[linha]));
            if(G.continuar[linha])G.gc.dydx[linha].add(new Ponto(G.t[linha], G.y[linha]));
            if(G.continuar[linha])G.gc.arrasto[linha].add(new Ponto(G.t[linha], G.alfa[linha]*G.entrada['massa'+linha]*Math.abs(G.v[linha])*G.v[linha],2));
            if(G.continuar[linha])G.gc.peso[linha].add(new Ponto(G.t[linha], G.entrada['massa'+linha]*G.entrada['g'+linha] ));
            
            extremoVelocidade.atualiza(G.gc.dvdx[linha].setExtremos());
            extremoAltura.atualiza(G.gc.dydx[linha].setExtremos());
        }
        G.gc.printLinha(G.i);
        Print.tabela(['h','t','w','R']);
        Print.tabela([H.h,H.t,H.w,R]);
        
        
        
        if(G.extremoVelocidade){
            G.extremoVelocidade.atualiza(extremoVelocidade);
            G.extremoAltura.atualiza(extremoAltura);
        }else{
            G.extremoVelocidade = extremoVelocidade;        
            G.extremoAltura = extremoAltura;
        }
        
        
        var z=0;
        for(var linha in G.EntradasDefault){
            G.gc.dvdx[linha].setRelative(G.extremoVelocidade,0.2,0.2);
            //Print.tabela([G.extremoVelocidade.imprimir('velocidadde')]);
            G.gc.dydx[linha].setRelative(G.extremoAltura,0.2,0.2);
            Desenho.desenharValorAtual(G.t[linha],G.v[linha],G.gc.dvdx[linha].cor,z++,'m/s');
            Desenho.desenharValorAtual(G.t[linha],G.y[linha],G.gc.dydx[linha].cor,z++,'m');
            
        }
        Desenho.desenharValorAtual(H.t,H.w,H.pontos.cor,z++,'m/s');
        

        
        G.gc.desenharGraficos();
        
        H.pontos.setRelative(extremoVelocidade,0.2,0.2);
        H.pontosh.setRelative(H.pontosh.setExtremos(),0.2,0.2);
        Desenho.desenharLinhas(H.pontos,H.pontos.cor,3);
        Desenho.desenharLinhas(H.pontosh,255,3);
        
        Desenho.desenharEixos(G.extremoVelocidade,255,0,'m/s');
        Desenho.desenharEixos(G.extremoAltura,255,1,'m');

        G.i++;
        
        var flagContinua = false;
        for(var linha in G.EntradasDefault){
            //alert(G.y[linha]);
            if(G.y[linha] < 0){
                G.continuar[linha] = false;
                
                //if(linha==0)H.FLAG = 0;
            }else{
                G.continuar[linha] = true;
                var flagContinua = true;        
                
                
                if(H.FLAG>0 && linha==0){
                
                        
                        
                        var m1 = H.h * calculoDisparo(G.alfa[linha], G.entrada['g'+linha], H.w);
                        var m2 = H.h * calculoDisparo(G.alfa[linha], G.entrada['g'+linha], H.w + (1/4*m1));
                        var m3 = H.h * calculoDisparo(G.alfa[linha], G.entrada['g'+linha], H.w + (3/32*m1)      +(9/32*m2));
                        var m4 = H.h * calculoDisparo(G.alfa[linha], G.entrada['g'+linha], H.w + (1932/2197*m1) -(7200/2197*m2) +(7296/2197*m3) );
                        var m5 = H.h * calculoDisparo(G.alfa[linha], G.entrada['g'+linha], H.w + (439/216*m1)   -(8*m2)         +(3680/513*m3)      -(845/4104*m4) );
                        var m6 = H.h * calculoDisparo(G.alfa[linha], G.entrada['g'+linha], H.w - (8/27*m1)      +(2*m2)         -(3544/2565*m3)     +(1859/4104*m4)     -(11/40*m5) );
                        
                        //Print.tabela([m1,m2,m3,m4,m5,m6]);
                        
                        var R = 1/H.h*Math.abs(1/360*m1 - 128/4275*m3 - 2197/75240*m4 + 1/50*m5 + 2/55*m6);
                        
                        //Print.tabela([H.t,R,H.TOL]);
                        
                        if(R<=H.TOL){
                            H.t += H.h;
                            H.w = H.w + 25/216*m1 + 1408/2565*m3 + 2197/4104*m4 - 1/5*m5;
                            
                            
                            
                                
                        }
                        var omega = 0.84*Math.pow(H.TOL/R,1/4);
                        if(omega <= 0.1){
                            H.h = 0.1*H.h;
                        }else if(omega >= 4 ){
                            H.h = 4*H.h;
                        }else{
                            H.h = omega*H.h;
                        }
                        
                        if(H.h > H.hMax){
                            H.h = H.hMax;
                        }
                        if(H.t >= H.tMax){
                            alert('t Maximo');
                            H.FLAG = 0;
                        }else if( (H.t + H.h) > H.tMax){
                            H.h = H.tMax - H.t;
                        }else if(H.h < H.hMin){
                            alert('H Minimo');
                            H.FLAG = 0;                        
                        }
                        H.pontos.add(new Ponto(H.t,H.w));
                        H.pontosh.add(new Ponto(H.t,H.h));
                        //Print.tabela(['h = '+H.h]);
                }
                        
                 
                var k1 = calculoDisparo(G.alfa[linha], G.entrada['g'+linha], G.v[linha]);
                var k2 = calculoDisparo(G.alfa[linha], G.entrada['g'+linha], G.v[linha] + (G.entrada['h'+linha]/2*k1));
                var k3 = calculoDisparo(G.alfa[linha], G.entrada['g'+linha], G.v[linha] + (G.entrada['h'+linha]/2*k2));
                var k4 = calculoDisparo(G.alfa[linha], G.entrada['g'+linha], G.v[linha] + (G.entrada['h'+linha]*k3));
                
                
                var L1 = G.v[linha];
                var L2 = G.v[linha] + (G.entrada['h'+linha]/2*L1);
                var L3 = G.v[linha] + (G.entrada['h'+linha]/2*L2);
                var L4 = G.v[linha] + (G.entrada['h'+linha]*L3);
                    
                G.v[linha] = G.v[linha] + (G.entrada['h'+linha]/6)*(k1 + (2*k2) + (3*k3) + k4);
                G.y[linha] = G.y[linha] + (G.entrada['h'+linha]/6)*(L1 + (2*L2) + (3*L3) + L4);
        
                G.t[linha] += G.entrada['h'+linha];
            }
        }
        
        if(flagContinua == false){
            noLoop();
        }

        }catch(err){ alert('Erro draw: '+err); }
}


function calculoDisparo(alfa, g, v){
    try{
        var fator = -1;
        if(v<0)fator = 1;
        
        
        
        return fator*alfa*v*v - g;
        //return alfa*v*v - g;

    }catch(err){ alert('Erro calculoDisparo: '+err); }
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
            
        }catch(err){alert('Erro Diferencial.setExtremos(): '+err);}
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
        }catch(err){alert('Erro Diferencial.setExtremos(): '+err);}
    }
}

function adicionarLinhaParametros(indice){
    try{
            
            var table = $('tableComandos');
            
            var tr = document.createElement('tr');                    
            table.appendChild(tr);
            
            for(var entrada in G.EntradasDefault[indice]){
                var label = document.createElement('h7');
                label.style.backgroundColor = 'rgb('+Cores.getNewCor(indice,0)+')';
                label.innerHTML = G.EntradasDefault[indice][entrada].nome;
                var input = document.createElement('input');
                input.id = G.EntradasDefault[indice][entrada].nome+indice;
                input.value = G.EntradasDefault[indice][entrada].padrao;
                input.style.width = '100px';            
                var td1 = document.createElement('td');
                td1.appendChild(label);
                var td2 = document.createElement('td');
                td2.appendChild(input);
                tr.appendChild(td1);
                tr.appendChild(td2);
            }

    }catch(err){ alert('Erro adicionarLinhaParametros(): '+err); }
}

function getValue(entrada, indice){
    return parseFloat($(entrada+indice).value);
}



//alert('disparo OK');