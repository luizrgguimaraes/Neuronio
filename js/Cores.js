corModelo = 
    [
    [255,0,0] //vermelho
    ,[150,0,0] //vermelho
    ,[0,200,0]   //verde
    ,[0,100,0]   //verde
    ,[0,0,255] //azul
    ,[0,0,100] //azul
    ,[255,100,0]//amarelo
    ,[150,50,0]//amarelo
    ,[255,0,255] //magenta
    ,[30,144,255]//azul claro
    ,[105,105,105] //cinza
    ,[139,69,19] //marrom
    ];


class Cores{
    static getNewCor(codCor, indice){
        try{
            if(Cores.corUsada == undefined){
                Cores.corUsada = new Array();
            }
            if(codCor != undefined){
                Cores.corUsada[codCor] = 1;
                return corModelo[codCor*2+indice];
            }
            
            if(Cores.corCount == undefined){
                Cores.corCount = 0;
            }
            while(Cores.corUsada[Cores.corCount]){
                Cores.corCount++
                if(Cores.corCount >= corModelo.length){
                    alert('Limite de Cores Alcançado:'+Cores.corCount);
                    Cores.corCount = 0;
                    Cores.corUsada = new Array();
                }
                            
            }
            Cores.corUsada[Cores.corCount] = 1;
            return corModelo[Cores.corCount];                        
        }catch(err){
            alert('Erro getNewCor:'+err);
        }
    }
}