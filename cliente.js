class Cliente {
    constructor() {
        this.clientes = localStorage.getItem("tbClientes") === null ? [] : JSON.parse(localStorage.getItem("tbClientes"))
    }

    salva(cliente) {
        this.clientes.push(cliente)
        localStorage.setItem("tbClientes", JSON.stringify(this.clientes))
        alert('Cliente salvo com sucesso!')
        this.limpa()
        return true
    }
    apaga(id) {
        
        let index = this.clientes.map((cliente) => cliente.código).indexOf(id);
        alert(index)
        if (index > -1) {
            this.clientes.splice(index, 1) //o 1o parâmetro é o índice do array e o segundo o número de itens que serão removidos
            this.clientes = clientes.filter(cliente => cliente.código !== id)
        }
    }

    limpa(){
        document.getElementById('código').value = ''
        document.getElementById('nome').value = ''
        document.getElementById('cep').value = ''
        document.getElementById('endereco').value = ''
        document.getElementById('bairro').value = ''
        document.getElementById('cidade').value = ''
        document.getElementById('observacoes').value = ''
    }

    edita(cliente){
        document.getElementById('código').setAttribute('disabled', 'disabled')
        document.getElementById('código').value = cliente.código
        document.getElementById('nome').value = cliente.nome

    }

    lista() {
        const listagem = this.clientes.map((cliente) => (
            `<tr>
                <td>${cliente.código}</td>
                <td>${cliente.nome}</td>
                <td>${cliente.cep}</td>
                <td>${cliente.endereco}</td>
                <td>${cliente.bairro}</td>
                <td>${cliente.cidade}</td>
                <td>${cliente.observacoes}</td>
                <td><button id='apagar' onClick='cliente.apaga(${cliente.código})'>🗑️Apagar</button>
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
                <th>Opções</th>
            </thead>
            <tbody>
            ${listagem}
            </tbody>
        </table>`
        )
    }

}
//instanciamos novo objeto
const cliente = new Cliente()

//tratamos o botão salvar
document.getElementById('salvar').onclick = function () {
    const registro = {
        código: document.getElementById('código').value,
        nome: document.getElementById('nome').value,
        cep: document.getElementById('cep').value,
        endereco: document.getElementById('endereco').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        observacoes: document.getElementById('observacoes').value
    }
    cliente.salva(registro)

}

//tratamos a listagem
window.onload = function() {
    document.getElementById('listagem').outerHTML = cliente.lista()    
}