const paper = document.getElementById('page')

const validCommands = [
    'bold',
    'italic',
    'underline',
    'fontSize'
]

const isValidCommand = command => {
    return validCommands.contains(command)
}

export const execute = (command, value = null) => {
    if (!isValidCommand) {
        console.error(`${command} is not a valid command`)
        return false
    }

    if (!value) {
        document.execCommand(command)
        return true
    }

    document.execCommand(command, false, value)
    return true
}