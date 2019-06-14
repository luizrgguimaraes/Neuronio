const FRAMERATE = 60;
const CANVASW = 400;
const CANVASH = 700;
const CORFUNDOCANVAS = 50;
const QUESTAO_A = 0;
const QUESTAO_B = 1;

class G{}

class Empresa{
    constructor(qtdVendasMes,custoInsumoA,custoInsumoB,precoP1,precoP2){
        this.custoFixo = 3500 + 900 + 600 + (5 * 3500) + (2*4000) + (2*2000) + (1*6000);
        //this.custoFixo = 0;
        this.precoP1 = precoP1;
        this.precoP2 = precoP2;
        this.custoInsumoA = custoInsumoA;
        this.custoInsumoB = custoInsumoB;    
        this.custoVariavelMes = new Array();
        this.faturamentoMes = new Array();
        this.qtdVendasMes = qtdVendasMes;
        this.maxProducao = 400;
        this.lucroAcumulado = 0;
        this.pontosQtdP1 = new Pontos();
        this.pontosQtdP2 = new Pontos();
        this.pontosLucro = new Pontos();
        this.pontosQtdP1.cor = Cores.getNewCor(0,0);
        this.pontosQtdP2.cor = Cores.getNewCor(1,0);
        this.pontosLucro.cor = Cores.getNewCor(2,0);    
    }
    
    atualizarCustoVariavelMes(mes,qtdP1,qtdP2){
        try{
            var qtdA = 0;
            var qtdB = 0;
            
            for(var i = 1; i <= qtdP1; i++){
                qtdA+=2;
                qtdB+=1;
            }
            for(var i = 1; i <= qtdP2; i++){
                qtdA+=2;
                qtdB+=3;
            }
            
            this.custoP1 = qtdP1 * 2 * this.custoInsumoA + qtdP1 * 1 * this.custoInsumoB;
            this.custoP2 = qtdP2 * 2 * this.custoInsumoA + qtdP2 * 3 * this.custoInsumoB;
            
            this.custoVariavelMes[mes] = (qtdA * 15) + (qtdB * 25); 

            return this.custoVariavelMes[mes]; 
        
        }catch(err){ alert('Erro atualizarCustoVariavelMes: '+err); }
    }
    
    atualizarFaturamentoMes(mes,qtdP1,qtdP2){
        try{

            this.faturamentoMes[mes] = (qtdP1*this.precoP1+ qtdP2*this.precoP2); 

            return this.faturamentoMes[mes]; 
        
        }catch(err){ alert('Erro atualizarFaturamentoMes: '+err); }
    }
}


function lerParametros(){        
    try{
        G.parametros = new Object();
        G.parametros.custoInsumoA = parseFloat($('custoInsumoA').value);
        G.parametros.custoInsumoB = parseFloat($('custoInsumoB').value);
        G.parametros.precoP1 = parseFloat($('precoP1').value);
        G.parametros.precoP2 = parseFloat($('precoP2').value);
         
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
        Print.limpar();


        var qtdVendasMes = new Array();
        
        qtdVendasMes[0] = 250;
        qtdVendasMes[1] = Math.floor(qtdVendasMes[0]*1.1);
        qtdVendasMes[2] = 320;
        qtdVendasMes[3] = 320;
        qtdVendasMes[4] = 320;
        qtdVendasMes[5] = 320;
        qtdVendasMes[6] = 320;
        qtdVendasMes[7] = 320;
        qtdVendasMes[8] = 320;
        qtdVendasMes[9] = 320;
        qtdVendasMes[10] = 320;
        qtdVendasMes[11] = 320;
        
        G.empresa = new Empresa(qtdVendasMes, G.parametros.custoInsumoA, G.parametros.custoInsumoA, G.parametros.precoP1, G.parametros.precoP2);
        G.mes = 0;
        G.maxMes = 11;
        G.questao = QUESTAO_A;
                
        noLoop();
        
        if(!G.extremos){
            G.extremos = new Extremos(null,null,null,null);
        }
        
        
    }catch(err){alert('Erro setup: '+err);}
        
}


