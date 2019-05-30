const FRAMERATE = 60;
const CANVASW = 400;
const CANVASH = 700;
const CORFUNDOCANVAS = 50;
class G{}


class Barra{
    constructor(){
        this.matrizT = new Array();
        this.tMaxDivisoes = 10;
        this.xMaxDivisoes = 10;
        this.ht = 1;
        this.hx = 0.1;
        this.t = new Array();
        this.t[0] = 0;
        this.x = new Array();
        this.x[0] = 0;
        this.N = new Array();
        this.G = new Array();
        this.M = new Array();
        this.H = new Array();
        this.N[0] = 0.3176;
        this.M[0] = 0.0529;
        this.H[0] = 0.5961;

        
        //criar Matriz  
        for(var t=0; t <= this.tMaxDivisoes;t++){
            if(t > 0){
                //this.t[t] = this.t[t-1] + this.ht;
            }
            this.matrizT[t] = new Array();        
            for(var x=0; x <= this.xMaxDivisoes;x++){
                this.matrizT[t][x] = 0;
                
                if(x == 0){
                    this.matrizT[t][x] = -65.002;
                }else if(x == this.xMaxDivisoes){
                    this.matrizT[t][x] = 0;
                } 
            }
        }
        
        //for(var x=1; x <= this.xMaxDivisoes;x++){
        //    this.x[x] = this.x[x-1]+this.hx; 
        //}        
    }
    
    definirLinha0(){
        try{
            for(var x=1;x<this.xMaxDivisoes;x++){
                this.matrizT[0][x] = 10*Math.pow(Math.E,-0.2*x);
            
            }        
        
        
        }catch(err){alert('Erro definirLinha0: '+err);}
    }
    
    calcularG(tempo, Vm){
        try{
            
            var alfa,beta;

            alfa =  0.01 * (Vm-10) / (Math.E**((Vm - 10)/10) - 1);
            beta = 0.125 * Math.E**(Vm/80);
            this.N[tempo] = this.N[tempo-1] + this.ht*(alfa * (1 - this.N[tempo-1] - beta*this.N[tempo-1]));

            Print.tabela([this.N[tempo]]);

            alfa =  0.1 * (Vm-25) / (Math.E**((Vm - 25)/10) - 1);
            beta = 4 * Math.E**(Vm/18);
            this.M[tempo] = this.M[tempo-1] + this.ht*(alfa * (1 - this.M[tempo-1] - beta*this.M[tempo-1]));

            Print.tabela([this.M[tempo]]);

            alfa =  0.07 * Math.E**(Vm/20);
            beta = 1 / (Math.E**((Vm-30)/10) + 1);
            this.H[tempo] = this.H[tempo-1] + this.ht*(alfa * (1 - this.H[tempo-1] - beta*this.H[tempo-1]));
            Print.tabela([this.H[tempo] , this.ht*(alfa * (1 - this.H[tempo-1] - beta*this.H[tempo-1])), alfa, Vm]);
            Print.tabela([this.H[tempo]]);


            this.G[tempo] = 3.6 * this.N[tempo]*(Vm + 0.077) + 12*(this.M[tempo]**3)*this.H[tempo]*(Vm-0.05) + 0.03*(Vm+0.054402);
        }catch(err){alert('Erro calcularN: '+err);}
    }

    

    calcularLinha(tempo){
        try{
            var A = 1*Math.pow(10,-6);
            var R = 900;
            var CM = 1*Math.pow(10,-6);
           
            this.calcularG(tempo,this.matrizT[tempo-1][0]);    


            for(var x=1;x<this.xMaxDivisoes;x++){
                
                this.matrizT[tempo][x] = ((this.matrizT[tempo-1][x] + (A/(2*R))*(this.matrizT[tempo-1][x-1] - 2*this.matrizT[tempo-1][x] + this.matrizT[tempo-1][x+1])/(Math.pow(this.hx,2))-this.G[tempo-1])*this.ht)/CM;
                //Print.tabela([this.matrizT[tempo-1][x],A/(2*R),this.matrizT[tempo-1][x-1] - 2*this.matrizT[tempo-1][x] + this.matrizT[tempo-1][x+1],Math.pow(this.hx,2),this.G[tempo-1],this.ht,CM,this.matrizT[tempo][x]]);
               
                
            }
                    
        }catch(err){alert('Erro definirLinha: '+err);}
    }
    
