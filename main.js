import promptSync from 'prompt-sync'
import { chooseOption, showMenu } from './auxiliary_functions.js'
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

await main()