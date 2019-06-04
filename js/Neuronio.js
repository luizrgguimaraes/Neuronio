const V = 0;
const N = 1;
const M = 2;
const H = 3;

class Neuronio{
    constructor(){
        try{
                this.matriz = new Array();
                this.matriz[V] = new Array();
                this.matriz[N] = new Array();
                this.matriz[M] = new Array();
                this.matriz[H] = new Array();


                this.pontos = new Array();
                
                this.comprimento = 1;//1 metro
                this.hx = 0.1;
                this.xMaxDivisoes = this.comprimento/this.hx;
                this.x = new Array();
                this.x[0] = 0;
                
                this.periodo = 10;//10 segundos
                this.ht = 0.01;
                this.tMaxDivisoes = this.periodo/this.ht;
                this.t = new Array();
                this.t[0] = 0;
        
                
//                 this.matriz[N][0] = new Array();
//                 this.matriz[N][0][0] = 0.3176;
//                 this.matriz[M][0] = new Array();
//                 this.matriz[M][0][0] = 0.0529;
//                 this.matriz[H][0] = new Array();
//                 this.matriz[H][0][0] = 0.5961;
        
                //criar Matriz  
                for(var t=0; t <= this.tMaxDivisoes;t++){
                    
                    this.matriz[V][t] = new Array();
                    this.matriz[N][t] = new Array();
                    this.matriz[M][t] = new Array();
                    this.matriz[H][t] = new Array();
                            
                    for(var x=0; x <= this.xMaxDivisoes;x++){
                        this.matriz[V][t][x] = 0;
                        this.matriz[N][t][x] = 0.3176;
                        this.matriz[M][t][x] = 0.0529;
                        this.matriz[H][t][x] = 0.5961;
        
                        //fronteiras
                        if(x == 0){
                            this.matriz[V][t][x] = -65.002;
                        }else if(x == this.xMaxDivisoes){
                            this.matriz[V][t][x] = 0;
                        } 
                    }
                }

                //preencher cabeçarios de tempo e espaço
                for(var t=1; t <= this.tMaxDivisoes;t++){
                    this.t[t] = this.t[t-1] + this.ht;
                }

                for(var x=1; x <= this.xMaxDivisoes;x++){
                    this.x[x] = this.x[x-1]+this.hx; 
                }

                //definir linha 0        
                for(var x=1;x<this.xMaxDivisoes;x++){
                    this.matriz[V][0][x] = 10*Math.pow(Math.E,-0.2*x);
                }

                for(var x=0; x < this.xMaxDivisoes;x++){
                    this.pontos[x] = new Pontos(); 
                }


        }catch(err){alert('Erro new Neuronio(): '+err);}

    }
    
