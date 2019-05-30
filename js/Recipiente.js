class Recipiente{
    constructor(X,Y,L,H,V,V0,cor){try{
    
        var pontos = new Pontos();
        pontos.add(new Ponto(X, Y));
        pontos.add(new Ponto(X, Y+H));
        pontos.add(new Ponto(X + L, Y+H));
        pontos.add(new Ponto(X + L, Y));
        pontos.add(new Ponto(X, Y));
        
        var corRecipiente =[255,255,255];
        if(cor)corRecipiente = cor;
        Desenho.desenharLinhas(pontos,corRecipiente, 5, true);

       var percentual = V/V0; 
       //if(V0 == 0)V0 = 1000; //- Quantidade maxima Padrao
       //percentual = V/V0;
       
        
       var h = (H-10)*(percentual); 
       var conteudo = new Conteudo(X+5, Y+H-h-5, L-10, h);
        
        
       fill(255);
       strokeWeight(0);
       textSize(15);
       text(parseFloat(V).toFixed(4) + ' u.V. ('+(percentual*100).toFixed(2)+'%)' ,X,Y-10);
    	
    }catch(err){ alert('Erro new Recipiente: '+err);}}
}

class Conteudo{
    constructor(X,Y,L,H,intensidade){try{
        noStroke();
        fill(0,0,255);
        rect(X,Y,L,H);
    }catch(err){ alert('Erro new Recipiente: '+err);}}
}


