class Desenho{

    static limparCanvas(){
        fill(50);
        rect(0, 0, canvas.width, canvas.height);
    }

    static desenharLinhas(pontos,cor,linhaStroke){
        try{
                
                var x, y, realX, realY;
                var strokeW = 1;

                stroke(cor);
                if(linhaStroke) strokeW = linhaStroke;
                strokeWeight(strokeW);
                noFill();

                beginShape();
                
                
                    for(var i = 0; i < pontos.array.length; i++){
                        
                        if(pontos.array[i].relativeY == null){
                            break;
                        }
                        
                        if(pontos.array[i].relativeX == 0){ 
                            x = pontos.array[i].x; y = pontos.array[i].y; 
                        }else{
                            x = pontos.array[i].relativeX; y = pontos.array[i].relativeY;
                        }
                        
                        realX = pontos.array[i].x;
                        realY = pontos.array[i].y; 
                        
                        vertex(x,y);
                    }
                    
                    
                    
                    //noFill();
                endShape();
                
        }catch(err){
                alert('Desenho.desenharLinhas(): '+err);
        }
    }
    
    static desenharElipses(pontos,cor,raio){
        try{        
            
            
            var r = 10;
            if(raio)r = raio;
            fill(cor);
            strokeWeight(0);
            
            var x,y;
            
            for(var i = 0; i < pontos.array.length; i++){

                if(pontos.array[i].relativeX == 0){ 
                    x = pontos.array[i].x; y = pontos.array[i].y;
                }else{ 
                    x = pontos.array[i].relativeX; y = pontos.array[i].relativeY;
                }

                ellipse(x,y,r,r);
        	}


        }catch(err){
            alert('Desenho.desenharElipses(): '+err);
        }
    }
    
    static desenharEixos(extremos,cor,indice,unidadeY){
        try{
            var color = 255;
            if(cor)color = cor;
            fill(cor);
            strokeWeight(0);
            textSize(15);
            
            //inferior esquerdo - eixo X
            var posEixoXx = CANVASH*0.1+5;  
            var posEixoXy = CANVASW-CANVASW*0.1-(15*(indice))+30;
            text( extremos.minX.toFixed(2)+' s ',posEixoXx,posEixoXy);
            
            //inferior direito - eixo X
            posEixoXx = CANVASH-CANVASH*0.1;  
            posEixoXy = CANVASW-CANVASW*0.1-(15*(indice))+30;
            text( extremos.maxX.toFixed(2)+' s ',posEixoXx,posEixoXy);
            
            
            //eixo Y inferior
            posEixoXx = 5;                                
            posEixoXy = CANVASW-CANVASW*0.1-15*(indice)-10;
            text( extremos.minY.toFixed(2)+ ' '+unidadeY,posEixoXx,posEixoXy);
            
            
            ////eixo Y superior
            posEixoXx = CANVASH*0.1 - 30;  
            posEixoXy = CANVASW*0.1-15*(indice+1);
            
            text( extremos.maxY.toFixed(2)+ ' '+unidadeY,posEixoXx,posEixoXy);
            
            
            
            
            //var posEixoYx = 10;
            //var posEixoYy = 15*(indice+1);  
            //text('('+extremos.minX+' s , '+extremos.maxY.toFixed(2)+' '+unidadeY+')',posEixoYx,posEixoYy);
        
            
            var eixoX = new Pontos();
            eixoX.add(new Ponto(0,CANVASW - CANVASW*0.1));
            eixoX.add(new Ponto(CANVASH-CANVASH*0.1,CANVASW - CANVASW*0.1));
            Desenho.desenharLinhas(eixoX, 255, 1);        
            
            var eixoY = new Pontos();
            eixoY.add(new Ponto(CANVASH*0.1,CANVASW));
            eixoY.add(new Ponto(CANVASH*0.1,CANVASW*0.1));
            Desenho.desenharLinhas(eixoY, 255, 1);
            
            var eixo0 = new Pontos();
            var perc0 = (0-extremos.minY)/(extremos.maxY - extremos.minY);
            var relative0 = CANVASW - CANVASW*0.1 - CANVASW*0.8*perc0;
            eixo0.add(new Ponto(CANVASH*0.1,relative0));
            eixo0.add(new Ponto(CANVASH-CANVASH*0.1,relative0));
            
            fill([255,255,0]); strokeWeight(0); textSize(15);
            text('0 '+unidadeY,CANVASH*0.1-50,relative0);
            Desenho.desenharLinhas(eixo0, [255,255,0], 1);
        
        }catch(err){ alert('Desenho.desenharEixos(): '+err); }
    }
    
