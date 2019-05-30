class Entrada{
    constructor(nome, padrao){
        this.nome = nome;
        this.padrao = padrao;
    }

}

function adicionarLinhaParametros(entradas){
    try{
            
            var table = $('tableComandos');
            
            var tr = document.createElement('tr');                    
            table.appendChild(tr);
            
            for(var entrada in entradas){
                var label = document.createElement('h7');
                label.innerHTML = entradas[entrada].nome;
                var input = document.createElement('input');
                input.id = entradas[entrada].nome;
                input.value = entradas[entrada].padrao;
                input.style.width = '50px';            
                var td1 = document.createElement('td');
                td1.appendChild(label);
                var td2 = document.createElement('td');
                td2.appendChild(input);
                tr.appendChild(td1);
                tr.appendChild(td2);
            }

    }catch(err){ alert('Erro adicionarLinhaParametros(): '+err); }
}

function getValue(entrada){
    return parseFloat($(entrada).value);
}
