import UIException from "./UIException"
import strings from './strings'
import { showModal, hideModal } from './modal/modals'

const handlers = {
    "show-modal": showModal,
    "hide-modal": hideModal
}

const setupControllers = controllers => {
    controllers.forEach(controller => {
        const control = controller.getAttribute(strings.dataControl)
        if (!control) {
            throw new UIException('Every controller must have a "data-control" attribute')
        }

        const handler = handlers[control]

        if (!handler) {
            throw new UIException('Unknown control type: ' + control)
        }

        controller.addEventListener('click', handler)
    })
}

export const initUIEventHandlers = () => {
    const controllers = Array.from(document.getElementsByClassName(strings.controllerClass))

    if (!controllers.length) {
        console.warn('No controllers found')
        return false
    }

    setupControllers(controllers)
    return true
}