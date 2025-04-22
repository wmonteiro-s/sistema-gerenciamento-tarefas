import promptSync from 'prompt-sync'
import { chooseOption, showMenu } from './auxiliary_functions.js'

const prompt = promptSync()
const log = console.log

// A função principal que inicia o loop de interação com o usuário
async function main(){
    // Mensagem de boas-vindas
    log('Olá, seja muito bem vindo(a) ao Gerenciador de Tarefas!\n')
    
    // Flag para controlar a continuidade do loop
    let control = true
    // Flag para identificar a primeira exibição do menu
    let firstTime = true
    do {
        let menu
        let option

        if(firstTime) {
            // Exibe o menu na primeira vez sem perguntar
            log(showMenu())
            option = prompt('Selecione uma opção: ')
        }
        else {
            // Pergunta se o usuário quer ver o menu novamente
            menu = prompt('Deseja ver o MENU DE OPÇÕES (S/N)? ').toLowerCase()
            if(menu !== 's' && menu !== 'sim') {
                // Se negativo, passa direto para a escolha
                option = prompt('Selecione uma opção: ')
            } else {
                // Se sim, exibe o menu e pergunta a opção
                log(showMenu())
                option = prompt('Selecione uma opção: ')
            }
        }

        // Validação das opções permitidas (1 a 6)
        const validOptions = ['1', '2', '3', '4', '5', '6']
        
        if(validOptions.includes(option)) control = await chooseOption(option) // Chama a função correspondente e recebe se continua ou encerra
        else log('Opção Inválida') // Feedback para opção inválida

        // Marca que não é mais a primeira vez
        firstTime = false
    } while (control)
}

// Executa o programa
await main()