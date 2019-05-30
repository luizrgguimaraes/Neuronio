const FRAMERATE = 100;
const CANVASW = 400;
const CANVASH = 700;
const CORFUNDOCANVAS = 50;
class G{}

const BTNAUTO = 1;
const BTNRESET = 2;



G.maxCompartimento = 0;
G.countConexao = 0;
G.countCompartimento = 0;

inserirConexao(0,0.1,1);
inserirConexao(1,0.05,2);
inserirConexao(2,0.01,0);


inserirCompartimento(0,1000);


function setup(flag) {
    try{
    
        frameRate(FRAMERATE);
        createCanvas(CANVASH, CANVASW);
        background(CORFUNDOCANVAS);
        
        G.bordas = [0.5,0.05,0.05,0.05];


        //preencher entrada        
        G.matrizQ = new Array();
        for(var i = 0; i < G.countCompartimento; i++){
            var id = parseInt($('compartimentoId'+i).value);
            var value = parseFloat($('compartimentoValor'+i).value);
            if(id>G.maxCompartimento)G.maxCompartimento = id;
            G.matrizQ[i] = parseFloat(value); 
        }
        
        for(var i = 0; i <= G.maxCompartimento; i++){
            if(G.matrizQ[i] == undefined){
                G.matrizQ[i] = 0.0;
            } 
        }
        
        
        G.matrizTaxa = new Array();
        for(var i = 0; i < G.countConexao; i++){
            var origem = parseInt($('conexaoOrigem'+i).value);
            var taxa = parseFloat($('conexaoTaxa'+i).value);
            var destino = parseInt($('conexaoDestino'+i).value);
            if(G.matrizTaxa[origem] == undefined){
                G.matrizTaxa[origem] = new Array();
            }
            if(origem>G.maxCompartimento)G.maxCompartimento = origem;
            if(destino>G.maxCompartimento)G.maxCompartimento = destino;
            
            G.matrizTaxa[origem][destino] = taxa; 
        }
        
        for(var i = 0; i <= G.maxCompartimento; i++){
            if(G.matrizTaxa[i] == undefined)G.matrizTaxa[i] = new Array();
            for(var j = 0; j <= G.maxCompartimento; j++){
                if(G.matrizTaxa[i][j] == undefined)G.matrizTaxa[i][j] = 0; 
            }
        }
        
        for(var i = 0; i <= G.maxCompartimento; i++){
            if(G.matrizQ[i] == undefined){
                G.matrizQ[i] = 0.0;
            } 
        }
        
        
        G.salvarQ = new Array();
        
        G.i = 0;
        
        G.t = new Array();
        G.h = new Array();
        G.hLastUsed = new Array();
        //G.h = parseFloat($('passo').value);         
        
        lerParametros();

        G.erro = new Array();
        G.aviso = '';
        
        G.stop = 0;
        
        G.compartimentos = new Array();
        for(var i in G.matrizQ){
            G.compartimentos[i] = new Compartimento(i, G.matrizQ[i]);
            G.h[i] = parseFloat($('passo').value);
            G.hLastUsed[i] = 0;
            G.t[i] = 0;
        }
        
        if(!G.extremos){
            G.extremos = new Extremos(null,null,null,null);
            G.extremosH = new Extremos(null,null,null,null);
        }
        
        if(flag == BTNAUTO){
            loop();
        }else{
            noLoop();
        }
        
        Print.limpar();
        routineTabelaRotulos(false,0);
        routineTabelaIndividual(false,0);
        routineTabelaIndividual(false,1);
        routineTabelaIndividual(false,2);
        routineGraficos();
        
        
        G.flagNoExecute = true;
        //noLoop();

    }catch(err){
        alert('Erro setup: '+err);
    }
    
        
}

function lerParametros(){        
    try{
        G.iMax = parseFloat($('iMax').value);
        G.estabilidade = parseFloat($('estabilidade').value);
        G.tMax = parseFloat($('tempoMax').value);
        G.hMin = parseFloat($('hMin').value);
        G.hMax = parseFloat($('hMax').value);
        G.erroMax = parseFloat($('erroMax').value);
        G.velocidade = parseFloat($('velocidade').value);
         
    }catch(err){
        alert('Erro lerParametros: '+err);
    }        
}        