    calcularLinha(tempo){
        try{

            var A = 1*Math.pow(10,-6);
            var R = 900;
            var CM = 1;
           
            //this.calcularG(tempo,this.matriz[tempo-1][0]);    
            for(var x=1;x<this.xMaxDivisoes;x++){
                
                
                var debugHead = new Array();
                var debug = new Array();
                
                var Asobre2R = A/(2*R);
                debug.push(Asobre2R);debugHead.push('Asobre2R');
                
                var VCentrada = this.matriz[V][tempo-1][x-1] - 2*this.matriz[V][tempo-1][x] + this.matriz[V][tempo-1][x+1];  
                debug.push(VCentrada);debugHead.push('VCentrada');
                
                var DeltaxAoQaudrado = this.hx**2;
                debug.push(DeltaxAoQaudrado);debugHead.push('DeltaxAoQaudrado');
                
                var primeiraParte = Asobre2R*(VCentrada/DeltaxAoQaudrado); 
                debug.push(primeiraParte);debugHead.push('primeiraParte');
                
                var nAnterior = this.matriz[N][tempo][x-1];
                var mAnterior = this.matriz[M][tempo][x-1];
                var hAnterior = this.matriz[H][tempo][x-1];
                
                var g1 = 3.6 * (nAnterior**4)*(this.matriz[V][tempo-1][x] + 0.077);
                debug.push(g1);debugHead.push('g1');
                
                var g2 = 12*(mAnterior**3)*hAnterior*(this.matriz[V][tempo-1][x]-0.05);
                debug.push(g2);debugHead.push('g2');
                
                var g3 = 0.03*(this.matriz[V][tempo][0]+0.054402);
                debug.push(g3);debugHead.push('g3');
                
                var gs = g1+g2+g3;
                debug.push(gs);debugHead.push('gs');
                
                var primeiraParteMenosGs = primeiraParte - gs;
                debug.push(primeiraParteMenosGs);debugHead.push('primeiraParteMenosGs');
                                                        
                var VezesDeltaT = primeiraParteMenosGs * this.ht;
                debug.push(VezesDeltaT);debugHead.push('VezesDeltaT');
                
                var MaisVAnterior = VezesDeltaT + this.matriz[V][tempo-1][x];  
                debug.push(MaisVAnterior);debugHead.push('MaisVAnterior');
                
                var sobreCm = MaisVAnterior/CM;
                debug.push(sobreCm);debugHead.push('sobreCm');                                 
                
                this.matriz[V][tempo][x] = sobreCm;
                
                this.matriz[N][tempo][x] = this.novoN(nAnterior,this.matriz[V][tempo][x]);
                this.matriz[M][tempo][x] = this.novoM(mAnterior,this.matriz[V][tempo][x]);
                this.matriz[H][tempo][x] = this.novoH(hAnterior,this.matriz[V][tempo][x]);
                Print.tabela(['n='+this.matriz[N][tempo][x],'m='+this.matriz[M][tempo][x],'h='+this.matriz[H][tempo][x]]);
                
                //Print.tabela(debugHead);
//                 Print.tabela(debug);    
                
            }
                                
        }catch(err){alert('Erro Neuronio.calcularLinha: '+err);}
    }

    
    novoN(n, Vm){
        try{
            var alfa,beta;
            alfa =  0.01 * (Vm+10) / (Math.E**((Vm + 10)/10) - 1);
            beta = 0.125 * Math.E**(Vm/80);
            return n + this.ht*(alfa*(1 - n) - beta*n); 
        }catch(err){alert('Erro novoN(): '+err);}
    }
    novoM(m, Vm){
        try{
            var alfa,beta;
            alfa =  0.1 * (Vm-25) / (Math.E**((Vm - 25)/10) - 1);
            beta = 4 * Math.E**(Vm/18);
            return m + this.ht*(alfa * (1 - m) - beta*m);
        }catch(err){alert('Erro novoM(): '+err);}
    }
    novoH(h, Vm){
        try{
            var alfa,beta;
            alfa =  0.07 * Math.E**(Vm/20);
            beta = 1 / (Math.E**((Vm-30)/10) + 1);
            return h + this.ht*(alfa * (1 - h) - beta*h);
        }catch(err){alert('Erro novoH(): '+err);}
    }
    
    
    print(maxLinha){
        try{
                var head = new Array();
                head.push('');
                for(var x in this.x){
                    head.push(this.x[x]);
                }
                Print.tabela(head,true);
                
                for(var t=0; t <= this.tMaxDivisoes;t++){
                    if(t>maxLinha)break;
                    var linha = new Array();
                    linha.push(this.t[t]);
                    for(var x in this.matriz[V][t]){
                        linha.push(this.matriz[V][t][x]);
                    }
                    Print.tabela(linha);
                }
        }catch(err){alert('Erro Neuronio.print(): '+err);}
    }
    
    printLinha(t){
        try{        

            var linha = new Array();
            linha.push(this.t[t]);
            for(var x in this.matriz[V][t]){
                linha.push(this.matriz[V][t][x]);
            }
            Print.tabela(linha);

        }catch(err){alert('Erro Neuronio.printLinha(): '+err);}
    
    }

    
}

