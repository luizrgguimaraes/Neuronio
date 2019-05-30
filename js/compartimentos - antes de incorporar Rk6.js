const FRAMERATE = 100;
const CANVASW = 400;
const CANVASH = 700;
const CORFUNDOCANVAS = 50;
class G{}

G.maxCompartimento = 0;
G.countConexao = 0;
G.countCompartimento = 0;



inserirConexao(0,0.1,1);
inserirConexao(1,0.05,2);
inserirConexao(2,0.01,0);


inserirCompartimento(0,1000);



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


function setup(flag) {
    try{
    	
        frameRate(FRAMERATE);
        createCanvas(CANVASH, CANVASW);
        
        G.bordas = [0.5,0.05,0.05,0.05];
        Print.limpar();
        
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
        
        //Print.tabela(['Matriz Q']);
        //Print.tabela(G.matrizQ);
        //Print.tabela(['Matriz Taxa']);
        //for(var k in G.matrizTaxa){
        //    Print.tabela(G.matrizTaxa[k]);
        //}

        G.t = 0; 
        G.i = 0;
        G.h = parseFloat($('passo').value); 
        G.iMax = parseFloat($('iMax').value);
        G.estabilidade = parseFloat($('estabilidade').value);
        G.tMax = parseFloat($('tempoMax').value);
        G.stop = 0;
        
        
        
        
        G.compartimentos = new Array();
        for(var i in G.matrizQ){
            G.compartimentos[i] = new Compartimento(i, G.matrizQ[i]);
        }
        
        if(!G.extremos){
            G.extremos = new Extremos(null,null,null,null);
        }
        
        if(flag){
            loop();
        }else{
            noLoop();
        }

    }catch(err){
        alert('Erro setup: '+err);
    }            
        
}

function draw() {
    try{
        background(CORFUNDOCANVAS);
        
        
        for(var q in G.compartimentos){
            G.compartimentos[q].draw();    
            G.extremos.atualiza(G.compartimentos[q].getExtremos());
            G.compartimentos[q].setRelatives(G.extremos,G.bordas);
            G.compartimentos[q].drawGrafico();
        }
        
        Desenho.eixos(G.extremos,G.bordas,'u.T','u.V');
        
        
        var arrayStatus = new Array();
        arrayStatus.push('t = '+G.t.toFixed(3));
        arrayStatus.push('i = '+G.i);
        arrayStatus.push('erro = '+G.estabilidadeAtual);
        Desenho.desenharStatus(arrayStatus);        
        
        if(G.i == 0){
            var rotulos = new Array();
            rotulos.push('i', 't'); 
            
            for(var i in G.compartimentos){
                rotulos.push([G.compartimentos[i].getName(),G.compartimentos[i].getCor()]);
                //rotulos.push('diferenca');
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
            //linha.push(G.salvarQ[i] - G.matrizQ[i]);
        }
        
        Print.tabela(linha);
        
        G.i++;
        
        //if(G.i > G.n){ noLoop(); return; }
        
        
        G.salvarQ = G.matrizQ.slice();
        
        calculoRk4Compartimentos(G.matrizQ, G.matrizTaxa, G.h);
        
        
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
                break;
            }
            
         
        }
        if(G.i > G.iMax){
            noLoop();return;
        }        
        
        G.t += G.h;
        
        if(G.t > (G.tMax+G.h)){
            //alert('no Loop Tempo Max: '+G.t+'/'+G.tMax);
            noLoop();return;
        }        
        
        
        
        
        for(var q in G.compartimentos){
            G.compartimentos[q].update(G.t, G.matrizQ[q]);
        }
        
        if(G.stop > 30){
            
            noLoop();
            return;
        }
        
        
    }catch(err){
        alert('Erro draw: '+err);
    }            
}



alert('compartimentos OK');