function draw() {
    
    try{
        
        if(G.flagNoExecute){
            G.flagNoExecute = false;
            return;
        }

var iteracao = 0;
var stop = false;

while(iteracao < G.velocidade && stop == false){

        stop = false;
        
        G.i++;
        G.salvarQ = G.matrizQ.slice();
        
        var flagSomenteUltima = true;
        if($('chkPrintResultadosParciais').checked){
            flagSomenteUltima = false;
        }
        
        if($('rk6').checked){
            G.rk6 = true;
            
            var ordem = definirOrdem([G.t[0]+G.h[0],G.t[1]+G.h[1],G.t[2]+G.h[2]]);
            var i = 0;
            while(G.t[ordem[i]] >= G.tMax && i<G.compartimentos.length){
                i++;
            }
            if(i>=G.compartimentos.length){
                stop = true;
            }else{

                if(calculoRk6Compartimentos(G.matrizQ, G.matrizTaxa, G, ordem[i],false)){
                    routineTabelaIndividual(flagSomenteUltima, ordem[i]);

                }else{
                    stop = true;

                }
            }
//             
            
            
        }else{
            calculoRk4Compartimentos(G.matrizQ, G.matrizTaxa, G.h[0]);
            if(routineStopPorEstabilidade()){
                stop = true;
            }

            G.t[0] += G.h[0];
            
            G.t[1] += G.h[1];
            G.t[2] += G.h[2];
            
            G.t[0] = round2(G.t[0],7);
            G.t[1] = round2(G.t[1],7);
            G.t[2] = round2(G.t[2],7);
            
            //alert(G.t[0]+' - '+ G.h[0]);
            if(G.t[0] >= (G.tMax)){
                stop = true;
            }
            
            routineTabela(flagSomenteUltima);
            //routineTabelaIndividual(flagSomenteUltima,0);
            //routineTabelaIndividual(flagSomenteUltima,1);
            //routineTabelaIndividual(flagSomenteUltima,2);
        
        }
        
        
        
        for(var q in G.compartimentos){
            G.compartimentos[q].update(G.t[q], G.matrizQ[q]);
            G.compartimentos[q].updateH(G.t[q], G.h[q]);
        }
        

        if(G.i > G.iMax){
            
            stop = true;
        }


        if(routineStopPorEstabilidade()){
            stop = true;
        }

        
        if(stop){
            routineTabelaRotulos(false,true);
            routineTabela(false,true);
            noLoop();
            
        }
        
        //ajustar t
            //G.t[0] = parseFloat(G.t[0].toFixed(5));
            //G.t[1] = parseFloat(G.t[1].toFixed(5));
            //G.t[2] = parseFloat(G.t[2].toFixed(5));
        
        background(CORFUNDOCANVAS);
        routineGraficos();
    iteracao++;
}
    
    }catch(err){
        alert('Erro draw: '+err);
    }
}


function routineGraficos(){
    try{
    
        for(var q in G.compartimentos){
            G.compartimentos[q].draw();    
            G.extremos.atualiza(G.compartimentos[q].getExtremos());
            G.extremosH.atualiza(G.compartimentos[q].getExtremosH());
            G.compartimentos[q].setRelatives(G.extremos,G.bordas);
            G.compartimentos[q].setRelativesH(G.extremosH,G.bordas);
            if($('chkGraficoQuantidade').checked){
                G.compartimentos[q].drawGrafico();
            }
            if($('chkGraficoPasso').checked){
                G.compartimentos[q].drawGraficoH();
            }
            
            
        }
        
        Desenho.eixos(G.extremos,G.bordas,'u.T','u.V');
        
        var arrayStatus = new Array();
        arrayStatus.push('i = '+G.i);
        arrayStatus.push('t0 = '+G.t[0]);
        arrayStatus.push('t1 = '+G.t[1]);
        arrayStatus.push('t2 = '+G.t[2]);
        arrayStatus.push('erro0 = '+G.erro[0]);
        arrayStatus.push('erro1 = '+G.erro[1]);
        arrayStatus.push('erro2 = '+G.erro[2]);
        arrayStatus.push('passo1 = '+G.h[0]);
        arrayStatus.push('passo2 = '+G.h[1]);
        arrayStatus.push('passo3 = '+G.h[2]);
        
        arrayStatus.push('ERRO EXECUÇÃO = '+G.aviso);
        Desenho.desenharStatus(arrayStatus);        
        
    }catch(err){
        alert('Erro routineGraficos: '+err);
    }

}

function routineTabela(flagSomenteUltima,FlagResultadoFinal){
    try{
    
        /*
        if(G.i == 0){
            var rotulos = new Array();
            rotulos.push('i'); 
            for(var i in G.compartimentos){
                rotulos.push('t'+i,'h'+i);
                rotulos.push([G.compartimentos[i].getName(),G.compartimentos[i].getCor()]);
                
            }
            rotulos.push('soma'); 
            Print.tabela(rotulos,true);
        } */
        
        var soma = 0;
        for(var i in G.compartimentos){
            soma+= G.matrizQ[i];
        }

        var flag = true;
        
        if(flagSomenteUltima){
            flag = false;
            //alert(G.t[0]+'/'+G.tMax);
            if(G.t[0] >= G.tMax ){
                flag = true;
            }
        }
        
        if(flag){
                var linha = new Array();
                linha.push(G.i,'',G.t[0],G.h[0]);
                for(var i in G.compartimentos){
                    linha.push(G.matrizQ[i]);
                }
                linha.push(soma);
                
                if(FlagResultadoFinal){
                    Print.tabela(linha,false,false,true);
                }
                Print.tabela(linha);
                
                
        }
        
    }catch(err){
        alert('Erro routineTabela: '+err);
    }

}
function routineTabelaRotulos(FlagResultadoFinal,FlagResultadoFinal){
    try{


            var rotulos = new Array();
            rotulos.push('i');
            rotulos.push('q');
            rotulos.push('t');
            rotulos.push('h');
            rotulos.push('Compartimento 1');
            rotulos.push('Compartimento 2');
            rotulos.push('Compartimento 3');
            rotulos.push('soma');
            if(FlagResultadoFinal){
                Print.tabela(rotulos,true,false,true);
            }
            Print.tabela(rotulos,true);
             
            
        
    }catch(err){
        alert('Erro routineTabela: '+err);
    }

}



