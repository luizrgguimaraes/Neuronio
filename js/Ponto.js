class Ponto{
    constructor(x,y,rX,rY){
        try{
              this.x = x;
              this.y = y;
              this.relativeX = 0;
              this.relativeY = 0;
              if(rX){
                this.relativeX = rX;
              }
              if(rY){
                this.relativeY = rY;
              }
        }catch(err){
            alert('Erro new Ponto:'+err);
        }
    }
}

class Extremos{
    constructor(maxX, maxY, minX, minY){
        this.maxX = maxX;
        this.maxY = maxY;
        this.minX = minX;
        this.minY = minY;
    }
    
    atualiza(extremos){
        
        if(extremos.maxX > this.maxX || this.maxX == null){
            this.maxX = extremos.maxX;
        }        
        if(extremos.maxY > this.maxY || this.maxY == null){
            this.maxY = extremos.maxY;
        }
        if(extremos.minX < this.minX || this.minX == null){
            this.minX = extremos.minX;
        }
        if(extremos.minY < this.minY || this.minY == null){
            this.minY = extremos.minY;
        }
        
        return this;
    }
    
    imprimir(rotulo){
        try{
            Print.tabela([rotulo+' amplitude: X ['+this.minX+'-'+this.maxX+'], Y['+this.minY+','+this.maxY+']'],false,10);
        }catch(err){ alert('Erro Extremos.imprimir(): '+err); }

    }
}

class Pontos{
    constructor(objPonto){
            this.array = new Array();
            this.amplitude;            
    }
    add(obj){
        try{
            this.array.push(obj);    
        }catch(err){
            alert('Erro Pontos.add(): '+err);
        }
    }

    setExtremos(){
        try{
            var maxY = null;
            var minY = null;
            var maxX = null;
            var minX = null;
            for(var i = 0; i < this.array.length; i++){
                if(maxX == null){ maxX = this.array[i].x; } 
                if(maxY == null){ maxY = this.array[i].y; } 
                if(minX == null){ minX = this.array[i].x; } 
                if(minY == null){ minY = this.array[i].y; }
                if(maxY < this.array[i].y){ maxY = this.array[i].y; } 
                if(minY > this.array[i].y){ minY = this.array[i].y; } 
                if(maxX < this.array[i].x){ maxX = this.array[i].x; } 
                if(minX > this.array[i].x){ minX = this.array[i].x; }
        	}
            
            this.extremos = new Extremos(maxX, maxY, minX, minY);
            
            return this.extremos;            
        }catch(err){
            alert('Erro Pontos.setExtremos(): '+err);
        }
    }

    getExtremos(){
        try{
            return this.extremos;
        }catch(err){
            alert('Erro Pontos.setExtremos(): '+err);
        }
    }
    
    setRelative(extremos, bordaPercX, bordaPercY, bordaBottom, bordaLeft){
        try{
            /*define as coordenadas relativas ao tamanho do canvas e da ampitude maxima dos pontos
            */
            if(!bordaPercX)bordaPercX = 0.1;
            if(!bordaPercY)bordaPercY = 0.1;
            
            var bordaX = CANVASH * bordaPercX;
            var bordaY = CANVASW * bordaPercY;
            
            if(bordaBottom){
                var top = CANVASW * bordaPercX;
                var right = CANVASH * bordaPercY;
                var bottom = CANVASW * bordaBottom;
                var left = CANVASH * bordaLeft;
            }
            
            
            var amplitudeX = extremos.maxX - extremos.minX;
            var amplitudeY = extremos.maxY - extremos.minY;
             
            for(var i = 0; i < this.array.length;i++){
                var percX = (this.array[i].x - extremos.minX)/amplitudeX;
                this.array[i].relativeX = (bordaX/2) +((CANVASH - bordaX) * percX);
                
                if(bordaBottom){
                    this.array[i].relativeX = (left) +((CANVASH - right-left) * percX);
                }
                
                
                if(this.array[i].y == null){
                    this.array[i].relativeY = null;
                }else{
                    var percY = (this.array[i].y - extremos.minY)/amplitudeY; 
                    this.array[i].relativeY = ((-1)*bordaY/2) + CANVASW - ((CANVASW-bordaY) * percY);
                
                    if(bordaBottom){
                        this.array[i].relativeY = ((-1)*bottom) + CANVASW - ((CANVASW-top-bottom) * percY);
                    }
                }
                
                
            }
        }catch(err){
           alert('Erro Pontos.setRelative(): '+err);
        }
    }
    
    diferenca(pontos){
        try{
        
            var diferencas = new Pontos();
            var max = this.array.length;
            if(pontos.array.length > max)max = pontos.array.length;  
            
            for(var i = 0;i < max; i++){
                var diff = null;
                var x;
                
                if( (pontos.array[i]!=undefined) && (this.array[i]!=undefined)){
                    diff = this.array[i].y - pontos.array[i].y;
                    //diff = diff/pontos.array[i].y; //erro relativo
                    x = this.array[i].x;
                }else if(pontos.array[i]){
                    x = pontos.array[i].x;
                }else if(this.array[i]){
                    x = this.array[i].x;
                }else{
                    break;
                }
                diferencas.add(new Ponto(x,diff));
            }
            return diferencas;
        }catch(err){ alert('Erro Pontos.diferenca(): '+err); }
    }
    
    soma(pontos){
        try{
        
            var somas = new Pontos();
            var max = this.array.length;
            for(var i = 0;i < max; i++){
                var soma = 0; 
                soma = this.array[i].y + pontos.array[i].y;
                somas.add(new Ponto(i,soma));
            }
            return somas;
        }catch(err){ alert('Erro Pontos.soma(): '+err); }
    }
}

