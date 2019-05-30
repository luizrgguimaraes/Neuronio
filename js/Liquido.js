class Liquido{
    
    constructor(v0, tx, nIteracoes,periodo){
        try{
            this.retirado = new Array();
            this.v = new Array();

                        
            this.tx = tx;
            this.n = nIteracoes;
            this.x = this.tx/this.n; 
            this.i = 0;
            this.v[this.i] = v0;
            this.retirado[this.i] = 0;

            this.dia = 0;
            this.hora = 0;
            this.minuto = 0;
            
            this.periodo = periodo;
            this.nIteracoesEntrePausas = this.getNIteracoesEntrePausas(this.periodo);
            this.proxPausa = 0;
            
        }catch(err){
            alert('Erro new Liquido(): '+err);
        }
    }
    
    getVolume(id){ try{ return this.v[id]; }catch(err){ alert('Erro getVolume(): '+err); } }
    getTaxa(){ try{ return this.tx; }catch(err){ alert('Erro getTaxa(): '+err); } }
    getPrecisao(){ try{ return this.n; }catch(err){ alert('Erro getPrecisao(): '+err); } }
    getPeriodo(){ try{ return this.periodo; }catch(err){ alert('Erro getPeriodo(): '+err); } }
    setPeriodo(periodo){ try{ this.periodo = periodo; }catch(err){ alert('Erro getPeriodo(): '+err); } }
    getIteracao(){ try{ return this.i; }catch(err){ alert('Erro getIteracao(): '+err); } }


    transferir(){
        try{
            this.i++;
            this.retirado[this.i] = this.x * this.v[this.i-1]
            this.v[this.i] = this.v[this.i-1] - this.retirado[this.i];

            this.dia = Math.floor((this.i)/this.n);
            this.hora = Math.floor((this.i)/(this.n/24))%24;
            this.minuto = Math.floor((this.i)/(this.n/1440))%60;
            
            
             
            if((this.i%this.getPrecisao())==0){
                var dia = this.i/this.getPrecisao();
                var expoente = this.getTaxa()*(-1)*(dia);
                var potencia = Math.exp(expoente);
                var vA = this.v[0] * potencia;
                 
                
                //Print.tabelaInversa(['expoente = '+expoente],false,this.i);
                //Print.tabelaInversa(['potencia = '+potencia],false,this.i);
                //Print.tabelaInversa(['Volume 0 = '+this.v0],false,this.i);
                Print.tabela(['Volume A = '+vA],false);
                    
            }
        }catch(err){
            alert('Erro Liquido.transferir(): '+err);
        }
    }

    getNIteracoesEntrePausas(periodoString){
        try{
            var array = periodoString.split(":");
            
            var periodo = 0;
            var dia = array[0]; if(dia){ periodo = dia * this.n; }
            var hora = array[1]; if(hora){ periodo += Math.ceil(hora * (this.n/24)); }
            var minuto = array[2]; if(minuto){ periodo += Math.floor(minuto * (this.n/1440)); }
            return periodo;
        }catch(err){
            alert('Erro Liquido.getNIteracoesEntrePausas(): '+err);
        }
    }

    getStop(periodo){
        try{
        
            //alert('68');
            if(!periodo){
                //alert('70');
                this.nIteracoesEntrePausas = this.getPrecisao();
                this.proxPausa = this.nIteracoesEntrePausas; 
                
            }else if(!this.nIteracoesEntrePausas || (periodo != this.getPeriodo())){
                this.setPeriodo(periodo);
                this.nIteracoesEntrePausas = this.getNIteracoesEntrePausas(periodo);
                this.proxPausa = this.nIteracoesEntrePausas;
            }
            
            while(this.getIteracao() > this.proxPausa){
                    this.proxPausa += this.nIteracoesEntrePausas;  
            }
            //alert('81');
            
            if(this.proxPausa == (this.getIteracao())){
                //== para que usuario possa ligar automatico novamente
                this.proxPausa += this.nIteracoesEntrePausas;
                noLoop();
                return true;
            }else{
                return false;
            }
            
        }catch(err){
            alert('Erro Liquido.getStop(): '+err);
        }
    
    }

    getStopVolume(volume){
        try{
            var volumeAtual = this.getVolume(this.getIteracao()); 
            //alert(volumeAtual + '/'+ volume);
            if(volumeAtual <= volume){
                noLoop();
                return true;
            }
            return false; 
            
        }catch(err){
            alert('Erro Liquido.getStopVolume(): '+err);
        }
    
    }


    
    debug(destacar){
        try{
            var campos = [ this.i
                            ,this.dia+' '+pad(this.hora,2)+':' + pad(this.minuto,2)
                            ,this.v[this.i-1]
                            ,this.retirado[this.i]
                            ,this.v[this.i]
                        ]; 
            //Print.tabelaInversa(campos,destacar,this.i);
            Print.tabela(campos,false);
        }catch(err){
            alert('Erro Liquido.debug(): '+err);
        }
    }

    debugIni(){
        try{
            Print.tabela(['i','D hh:mm','Vol Anterior','Transferido','Vol Atual'],true);
            //Print.tabelaInversa([this.i,this.dia,this.hora,this.minuto,'','',this.v[this.i]],false,0);
        }catch(err){
            alert('Erro Liquido.debugIni(): '+err);
        }
    }
    
    
    desenhar(){
        try{
            var percentualA = this.v[this.i]/this.v[0];
            var percentualB = 1 - percentualA;
            
            var recipienteA = new Recipiente(100,80,100,200, this.v[this.i], this.v[0]);
            var recipienteB = new Recipiente(400,140,100,200, (this.v[0] - this.v[this.i]), this.v[0]);
            
            //Print.tabelaInversa(['i = '+this.i+'/proxPausa = '+this.proxPausa],false,this.i);
            var transferindo = this.retirado[this.i].toFixed(4);
            
            var encanamento = new Encanamento(200-3,280-15,205,10, transferindo);
            
            fill(255);
            strokeWeight(0);
            textSize(30);        
            text('Dia ' + this.dia + ' - '+ pad(this.hora,2) + 'h' + pad(this.minuto,2) + 'm',20,30);
        }catch(err){
            alert('Erro Liquido.desenhar(): '+err);
        }
    }
    
    
}



class Encanamento{
    constructor(X,Y,L,H,transferindo){try{
        
        stroke(255);
        strokeWeight(2);
        line(X+2, Y, X+L-1, Y);
        line(X+2, Y+10, X+L-1, Y+10);
        
        if(transferindo > 0){
            fill(0,0,255);
        }else{
            fill(50);
        }
        
        noStroke();
        rect(X,Y+1,L+1,H-2);

        fill(255);
        strokeWeight(0);
        textSize(20);
        text(transferindo + ' u.V. ',X+20,Y-10);


    }catch(err){ alert('Erro new encanamento: '+err);}}
}

