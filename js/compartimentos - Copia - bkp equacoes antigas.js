const FRAMERATE = 60;
const CANVASW = 400;
const CANVASH = 700;
const CORFUNDOCANVAS = 50;
class G{}

function setup() {
    	frameRate(FRAMERATE);
        createCanvas(CANVASH, CANVASW);
        
        G.matrizQ = [1000,0,500];
        G.matrizTaxa = 
                        [[  0,          0.1]
                        ,[  0.2,        0]
                        ];                
        G.t = 0; 
        G.h = 0.1; 
        G.i = 0;
        G.n = 1000;
        
        
        G.compartimentos = new Array();
        for(var i in G.matrizQ){
            G.compartimentos[i] = new Compartimento(i, G.matrizQ[i]);
        }
        
        G.extremos = new Extremos(null,null,null,null);
        //noLoop();
        
}

function draw() {
    try{
        background(CORFUNDOCANVAS);
        
        
        for(var q in G.matrizQ){
            G.compartimentos[q].draw();    
            G.extremos.atualiza(G.compartimentos[q].getExtremos());
            G.compartimentos[q].setRelative(G.extremos);
            G.compartimentos[q].drawGrafico();
        }
        
        
        if(G.i == 0){
            var rotulos = new Array();
            rotulos.push('i', 't'); 
            
            for(var i in G.compartimentos){
                rotulos.push([G.compartimentos[i].getName(),G.compartimentos.getCor()]);
            } 
            Print.tabela(rotulos,true);
        }
        
        var linha = new Array();
        linha.push(G.i, G.t);
        for(var i in G.compartimentos){
            if(G.i >= G.compartimentos[i].getLength()){
                linha.push("");
            }else{
                linha.push(G.matrizQ[i]);
            }
        }
        
        Print.tabela(linha);
        
        G.i++;
        
        if(G.i > G.n){ noLoop(); return; }
        
        calculoRk4Compartimentos(G.matrizQ, G.matrizTaxa, G.h);
        
        G.t += G.h;
        
        for(var q in G.matrizQ){
            G.compartimentos[q].update(G.t, G.matrizQ[q]);
        }
        
    }catch(err){
        alert('Erro draw: '+err);
    }            
}


class Equacoes{
    static dzdx_eq_y_mais_exp_x(x,y,z){
        return y + Math.exp(x);
    }
    static dydx_igual_z(x,y,z){
        return z;
    }
    static f_eq_menos_1_tx_y(t,y, tx){
        try{
            var f = (-1) * tx * y;
            return f;
        }catch(err){alert('Erro Equacao 1 calc: '+err);}
    }
    
    static dydx_eq_menos_tx_y(x, y, z, tx){
        return (-1) * y * tx;
    }

    static dzdx_eq_tx_y(x, y, z, tx){
        return y * tx;
    }
    
}

class Calculo{
    static calc(t,y, tx){
        try{
            
            var f = (-1) * tx * y;
            return f;
        }catch(err){alert('Erro Equacao 1 calc: '+err);}
    }
    
    static calculoSistemaEuler(y0, z0, t0, h, n, tx){
        try{
            var descricao = 'Metodo de Euler para Solucao de Sistemas: yi+1 = yi + f(ti,y[i])*h'; Print.tabela([descricao],false,10);
            var descricao = 'f(t,y, z) = z';Print.tabela([descricao],false,10);
            var descricao = 'g(t,y, z) = y + e^t';Print.tabela([descricao],false,10);
            
            var y = new Array(); var t = new Array(); var z = new Array();
            t[0] = t0; y[0] = y0; z[0] = z0;
            var pontosy = new Pontos();pontosy.add(new Ponto(t[0], y[0]));
            var pontosz = new Pontos();pontosz.add(new Ponto(t[0], z[0]));
            for(var i = 1; i <= n; i++){
                t[i] = t[i-1] + h;
                var fy = Equacoes.dydx_eq_menos_tx_y(null, y[i-1], null, tx);
                y[i] = y[i-1] + fy*h;
                var fz = Equacoes.dzdx_eq_tx_y(null, y[i-1], null, tx);
                z[i] = z[i-1] + fz*h;
                pontosy.add(new Ponto(t[i], y[i]));
                pontosz.add(new Ponto(t[i], z[i]));
            }
            var pontos = new Object(); pontos.y = pontosy; pontos.z = pontosz;
            return pontos;
        }catch(err){alert('Erro Equacao 1 RungeKutta2: '+err);}
    }
    
