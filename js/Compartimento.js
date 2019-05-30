class Compartimento{
    constructor(code,q){
        try{
        
            this.code = code;
            this.pontos = new Pontos();
            this.cor = Cores.getNewCor(code,0);
            this.corH = Cores.getNewCor(code,1);
            this.q =  q;
            this.name = 'Compartimento'+code;               
            this.count = 0;
            this.update(0,this.q);
            this.pontosH = new Pontos();
            this.updateH(0,0);
        
        }catch(err){alert('Erro Compartimento'+err);}
    }
    
    getName(){
        return this.name;
    }
    
    getCor(){
        return this.cor;
    }
    
    getLength(){
        return this.count;
    }
    
    update(t,q){
        try{    
            this.q = q;
            this.count++;
            this.pontos.add(new Ponto(t,q));
        }catch(err){alert('Erro Compartimento.update()'+err);}
    }

    updateH(t,h){
        try{    
           this.pontosH.add(new Ponto(t,h));
        }catch(err){alert('Erro Compartimento.updateH()'+err);}
    }

    
    draw(){
        try{    
            
            var posX = 50;
            var posY = 50;
            var width = 100;
            var length = 100;
    
            
            var deslocamentoX = this.code*220;
            var deslocamentoY = 0;
            
            new Recipiente(posX + deslocamentoX,posY + deslocamentoY,width,length, this.q, 1000,this.cor);
            
        }catch(err){alert('Erro Compartimento.draw()'+err);}
    }
    
    getExtremos(){
        try{    
    
            return this.pontos.setExtremos();
    
    
        }catch(err){alert('Erro Compartimento.getExtremos()'+err);}
    }
    getExtremosH(){
        try{    
    
            return this.pontosH.setExtremos();
    
    
        }catch(err){alert('Erro Compartimento.getExtremosH()'+err);}
    }
    setRelatives(extremos,bordas){
        try{    
    
            this.pontos.setRelative(extremos,bordas[0],bordas[1],bordas[2],bordas[3]);
    
        }catch(err){alert('Erro Compartimento.setRelatives()'+err);}
    }
    
    setRelativesH(extremos,bordas){
        try{    
    
            this.pontosH.setRelative(extremos,bordas[0],bordas[1],bordas[2],bordas[3]);
    
        }catch(err){alert('Erro Compartimento.setRelativesH()'+err);}
    }
    
    
    drawGrafico(){
        try{
     
            Desenho.desenharLinhas(this.pontos,this.cor,3);
     
     
        }catch(err){alert('Erro Compartimento.drawGrafico()'+err);}
    }
    
    drawGraficoH(){
        try{
     
            Desenho.desenharLinhas(this.pontosH,this.corH,1);
     
     
        }catch(err){alert('Erro Compartimento.drawGraficoH()'+err);}
    }
}

//alert('Compartimento OK');