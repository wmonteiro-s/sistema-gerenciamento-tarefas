import promptSync from 'prompt-sync'
import { createTask, viewAllTasks, viewConcludedTasks, viewNotConcludedTasks, concludeTask } from './auxiliary_functions.js'
const prompt = promptSync()
const log = console.log

async function main(){
    log('Olá, seja muito bem vindo(a) ao Gerenciador de Tarefas!\n')
    
    let control = true
    let firstTime = true
    do {
        let menu
        let option

        if(firstTime) {
            log(showMenu())
            option = prompt('Selecione uma opção: ')
        }
        else {
            menu = prompt('Deseja ver o MENU DE OPÇÕES (S/N)? ').toLowerCase()
            if(menu !== 's' && menu !== 'sim') {
                option = prompt('Selecione uma opção: ')
            } else {
                log(showMenu())
                option = prompt('Selecione uma opção: ')
            }
        }

        const validOptions = ['1', '2', '3', '4', '5', '6']
        
        if(validOptions.includes(option)) control = await chooseOption(option)
        else log('Opção Inválida')

        firstTime = false
    } while (control)
}

async function chooseOption(option){
    switch(option){
        case '1':
            await createTask()
            return true
        case '2':
            await viewAllTasks()
            return true
        case '3':
            await viewConcludedTasks()
            return true
        case '4':
            await viewNotConcludedTasks()
            return true
        case '5':
            await concludeTask()
            return true
        case '6':
            log('Encerrando...')
            return false
    }
}

function showMenu(){
    return `
 -------------------MENU---------------------
|1 - Criar uma nova tarefa                   |
|2 - Visualizar todas as tarefas             |
|3 - Visualizar apenas tarefas concluídas    |
|4 - Visualizar apenas tarefas NÃO concluídas|
|5 - Concluir uma tarefa                     |
|6 - Sair                                    |
 --------------------------------------------`
}

await main()