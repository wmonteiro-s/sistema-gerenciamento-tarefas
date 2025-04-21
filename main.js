import promptSync from 'prompt-sync'
import { createTask, viewAllTasks, viewConcludedTasks, viewNotConcludedTasks, concludeTask } from './auxiliary_functions.js'
const prompt = promptSync()
const log = console.log

function main(){
    log('Olá, seja muito bem vindo(a) ao Gerenciador de Tarefas!\n')
    
    let control = true
    while (control) {
        const start = prompt('Gostaria de ver o MENU DE OPÇÕES (S/N)? ').toLowerCase()
        if (start === 's' || start === 'sim') { 
            log(`
 -------------------MENU---------------------
|1 - Criar uma nova tarefa                   |
|2 - Visualizar todas as tarefas             |
|3 - Visualizar apenas tarefas concluídas    |
|4 - Visualizar apenas tarefas NÃO concluídas|
|5 - Concluir uma tarefa                     |
|6 - Sair                                    |
 --------------------------------------------`)
            const option = prompt(': ')
            switch(option){
                case '1':
                    createTask()
                    break
                case '2':
                    viewAllTasks()
                    break
                case '3':
                    viewConcludedTasks()
                    break
                case '4':
                    viewNotConcludedTasks()
                    break
                case '5':
                    concludeTask()
                    break
                case '6':
                    control = false
                    break
                default:
                    log('Opção inválida')
            }
        } else {
            control = false
            log('Encerrando...')
        }
    }
}

main()