    static calculoSistemaEuler2(matrizInicial, t0, h, n, Matriz){
        try{
            
            var t = new Array();t[0] = t0;
            var pontos = new Array();
            var Q = new Array();
            for(var i = 0; i < matrizInicial.length; i++){
                Q[i] = new Array();
                Q[i][0] = matrizInicial[i];
                pontos[i] = new Pontos();
                pontos[i].add(new Ponto(t0, matrizInicial[i]));
            }
            
            
            for(var i = 1; i <= n; i++){
                t[i] = t[i-1] + h;
                
                for(var q = 0; q < Matriz.length; q++){
                    var soma = 0;
                    for(var k = 0; k < Matriz.length; k++){
                        soma += (-1)*Matriz[q][k] * Q[q][i-1];
                        soma += Matriz[k][q] * Q[k][i-1];
                    }
                    
                    Q[q][i] = Q[q][i-1] + h*soma;
                    pontos[q].add(new Ponto(t[i], Q[q][i]));                
                }
                
            }
            return pontos;
        }catch(err){alert('Erro Equacao 1 RungeKutta2: '+err);}
    }
    
    static calculoSistemaRk2Plus(matrizInicial, t0, h, n, Matriz){
        try{
            
            var t = new Array();t[0] = t0;
            var pontos = new Array();
            var Q = new Array();
            for(var i = 0; i < matrizInicial.length; i++){
                Q[i] = new Array();
                Q[i][0] = matrizInicial[i];
                pontos[i] = new Pontos();
                pontos[i].add(new Ponto(t0, matrizInicial[i]));
            }
            
            
            for(var i = 1; i <= n; i++){
                t[i] = t[i-1] + h;
                
                var K1 = new Array();
                var K2 = new Array();
                for(var q = 0; q < Matriz.length; q++){
                    var matrizQ = new Array();
                    matrizQ.push(Q[0][i-1]);
                    matrizQ.push(Q[1][i-1]);
                    matrizQ.push(Q[2][i-1]);
                    K1[q] = Equacoes.soma_Compartimentos(matrizQ, Matriz,q);
                    
                    //Print.tabela(['K1['+q+']='+K1[q]]);
                    
                    var matrizQ2 = new Array();
                    matrizQ2.push(Q[0][i-1] + h*K1[q]);
                    matrizQ2.push(Q[1][i-1] + h*K1[q]);
                    matrizQ2.push(Q[2][i-1] + h*K1[q]);
                    K2[q] = Equacoes.soma_Compartimentos(matrizQ2, Matriz,q);                     
                    
                    //Print.tabela(['K2['+q+']='+K2[q]]);
                    Q[q][i] = Q[q][i-1] + (h/2)*(K1[q] + K2[q]);
                    pontos[q].add(new Ponto(t[i], Q[q][i]));
                    
                        
                }
                for(var q = 0; q < Matriz.length; q++){
                    //Q[q][i] = Q[q][i-1] + (h/2)*(K1[q] + K2[q]);
                    //pontos[q].add(new Ponto(t[i], Q[q][i]));
                }
            }
            return pontos;
        }catch(err){alert('Erro Equacao 1 SistemaRungeKutta2Plus: '+err);}
    }
    
