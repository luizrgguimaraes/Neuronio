// JavaScript Document

function round2(num, casas){
    try{
    
        var fator = 1.0;
        for(var i = 0; i< casas; i++){
            fator *= 10.0;
        }
        
        //alert('fator = '+fator);
        var res = Math.round(num*fator)/fator;
        //alert('res = '+res);                                                                 
        return res; 

    }catch(err){ alert('Erro definirOrdem: '+err); }
}

function definirOrdem(array){
    try{
        var ordem = new Array();
        var copia = array.slice();
        copia.sort();
        for(var c in copia){
            var index = 0;
            if(array[index] != copia[c]){
                index++;
            } 
            while(ordem.indexOf(index)>-1 || (array[index] != copia[c])){//se indice ja foi usado
                index = array.indexOf(copia[c],index+1);
            }
            ordem[c] = index;
        }
        return ordem;
    }catch(err){
        alert('Erro definirOrdem: '+err);
    }
    
}


function $(elid){ 

    try{

        var obj=document.getElementById(elid);

        if(obj){return obj;}else{

            //alert('ELEMENTO NAO ENCONTRADO:'+elid);
        }

        return false;

    }catch(err){

        //alert('Error on $('+elid+'): '+err);

    }

}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

if (typeof Array.isArray === 'undefined') {
    Array.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
}

//alert('utils ok');