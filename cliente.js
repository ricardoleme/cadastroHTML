class Cliente {
    constructor() {
        this.clientes = localStorage.getItem("tbClientes") === null ? [] : JSON.parse(localStorage.getItem("tbClientes"))
        //exemplo de Marcas
        localStorage.setItem("tbMarcas",
        JSON.stringify([
            {
              "id": 1,
              "nome": "Gucci"
            },
            {
              "id": 2,
              "nome": "Lacoste"
            },
            {
              "id": 3,
              "nome": "Nike"
            }
          ]
          ))
          //Carregando outra tabela
          this.parsedMarcas = JSON.parse(localStorage.getItem('tbMarcas')) || [];
         
          
            const select = document.getElementById('marcas');
          
            for (const marca of this.parsedMarcas) {
              const option = document.createElement('option');
              option.value = marca.id;
              option.textContent = marca.nome;
          
              select.appendChild(option);
            
          }
    }

    salva(cliente) {
        if(document.getElementById('codigo').getAttribute('disabled')==='disabled'){
            this.apaga(cliente.codigo) 
        }
        this.clientes.push(cliente)
        localStorage.setItem("tbClientes", JSON.stringify(this.clientes))
        alert('Cliente salvo com sucesso!')
        this.limpa()
        return true
    }
    apaga(codigo) { 
       let index = this.clientes.findIndex(cliente => cliente.codigo == codigo)      
       this.clientes.splice(index, 1) //o 1o parâmetro é o índice do array e o segundo o número de itens que serão removidos
       localStorage.setItem("tbClientes", JSON.stringify(this.clientes))
       cliente.atualiza() 
    }

    limpa(){
        document.getElementById('codigo').value = ''
        document.getElementById('nome').value = ''
        document.getElementById('cep').value = ''
        document.getElementById('endereco').value = ''
        document.getElementById('bairro').value = ''
        document.getElementById('cidade').value = ''
        document.getElementById('marcas').value = ''
        document.getElementById('observacoes').value = ''
    }

    edita(cliente){
        document.getElementById('codigo').setAttribute('disabled', 'disabled')
        document.getElementById('codigo').value = cliente.codigo
        document.getElementById('nome').value = cliente.nome
        document.getElementById('cep').value = cliente.cep
        document.getElementById('endereco').value = cliente.endereco
        document.getElementById('bairro').value = cliente.bairro
        document.getElementById('cidade').value = cliente.cidade
        document.getElementById('marcas').value = cliente.marcas
        document.getElementById('observacoes').value = cliente.observacoes

    }

    lista() {
        const listagem = this.clientes.map((cliente) => (
            `<tr>
                <td>${cliente.codigo}</td>
                <td>${cliente.nome}</td>
                <td>${cliente.cep}</td>
                <td>${cliente.endereco}</td>
                <td>${cliente.bairro}</td>
                <td>${cliente.cidade}</td>
                <td>${cliente.observacoes}</td>
                <td>${cliente.marca.nome || null}</td>
                <td><button id='apagar' onClick='cliente.apaga(${cliente.codigo})'>🗑️Apagar</button>
                    <button id='editar' onClick='cliente.edita(${JSON.stringify(cliente)})'>📝Editar</button>
                </td>    
            </tr>`
        ))
        return (`
        <table border='1' class='paleBlueRows'>
         <caption>Relação dos Clientes</caption>
            <thead>
                <th>Código</th>
                <th>Nome</th>
                <th>CEP</th>
                <th>Endereço</th>
                <th>Bairro</th>
                <th>Cidade</th>
                <th>Observações</th>
                <th>Marca</th>
                <th>Opções</th>
            </thead>
            <tbody>
            ${listagem}
            </tbody>
        </table>`
        )
    }

    atualiza(){     
        document.getElementById('listagem').innerHTML = cliente.lista()
    }

}
//instanciamos novo objeto
const cliente = new Cliente()

//tratamos o botão salvar
document.getElementById('frmCliente').onsubmit= function () {
    const registro = {
        codigo: document.getElementById('codigo').value,
        nome: document.getElementById('nome').value,
        cep: document.getElementById('cep').value,
        endereco: document.getElementById('endereco').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        marca: cliente.parsedMarcas.find(marca => marca.id == document.getElementById('marcas').value),
        observacoes: document.getElementById('observacoes').value
    }
    cliente.salva(registro)

}

//tratamos a listagem
window.onload = function() {
    cliente.atualiza()   
}


  