function draw() {
    try{
            //limpar Tela
            background(CORFUNDOCANVAS);
            
            //Calculo
            var qtdP1 = Math.floor((Math.random() * G.empresa.qtdVendasMes[G.mes]) + 1);
            var qtdP2 = G.empresa.qtdVendasMes[G.mes] - qtdP1;  
            var custoVariavel = G.empresa.atualizarCustoVariavelMes(G.mes,qtdP1,qtdP2);
            var custoTotal = custoVariavel + G.empresa.custoFixo;
            var faturamento = G.empresa.atualizarFaturamentoMes(G.mes,qtdP1,qtdP2);
            var lucro = faturamento - custoTotal;
            G.empresa.lucroAcumulado+=lucro;
            
            
            //debug
            var head = new Array();
            var debug = new Array();
            head.push('mes','qtdP1','qtdP2','qtdP1+qtdP2','custoP1','custoP2','custoFixo','custoVariavel','custoTotal','faturamento','lucro','lucroAcumulado');
            debug.push(G.mes,qtdP1,qtdP2,qtdP1+qtdP2,G.empresa.custoP1,G.empresa.custoP2,G.empresa.custoFixo,custoVariavel,custoTotal,faturamento,lucro,G.empresa.lucroAcumulado);
            if(G.mes <1){ 
                if(G.questao == QUESTAO_A){
                    Print.tabela(['Questao a'],true);
                }else{
                    Print.tabela(['Questao b'],true);    
                }
                Print.tabela(head,true); 
            }
            Print.tabela(debug);

            //grafico
            G.empresa.pontosQtdP1.add(new Ponto(G.mes,qtdP1));
            G.empresa.pontosQtdP2.add(new Ponto(G.mes,qtdP2));
            G.empresa.pontosLucro.add(new Ponto(G.mes,lucro));
            
            G.extremos.atualiza(G.empresa.pontosQtdP1.setExtremos());
            G.extremos.atualiza(G.empresa.pontosQtdP2.setExtremos());
            
            G.empresa.pontosQtdP1.setRelative(G.extremos,0.1,0.1,0.1,0.1);
            G.empresa.pontosQtdP2.setRelative(G.extremos,0.1,0.1,0.1,0.1);
            var extremosLucro = G.empresa.pontosLucro.setExtremos();
            G.empresa.pontosLucro.setRelative(extremosLucro,0.1,0.1,0.1,0.1);
            
            Desenho.desenharLinhas(G.empresa.pontosQtdP1,[255,0,0],1);
            Desenho.desenharLinhas(G.empresa.pontosQtdP2,[255,255,0],1);
            Desenho.desenharLinhas(G.empresa.pontosLucro,[255,255,255],1);
            //Eixos
            Desenho.desenharEixos2(G.extremos,[255],0,'unidades');
            Desenho.desenharEixos2(extremosLucro,[255],1,'R$');
                        

            //condicao de parada
            G.mes++;
            if(G.mes > G.maxMes){
                if(G.questao == QUESTAO_B){
                    noLoop();
                }else{
                    noLoop();
                    G.empresa.pontosQtdP1 = new Pontos();
                    G.empresa.pontosQtdP2 = new Pontos();
                    G.empresa.pontosLucro = new Pontos();
                    //atualizar parametros de entrada para a questao b
                    G.questao = QUESTAO_B;
                    G.mes = 0;
                    
                    G.empresa.qtdVendasMes[0] = 300;
                     
                    
                    var mes = 1;
                    while(mes <= G.maxMes){
                        var a = Math.floor((Math.random() * 100) + 1);
                        
                        if(a > 50){
                            G.empresa.qtdVendasMes[mes] = Math.floor(G.empresa.qtdVendasMes[mes-1]*1.1);    
                        }else{
                            G.empresa.qtdVendasMes[mes] = Math.floor(G.empresa.qtdVendasMes[mes-1]*0.9);
                        }
                        //limite da producao
                        if(G.empresa.qtdVendasMes[mes] > G.empresa.maxProducao){
                            G.empresa.qtdVendasMes[mes] = G.empresa.maxProducao;
                        }
                        
                        mes++;
                    }
                }
                
                
            }
                
    
    }catch(err){alert('Erro draw: '+err);}
}


alert('MainSimulacao.js OK');