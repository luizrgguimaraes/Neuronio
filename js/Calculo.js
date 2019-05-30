
function  calculoRk4Compartimentos(Q, X, h){
    try{
        var K1 = new Array();
        var K2 = new Array();
        var K3 = new Array();
        var K4 = new Array();
        
        var matrizQ = new Array();
        for(var q = 0; q < Q.length; q++){
            K1[q] = equacaoSomaCompartimentos(Q, X, q);
        //}            
         
        //for(var q = 0; q < Q.length; q++){
            matrizQ = new Array();
            for(var r in Q){ matrizQ.push(Q[r] + h/2*K1[q]); } 
            K2[q] = equacaoSomaCompartimentos(matrizQ, X, q);
        //}                     

        //for(var q = 0; q < Q.length; q++){
            matrizQ = new Array();
            for(var r in Q){ matrizQ.push(Q[r] + h/2*K2[q]); } 
            K3[q] = equacaoSomaCompartimentos(matrizQ, X, q);
        //}
            
        //for(var q = 0; q < Q.length; q++){
            matrizQ = new Array();
            for(var r in Q){ matrizQ.push(Q[r] + h*K3[q]); }
            K4[q] = equacaoSomaCompartimentos(matrizQ, X, q);
        }
        
        for(var q = 0; q < Q.length; q++){    
            Q[q] = Q[q] + (h/6)*(K1[q] + 2*K2[q] + 2*K3[q]+ K4[q]);                     
        }
        
        

    return Q;
    }catch(err){alert('Erro Calculo Rk4Compartimentos: '+err);}
}

