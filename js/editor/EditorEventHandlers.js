import { execute } from './editor'
import strings from '../ui/strings'

const setupFormatters = formatters => {
    formatters.forEach(formatter => {
        const command = formatter.getAttribute(strings.dataCommand)
        const value = formatter.getAttribute(strings.dataValue) || null
        if (!command) {
            console.error('Every formatter must have a "data-command" attribute')
        }
        formatter.addEventListener('click', () => execute(command, value))
    })
}

const setupFormatterChanges = formatters => {
    formatters.forEach(formatter => {
        const command = formatter.getAttribute(strings.dataCommand)
        if (!command) {
            console.error('Every formatter must have a "data-command" attribute')
        }
        formatter.addEventListener('change', () => {
            const value = parseInt(formatter.value) || null
            execute(command, value)
        })
    })
}

export const initEditorEventHandlers = () => {
    const formatters = Array.from(document.getElementsByClassName(strings.formatterClass))

    if (!formatters.length) {
        console.error('No formatters were found')
        return false
    }

    const formatterChanges = Array.from(document.getElementsByClassName(strings.formatterChangeClass))

    if (!formatterChanges.length) {
        console.warn('No on change formatters were found')
    }

    setupFormatters(formatters)
    setupFormatterChanges(formatterChanges)
    return true
}