    static calculoSistemaRk4Plus(matrizInicial, t0, h, n, Matriz){
        try{
            
            var t = new Array();t[0] = t0;
            var pontos = new Array();
            var Q = new Array();
            for(var i = 0; i < matrizInicial.length; i++){
                Q[i] = new Array();
                Q[i][0] = matrizInicial[i];
                pontos[i] = new Pontos();
                pontos[i].add(new Ponto(t0, matrizInicial[i]));
            }
            
            
            
                    
            
            for(var i = 1; i <= n; i++){
                t[i] = t[i-1] + h;
                
                var K1 = new Array();
                var K2 = new Array();
                var K3 = new Array();
                var K4 = new Array();
                for(var q = 0; q < Matriz.length; q++){
                    var matrizQ = new Array();
                    matrizQ.push(Q[0][i-1]);
                    matrizQ.push(Q[1][i-1]);
                    matrizQ.push(Q[2][i-1]);
                    K1[q] = Equacoes.soma_Compartimentos(matrizQ, Matriz,q);
                    
                    //Print.tabela(['K1['+q+']='+K1[q]]);
                    
                    matrizQ = new Array();
                    matrizQ.push(Q[0][i-1] + h/2*K1[q]);
                    matrizQ.push(Q[1][i-1] + h/2*K1[q]);
                    matrizQ.push(Q[2][i-1] + h/2*K1[q]);
                    K2[q] = Equacoes.soma_Compartimentos(matrizQ, Matriz,q);                     
                    
                    //Print.tabela(['K2['+q+']='+K2[q]]);
                    matrizQ = new Array();
                    matrizQ.push(Q[0][i-1] + h/2*K2[q]);
                    matrizQ.push(Q[1][i-1] + h/2*K2[q]);
                    matrizQ.push(Q[2][i-1] + h/2*K2[q]);
                    K3[q] = Equacoes.soma_Compartimentos(matrizQ, Matriz,q);                     
                    
                    matrizQ = new Array();
                    matrizQ.push(Q[0][i-1] + h*K3[q]);
                    matrizQ.push(Q[1][i-1] + h*K3[q]);
                    matrizQ.push(Q[2][i-1] + h*K3[q]);
                    K4[q] = Equacoes.soma_Compartimentos(matrizQ, Matriz,q);                     
                    
                    
                    //Q[q][i] = Q[q][i-1] + (h/6)*(K1[q] + 2*K2[q] + 2*K3[q]+ K4[q]);
                    //pontos[q].add(new Ponto(t[i], Q[q][i]));
                    //??? atualizar em tempo real ou no final?
                    
                        
                }
                
                background(50);
                for(var q = 0; q < Matriz.length; q++){
                    Q[q][i] = Q[q][i-1] + (h/6)*(K1[q] + 2*K2[q] + 2*K3[q]+ K4[q]);
                    pontos[q].add(new Ponto(t[i], Q[q][i]));
            
            
                    var posX = 20;
                    var posY = 150;
                    var width = 100;
                    var length = 100;
            
                    var deslocamentoX = q*250;
                    var deslocamentoY = 0;
                    new Recipiente(posX + deslocamentoX,posY + deslocamentoY,width,length, Q[q][i], 1000);    
                }
                
            }
            return pontos;
        }catch(err){alert('Erro Equacao 1 SistemaRungeKutta4Plus: '+err);}
    }
    
    
    static calculoSistemaRk2(y0, z0, t0, h, n){
        try{
            //???Como confirmar se resultado do sistema está correto? 
            
            
            var y = new Array(); var t = new Array(); var z = new Array();t[0] = t0; y[0] = y0; z[0] = z0;
            var pontosy = new Pontos();pontosy.add(new Ponto(t[0], y[0]));
            var pontosz = new Pontos();pontosz.add(new Ponto(t[0], z[0]));
            
            
            for(var i = 1; i <= n; i++){
                t[i] = t[i-1] + h;
                var k1 = z[i-1];
                var k2 = z[i-1] + h*k1;
                
                var m1 = y[i-1] + Math.exp(t[i-1]);
                var m2 = (y[i-1]+(h*m1)) + Math.exp(t[i-1] + h) ;

                y[i] = y[i-1] + ((h/2)*(k1 + k2));
                z[i] = z[i-1] + ((h/2)*(m1 + m2));

                
                pontosy.add(new Ponto(t[i], y[i]));
                pontosz.add(new Ponto(t[i], z[i]));
            
            }
            var pontos = new Object(); pontos.y = pontosy; pontos.z = pontosz;
            return pontos;
        
        }catch(err){alert('Erro Equacao 1 RungeKutta2: '+err);}
    }
    
    
    

