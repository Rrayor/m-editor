import modal from './modal'

const showModal = e => {
    const target = e.target.getAttribute('data-target')
    const element = document.getElementById(target)

    modal(element, 'hidden')
}

const handlers = {
    "show-modal": showModal
}

const setupControllers = controllers => {
    controllers.map(controller => {
        const control = controller.getAttribute('data-control')
        if (!control) {
            console.error('Every controller must have a "data-control" attribute')
        }

        const handler = handlers[control]

        if (!handler) {
            console.error('Unknown control type: ' + control)
        }

        controller.addEventListener('click', handler)
    })
}

const initEventHandlers = () => {
    const controllers = Array.from(document.getElementsByClassName('controller'))

    if (!controllers.length) {
        console.warn('No controllers found')
        return false
    }

    setupControllers(controllers)
    return true
}

initEventHandlers()