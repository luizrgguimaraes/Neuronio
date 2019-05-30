class Globals{
    static getLiquido(){
        try{

            if(Globals.liquido == undefined){
                return false;
            }else{
                return Globals.liquido;
            }

        }catch(err){
            alert('Erro Globals: '+err);
        }            
    
    }

    static setLiquido(obj){
        Globals.liquido = obj;
    }

    static resetLiquido(){
        delete Globals.liquido;
        $('tabelaResultados').innerHTML = '';
        noLoop();
        draw();
    }

    static manual(){
        noLoop();
        draw();
    }
    
    static auto(){
        loop();
    }
    
    static getValue(campo){
        try{
            var obj = $('txt'+campo);
            if(!obj){
                alert('Objeto txt'+campo+ 'Nao Encontrado');
                return null;
            }
            
            return obj.value;
                
        }catch(err){
            alert('Erro getValue(): '+err);
        }
    }
    
    static mostrarTabela(obj, defined){
        try{
            if(Globals.showTable == undefined){
                Globals.showTable = true;
            }else{
                if(Globals.showTable){
                    Globals.showTable = false;
                }else{
                    Globals.showTable = true;
                    Globals.resetLiquido();                    
                }
            }
            
            if(defined != undefined){
                Globals.showTable = defined;
            }
            
            
            obj.classList.toggle("btnPressed",Globals.showTable);
            var div = $('divResultados');
            if(Globals.showTable){
                div.style.display = "block";
            }else{
                div.style.display = "none";
            }
                
        }catch(err){
            alert('Erro mostrarTabela(): '+err);
        }
    
    }

}


alert('Globals');
