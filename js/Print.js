class Print{

    static limpar(){
        try{
            var table = $('tabelaResultados');
            if(!table){
                alert('Erro Print.tabela(): tabelaResultados NotFound');
                return;
            }
                        
            table.innerHTML = "";            
        }catch(err){
           alert('Erro new Print.tabela(): '+err);
        }
    
    }


    static tabela(rotulos,th,colspan,tabelaFinal){
        try{
            var table = $('tabelaResultados');
            if(tabelaFinal){
                table = $('tabelaResultadosFinal');
            }
            if(!table){
                alert('Erro Print.tabela(): tabelaResultados NotFound');
                return;
            }
            var tag = 'td';
            if(th)tag = 'th';
            var tr = document.createElement('tr');
            
            
            
                      //= 0; i< rotulos.length;i++
            for(var i in rotulos){
                var tdRotulo = document.createElement(tag);
                var texto = rotulos[i];        
                var cor = null; 
                if(Array.isArray(rotulos[i])){
                    texto = rotulos[i][0];
                    cor = rotulos[i][1];
                    tdRotulo.style.backgroundColor = 'rgb('+cor[0]+','+cor[1]+','+cor[2]+')';                                    
                }
                tdRotulo.innerHTML = texto;
                if(colspan)tdRotulo.setAttribute('colspan',colspan);
                tr.appendChild(tdRotulo); 
            }
                        
            table.appendChild(tr);            
        }catch(err){
           alert('Erro new Print.tabela(): '+err);
        }
    
    }
    
    static tabelaInversa(rotulos,th,nLinha){
        try{
            var table = $('tabelaResultados');
            if(!table){ alert('Erro Print.tabela(): tabelaResultados NotFound'); return; }
            
            if(!nLinha)nLinha = 0;
            
            var tr = document.createElement('tr');
            tr.setAttribute('id','tr'+nLinha);
            
            var tag = 'td'; if(th)tag = 'th'; 
            
            for(var i = 0; i< rotulos.length;i++){
                var tdRotulo = document.createElement(tag);
                tdRotulo.innerHTML = rotulos[i];
                tr.appendChild(tdRotulo); 
            }

            if(nLinha){
                table.insertBefore(tr,$('tr'+(nLinha-1)));
            }else{
                table.appendChild(tr);
            }            
                                    
                        
        }catch(err){
           alert('Erro new Print.tabelaInversa(): '+err);
        }
    
    }

}
//alert('Print.js already');