function routineTabelaIndividual(flagSomenteUltima, q,FlagResultadoFinal){
    try{
    
        
        
        var soma = 0;
        for(var i in G.compartimentos){
            soma+= G.matrizQ[i];
        }
        
        
        var flag = true;
        if(flagSomenteUltima){
            flag = false;
            if(G.t[q] >= G.tMax ){
                flag = true;
            }
        }
        
        
        if(flag){
                //alert('319');
                var ordem = definirOrdem(G.t);
                var linha = new Array();
                linha.push(G.i);
                linha.push(q);
                linha.push(G.t[q]);
                linha.push(G.hLastUsed[q]);
                
                
                
                var erro = G.erro[q];
                for(var i in G.compartimentos){
                    if(i == q){
                        linha.push(G.matrizQ[i]);
                    }else{
                        linha.push("");
                    }
                }
                linha.push(soma);
                if(FlagResultadoFinal){
                    Print.tabela(linha,false,false,true);
                }
                Print.tabela(linha);
                
            
        }
        
    }catch(err){
        alert('Erro routineTabela: '+err);
    }

}


function routineNivelarH(){
    try{
    
        var menorH = 1;
        for(var i in G.compartimentos){
            if(G.h[i]<menorH){
                menorH = G.h[i];
            }
        }
        for(var i in G.compartimentos){
            G.h[i] = menorH;
        }
        
    }catch(err){
        alert('Erro routineNivelarH: '+err);
    }

}

function routineStopPorEstabilidade(){
    try{
    
        G.estabilidadeAtual = 0;
        for(var i in G.compartimentos){
        
            var diff = Math.abs(G.salvarQ[i]-G.matrizQ[i]);
            //alert(diff); 
            if(diff > G.estabilidadeAtual){
                G.estabilidadeAtual = diff;
            }
            
            if(diff < G.estabilidade){
                G.stop++;                
            }else{
                G.stop = 0;
                return false;
            }
        }
        
        if(G.stop > 30){ 
            return true; 
        }else{
            return false;
        }
        
    }catch(err){
        alert('Erro routineStopPorEstabilidade: '+err);
    }

}



function inserirConexao(origem,taxa,destino){
    try{

        
        var table = $('tableConexoes');
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var input = document.createElement('input');
        input.id = 'conexaoOrigem'+G.countConexao;
        if(origem || origem == 0)input.value = origem;
        td.appendChild(input);
        if(origem > G.maxCompartimento)G.maxCompartimento = origem;
        
        tr.appendChild(td);
        
        td = document.createElement('td');
        input = document.createElement('input');
        input.id = 'conexaoTaxa'+G.countConexao;
        if(taxa || taxa==0)input.value = taxa;
        td.appendChild(input);
        tr.appendChild(td);
        
        td = document.createElement('td');
        input = document.createElement('input');
        input.id = 'conexaoDestino'+G.countConexao;
        if(destino || destino==0)input.value = destino;
        if(destino > G.maxCompartimento)G.maxCompartimento = destino;
        td.appendChild(input);
        tr.appendChild(td);
        
        table.appendChild(tr);
        
        G.countConexao++;
        
    }catch(err){ alert('Erro criarComandos: '+err); }
}



function inserirCompartimento(id,valor){
    try{
        
        var table = $('tableCompartimentos');
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var input = document.createElement('input');
        if(id || id==0)input.value = id;
        if(id > G.maxCompartimento)G.maxCompartimento = id;
        input.id = 'compartimentoId'+G.countCompartimento; 
        td.appendChild(input);
        
        tr.appendChild(td);
        
        td = document.createElement('td');
        input = document.createElement('input');
        if(valor || valor==0)input.value = valor;
        input.id = 'compartimentoValor'+G.countCompartimento;
        td.appendChild(input);
        tr.appendChild(td);
        
        table.appendChild(tr);
        
        G.countCompartimento++;
        
    }catch(err){ alert('Erro criarComandos: '+err); }
}


function clickRadio(obj){
    try{
        alert(obj.id);
        alert(obj.checked);
        if(obj.checked==true){
            obj.checked = false;
            alert('515');
            if(obj.value == 4){
                alert('517');
                $('radio6').checked = true;
            }else{
                alert('520');
                $('radio4').checked = true;
            }
        }else{
            obj.checked = true;
            alert('525');
            if(obj.value == 4){
                alert('527');
                $('radio6').checked = false;
            }else{
                $('radio4').checked = false;
                alert('531');
            }
        }    
        
    
    }catch(err){ alert('Erro clickRadio: '+err); }
}

//alert('compartimentos OK');