    definirPontos(){
        try{
            this.pontos = new Pontos();
            for(var t in this.matrizT){
                //for(var x in this.matrizT[t]){
                    this.pontos.add(new Ponto(this.t[t],this.matrizT[t][1]));
                //}
            }
            
        }catch(err){alert('Erro definirPontos: '+err);}
    }
    
    
    
    print(){
        
        //var head = new Array();
        //head.push('');
        //for(var x in this.t){
        //    head.push(this.x[x]);
        //}
        //Print.tabela(head,true);
        
        for(var t=0; t <= this.tMaxDivisoes;t++){
            var linha = new Array();
            //linha.push(this.t[t]);
            for(var x in this.matrizT[t]){
                linha.push(this.matrizT[t][x]);
            }
            Print.tabela(linha);
        }
    
    }
    
    printLinha(t){
        
//         var head = new Array();
//         head.push('');
//         for(var x in this.t){
//             head.push(this.x[x]);
//         }
//         Print.tabela(head,true);
        
        //for(var t=0; t <= this.tMaxDivisoes;t++){
            var linha = new Array();
            linha.push(this.t[t]);
            for(var x in this.matrizT[t]){
                linha.push(this.matrizT[t][x]);
            }
            Print.tabela(linha);
        //}
    
    }
}

function temperaturaInicial(x){
    return x*(x-1);
}


function setup(flag) {
    try{
        frameRate(FRAMERATE);
        //createCanvas(CANVASH, CANVASW);
        background(CORFUNDOCANVAS);
        
        G.barra = new Barra();        
        G.barra.definirLinha0();
        //for(var linha=1;linha < G.barra.matrizT.length;linha++ ){
            //G.barra.definirLinha(linha);
        //}
        
        
        //barra.pontos.extremos.imprimir();
        G.barra.tempo = 1;
        //G.barra.print();
        //G.barra.pontos = new Pontos();
        
        
        //if(!G.extremos){
        //    G.extremos = new Extremos(null,null,null,null);
        //}
        
        
    }catch(err){alert('Erro setup: '+err);}
    
        
}

function draw() {
    try{
        
        //background(CORFUNDOCANVAS);
        //G.barra.printLinha(G.barra.linha);
        
        G.barra.calcularLinha(G.barra.tempo);
        
        //G.barra.pontos.add(new Ponto(G.barra.t[G.barra.linha],G.barra.matrizT[G.barra.linha][9]));
        // Print.tabela([G.barra.pontos.array[G.barra.linha-1].x,G.barra.pontos.array[G.barra.linha-1].y]);
        //G.barra.pontos.setExtremos();
        // G.extremos.atualiza(G.barra.pontos.setExtremos());
        // G.barra.pontos.setRelative(G.extremos,0,0,0,0);
        // Desenho.desenharElipses(G.barra.pontos,255,3);
        
        //G.barra.printLinha(G.barra.tempo);
        
        //var amplitude = G.extremos.maxY - G.extremos.minY;
        //alert(amplitude);
        //var calor = Math.round(G.barra.matrizT[G.barra.linha][9]*255/G.extremos.maxY);
        //alert(calor);
        //noStroke();
        //fill(calor,0,0);
        //rect(X,Y,L,H);     
        
        
        
        
        G.barra.tempo++;
        if(G.barra.tempo > 10){
            G.barra.print();
            noLoop();
        }
    
    }catch(err){alert('Erro draw: '+err);}
}

    


alert('temperatura OK');