function  calculoRk6Compartimentos(Q, X, global, q, flagDebug){
    try{
        
        var K1 = new Array();
        var K2 = new Array();
        var K3 = new Array();
        var K4 = new Array();
        var K5 = new Array();
        var K6 = new Array();
        
        var erroMax = global.erroMax;
        var hMax = global.hMax;
        var hMin = global.hMin;
        var tMax = global.tMax;
        var novoQ = new Array();
        var debug = new Array();
        
        
        //Print.tabela(['Calculo59 ',erroMax,hMax,hMin,tMax]);
        var flag = false;
        //Print.tabela(["q ="+q, global.t[q], global.h[q]]);
            
        var contador = 0;
            

            debug.push('h('+global.h[q]+')');
            debug.push('t('+global.t[q]+')');            
            while(true){
                    //Print.tabela(['contador = '+contador]);
                    debug.push('WHILE');
                    
                    K1[q] = global.h[q] * equacaoSomaCompartimentos(Q, X, q);
                    
                    var matrizQ = new Array();
                    for(var r in Q){ matrizQ.push(Q[r] + 1/4*K1[q]); } 
                    K2[q] = global.h[q] * equacaoSomaCompartimentos(matrizQ, X, q);                     
        
                    matrizQ = new Array();
                    for(var r in Q){ matrizQ.push(Q[r] + 3/32*K1[q] + 9/32*K2[q]); } 
                    K3[q] = global.h[q] *equacaoSomaCompartimentos(matrizQ, X, q);
                    
                    matrizQ = new Array();
                    for(var r in Q){ matrizQ.push(Q[r] + 1932/2197*K1[q] - 7200/2197*K2[q] + 7296/2197*K3[q]); } 
                    K4[q] = global.h[q] * equacaoSomaCompartimentos(matrizQ, X, q);                     

        
                    matrizQ = new Array();
                    for(var r in Q){ matrizQ.push(Q[r] + 439/216*K1[q] - 8*K2[q] + 3680/513*K3[q] - 845/4104*K4[q]); } 
                    K5[q] = global.h[q] * equacaoSomaCompartimentos(matrizQ, X, q);                     
        
                    matrizQ = new Array();
                    for(var r in Q){ matrizQ.push(Q[r] + 8/27*K1[q] + 2*K2[q] - 3544/2565*K3[q] + 1859/4104*K4[q] - 11/40*K5[q]); } 
                    K6[q] = global.h[q] * equacaoSomaCompartimentos(matrizQ, X, q);
                    
                    
                    var R = 1/global.h[q] * Math.abs(1/360*K1[q] - 128/4275*K3[q] - 2197/75240*K4[q] + 1/50*K5[q] + 2/55*K6[q]);                     
                    global.erro[q] = R;
                    //Print.tabela(['80 R = '+R]);
                    //Print.tabela(['80 RMAX = '+erroMax]);
                    
                    if(R <= erroMax){
                        global.t[q] += global.h[q];
                        global.hLastUsed[q] = global.h[q]; 
                        novoQ[q] = Q[q] + 25/216*K1[q] + 1408/2565*K3[q] + 2197/4104*K4[q] - 1/5*K5[q];
                        
                        //Print.tabela(['87 Novo Q = '+novoQ[q]]);
                        //Print.tabela(['87 Novo T = '+global.t[q]]);
                        var flag = true;
                        debug.push('>>updateok>>');
                    }else{
                        debug.push('>>NOUPDATE>>');
                    }
                    
        
                    var omega = 0.84*Math.pow(erroMax/R,1/4);
                    
                    if(omega <= 0.1){
                        global.h[q] = 0.1*global.h[q];
                        debug.push('h*0.1');
                    }else if(omega >= 4 ){
                        global.h[q] = 4*global.h[q];
                        debug.push('h*4.0');
                    }else{
                        global.h[q] = omega*global.h[q];
                        debug.push('omega');
                    }
                                
                    //Print.tabela(['101 novo h = '+global.h[q]]);
        
                    if(global.h[q] > hMax){
                        
                        global.h[q] = hMax;
                        //Print.tabela(['104 h maximo alcancado - h = '+global.h[q]]);
                        debug.push('H MAXIMO');
                    }else{
                        debug.push('H mantem');
                    
                    }
                    
                    debug.push('h='+global.h[q]);
                    
                    
                    if(global.t[q] >= tMax){
                        //Print.tabela(['105 t maximo alcancado - BREAK '+global.t[q]]);
                        debug.push('TMAXIMO BREAK');
                        break;
                    }else if( (global.t[q] + global.h[q]) > tMax){
                            global.h[q] = tMax - global.t[q];
                            //Print.tabela(['114 t maximo alcancado no Proximo Passo - h = '+(global.h[q] )]);
                            debug.push('PROXIMO   OK');
                    }else if(global.h[q] < hMin){
                            //Print.tabela(['ERRO: 116 H minimo alcançado BREAK - h = '+global.h[q] ]);
                            debug.push('HMINIMO BREAK');
                            global.aviso = 'HMINIMO BREAK i='+global.i;
                            
                            Print.tabela(debug);
                            flag = false;
                            break;                        
                     }else{
                            debug.push('TUDO OK');                            
                     }
                    contador++;
                    //Print.tabela(['120 hFinal = '+global.h[q]]);
                    
                    if(flag){
                        break;
                    }
            
            }
        //}
        
        //for(var q = 0; q < Q.length; q++){
            if(novoQ[q]!=undefined){
                Q[q] = novoQ[q];
            }
        //}
        
        if(flagDebug){
            Print.tabela(debug);
        }
        
        
        //alert('h = '+h);
        
        return flag;
    }catch(err){alert('Erro Calculo Rk6Compartimentos: '+err);}
}


function equacaoSomaCompartimentos(matrizQ, matrizX, q){
    try{
        
        
        var soma = 0;
        for(var i = 0; i < matrizX.length; i++){
            for(var j = 0; j < matrizX.length; j++){
                if(i == q){
                    soma -= matrizX[i][j] * matrizQ[q];
                }
                if(j == q){
                    soma += matrizX[i][j] * matrizQ[i];  
                }
            }
        }
        return soma;
    }catch(err){alert('Erro soma_Compartimentos(): '+err);}
}



//alert('Calculo OK');