    static calculoSistemaRk4(y0, z0, t0, h, n){
        try{
            //???Como confirmar se resultado do sistema está correto? 
            
            
            var y = new Array();
            var t = new Array();
            var z = new Array();
            t[0] = t0; 
            y[0] = y0; 
            z[0] = z0;
            var pontosy = new Pontos();pontosy.add(new Ponto(t[0], y[0]));
            var pontosz = new Pontos();pontosz.add(new Ponto(t[0], z[0]));
            
            
            for(var i = 1; i <= n; i++){
                t[i] = t[i-1] + h;
                var k1 = z[i-1];
                var k2 = z[i-1] + ((h/2)*k1);
                var k3 = z[i-1] + ((h/2)*k2); 
                var k4 = z[i-1] + ((h)*k3);
                
                
                var m1 = Equacoes.dzdx_eq_y_mais_exp_x(t[i-1],          y[i-1],                 z[i-1]);
                var m2 = Equacoes.dzdx_eq_y_mais_exp_x(t[i-1]+ (h/2),   y[i-1]  + (h/2)*m1,     z[i-1] + (h/2)*m1);
                var m3 = Equacoes.dzdx_eq_y_mais_exp_x(t[i-1]+ (h/2),   y[i-1]  + (h/2)*m2,     z[i-1] + (h/2)*m2);
                var m4 = Equacoes.dzdx_eq_y_mais_exp_x(t[i-1]+ h,       y[i-1]  + h*m3,         z[i-1] + h*m3); 

                y[i] = y[i-1] + ((h/6)*(k1 + (2*k2) + (2*k3) + k4 ));
                z[i] = z[i-1] + ((h/6)*(m1 + (2*m2) + (2*m3) + m4 ));

                
                pontosy.add(new Ponto(t[i], y[i]));
                pontosz.add(new Ponto(t[i], z[i]));
            
            }
            var pontos = new Object(); pontos.y = pontosy; pontos.z = pontosz;
            return pontos;
        
        }catch(err){alert('Erro Equacao 1 RungeKutta2: '+err);}
    }
    
    
    static calculoEuler(y0, t0, h, n, tx){
        try{
            var descricao = 'Metodo de Euler: yi+1 = yi + f(ti,y[i])*h'; 
            Print.tabela([descricao],false,10);
            var descricao = 'f(t,y) = -(tx)(y)'; 
            Print.tabela([descricao],false,10);
            
            
            var y = new Array();
            var t = new Array();
            t[0] = t0;
            y[0] = y0;

            var pontos = new Pontos();
            pontos.add(new Ponto(t[0], y[0]));
            
            for(var i = 1; i <= n; i++){
                t[i] = t[i-1] + h;
                var f = Equacoes.f_eq_menos_1_tx_y(t[i-1], y[i-1],tx);
                y[i] = y[i-1] + f*h;
                pontos.add(new Ponto(t[i], y[i]));
            }
            
            
            return pontos;
        
        }catch(err){alert('Erro Equacao 1 RungeKutta2: '+err);}
    }

    
    
    static calculoRungeKutta2(y0, t0, h, n, tx){
        try{
            
            var y = new Array();
            var t = new Array();
            var pontos = new Pontos();
            t[0] = t0;
            y[0] = y0;
            
            pontos.add(new Ponto(t[0], y[0]));
            for(var i = 1; i <= n; i++){
                    t[i] = t[i-1] + h;
                    var k1 = Equaccoes.f_eq_menos_1_tx_y(t[i-1], y[i-1], tx);
                    var k2 = Equaccoes.f_eq_menos_1_tx_y(t[i], y[i-1] + (h * k1), tx); 
                    y[i] = y[i-1] + (h/2)*(k1 + k2);
                    pontos.add(new Ponto(t[i], y[i]));
            }
            return pontos;
        
        }catch(err){alert('Erro Equacao 1 RungeKutta2: '+err);}
    }
    
    static calculoRungeKutta4(y0, t0, h, n, tx){
        try{
            
            var y = new Array();
            var t = new Array();
            var pontos = new Pontos();
            t[0] = t0;
            y[0] = y0;
            
            pontos.add(new Ponto(t[0], y[0]));
            for(var i = 1; i <= n; i++){
                    t[i] = t[i-1] + h;
                    var k1 = Equaccoes.f_eq_menos_1_tx_y(t[i-1], y[i-1], tx);
                    var k2 = Equaccoes.f_eq_menos_1_tx_y(t[i-1]+(h/2), y[i-1] + ( (h/2) * k1), tx);
                    var k3 = Equaccoes.f_eq_menos_1_tx_y(t[i-1]+(h/2), y[i-1] + ( (h/2) * k2), tx);
                    var k4 = Equaccoes.f_eq_menos_1_tx_y(t[i-1]+(h), y[i-1] + ( (h) * k3), tx); 
                    y[i] = y[i-1] + (h/6)*(k1 + (2*k2) + (2*k3) + k4);
                    pontos.add(new Ponto(t[i], y[i]));
            }
            return pontos;
        
        }catch(err){alert('Erro Equacao 1 RungeKutta2: '+err);}
    }