    static eixos(extremos,bordas,unidadeX,unidadeY){
        try{
        
            
            var top = bordas[0];
            var right = bordas[1];
            var bottom = bordas[2];
            var left = bordas[3];
            
            
            fill(255);
            strokeWeight(0);
            textSize(10);
            
            //inferior esquerdo - eixo X
            var posEixoXx = CANVASH*left+5;  
            var posEixoXy = CANVASW-CANVASW*bottom + 10;
            text( extremos.minX.toFixed(2)+' '+unidadeX,posEixoXx,posEixoXy);
            
            //inferior direito - eixo X
            posEixoXx = CANVASH-CANVASH*right - 15;  
            posEixoXy = CANVASW-CANVASW*bottom + 10;
            text( extremos.maxX.toFixed(2)+' '+unidadeX,posEixoXx,posEixoXy);
            
            
            //eixo Y inferior
            posEixoXx = CANVASH*left - 40;                                
            posEixoXy = CANVASW-CANVASW*bottom-5;
            text( extremos.minY.toFixed(2)+ ' '+unidadeY,posEixoXx,posEixoXy);
            
            
            ////eixo Y superior
            posEixoXx = CANVASH*left - 30;  
            posEixoXy = CANVASW*top - 10;
            text( extremos.maxY.toFixed(2)+ ' '+unidadeY,posEixoXx,posEixoXy);
            
            
            
            
            //var posEixoYx = 10;
            //var posEixoYy = 15*(indice+1);  
            //text('('+extremos.minX+' s , '+extremos.maxY.toFixed(2)+' '+unidadeY+')',posEixoYx,posEixoYy);
        
            
            var eixoX = new Pontos();
            eixoX.add(new Ponto(0,CANVASW - CANVASW*bottom));
            eixoX.add(new Ponto(CANVASH-CANVASH*right,CANVASW - CANVASW*bottom));
            Desenho.desenharLinhas(eixoX, 255, 1);        
            
            var eixoY = new Pontos();
            eixoY.add(new Ponto(CANVASH*left,CANVASW));
            eixoY.add(new Ponto(CANVASH*left,CANVASW*top));
            Desenho.desenharLinhas(eixoY, 255, 1);
            
//             var eixo0 = new Pontos();
//             var perc0 = (0-extremos.minY)/(extremos.maxY - extremos.minY);
//             var relative0 = CANVASW - CANVASW*0.1 - CANVASW*0.8*perc0;
//             eixo0.add(new Ponto(CANVASH*0.1,relative0));
//             eixo0.add(new Ponto(CANVASH-CANVASH*0.1,relative0));
//             
//             fill([255,255,0]); strokeWeight(0); textSize(15);
//             text('0 '+unidadeY,CANVASH*0.1-50,relative0);
//             Desenho.desenharLinhas(eixo0, [255,255,0], 1);
        
        }catch(err){ alert('Desenho.eixos(): '+err); }
    }

    static desenharValorAtual(x,y,cor,indice,unidadeY){
        try{
            var color = 255;
            if(cor)color = cor;
            fill(cor);
            strokeWeight(0);
            textSize(20);
            
            var posEixoXx = CANVASH-250;  
            var posEixoXy = 20*(indice+1);
            text( '('+x.toFixed(2)+' s , '+y.toFixed(2)+' '+unidadeY+')',posEixoXx,posEixoXy);
            
        
        
        }catch(err){ alert('Desenho.desenharElipses(): '+err); }
    }
    
    static desenharStatus(arraytextos){
        try{
            fill(255);
            strokeWeight(0);
            textSize(13);
            
            for(var i in arraytextos){
                var posEixoXx = CANVASH-400;  
                var posEixoXy = 170+20*(i);
                text( arraytextos[i],posEixoXx,posEixoXy);
            }
            
            
        }catch(err){ alert('Desenho.desenharStatus(): '+err); }
    }

    
    static desenharTexto(arrayPontos,cor){
        try{        
            fill(cor);
            strokeWeight(0);
            textSize(20);
            for(var i = 0; i < arrayPontos.length; i++){
                text(arrayPontos[i].y.toFixed(4),arrayPontos[i].relativeX,arrayPontos[i].relativeY+20);
        	}
        }catch(err){
            alert('Desenho.desenharElipses(): '+err);
        }
    }
}