    static calculoAnalitico(n0, t0, h, n, tx){
        try{
            var y = new Array();
            var pontos = new Pontos();
            
            var t = t0;
            y[0] = n0;
            pontos.add(new Ponto(t, y[0]));
            for(var i = 1; i <= n; i++){
                t += h;
                var expoente = (-1) * tx * t;
                var N = n0 * Math.exp(expoente);
                y[i] = N;
                //Print.tabela([y[i]]);
                pontos.add(new Ponto(t, y[i])); 
            }
            
            return pontos;
        }catch(err){alert('Erro Calculo Analitico: '+err);}
    }
    
    static desc(){
        return 'Equacao Diferencial Desintegracao Nuclear: dy/dt = -0.1155y com y(0) =  10^9';
    }
}

function scriptCalculoDesintegracaoNuclear(){
        var qInicial = 10;
        var tempoInicial = 0;
        var passoDeTempo = 1;
        var nIteracoes = 100;
        var taxa = 0.1;
        
        
        var diferencial = new Diferencial();
        diferencial.analitico = Calculo.calculoAnalitico(qInicial, tempoInicial, passoDeTempo, nIteracoes, taxa);
        diferencial.euler = Calculo.calculoEuler(qInicial, tempoInicial, passoDeTempo, nIteracoes, taxa);
        diferencial.rk2 = Calculo.calculoRungeKutta2(qInicial, tempoInicial, passoDeTempo, nIteracoes, taxa);
        diferencial.rk4 = Calculo.calculoRungeKutta4(qInicial, tempoInicial, passoDeTempo, nIteracoes, taxa);
        diferencial.diferencaEuler = diferencial.analitico.diferenca(diferencial.euler);
        diferencial.diferencaRk2 = diferencial.analitico.diferenca(diferencial.rk2);
        diferencial.diferencaRk4 = diferencial.analitico.diferenca(diferencial.rk4);
        
        diferencial.analitico.cor = Cores.getNewCor();
        diferencial.analitico.strokeW = 10;
        diferencial.euler.cor = Cores.getNewCor();
        diferencial.rk2.cor = Cores.getNewCor();
        diferencial.rk4.cor = Cores.getNewCor();
        diferencial.diferencaEuler.cor = Cores.getNewCor();
        diferencial.diferencaRk2.cor = Cores.getNewCor();
        diferencial.diferencaRk2.strokeW = 10;
        diferencial.diferencaRk4.cor = Cores.getNewCor();
        
        
        diferencial.imprimirResultados();
        
        var extremos = diferencial.getExtremos();
        diferencial.analitico.setRelative(extremos, 0.1, 0.1);
        diferencial.euler.setRelative(extremos, 0.1, 0.1);
        diferencial.rk2.setRelative(extremos, 0.1, 0.1);
        diferencial.rk4.setRelative(extremos, 0.1, 0.1);
        
        var extremosDiferenca = new Extremos(null,null,null,null);
        var extremosDiferencaEuler = diferencial.diferencaEuler.setExtremos();
        var extremosDiferencaRk2 = diferencial.diferencaRk2.setExtremos();
        var extremosDiferencaRk4 = diferencial.diferencaRk4.setExtremos();
        //extremosDiferenca.atualiza(extremosDiferencaEuler);
        extremosDiferenca.atualiza(extremosDiferencaRk2);
        extremosDiferenca.atualiza(extremosDiferencaRk4);
         
         
        diferencial.diferencaEuler.setRelative(extremosDiferencaEuler, 0.1, 0.1);
        diferencial.diferencaRk2.setRelative(extremosDiferencaRk2, 0.1, 0.1);
        diferencial.diferencaRk4.setRelative(extremosDiferencaRk4, 0.1, 0.1);
        
        diferencial.desenharGraficos();
                
}


alert('EqDifEuler OK');