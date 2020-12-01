import { error } from './errors'

const validateFn = fn => {
    if (fn && typeof (fn) !== 'function') {
        error('Modal: Callback must be a function')
        return null
    }
    return fn
}

const validateElement = el => {
    if (!(el instanceof HTMLElement)) {
        error('Modal element must be an HTMLElement')
        return false
    }

    return true
}

const validateContent = content => {
    if (!(content instanceof HTMLElement)) {
        error('Modal Content must be an HTMLElement')
        return false
    }

    return true
}

const validateControllers = controllers => {
    if (!controllers || !controllers.length) {
        error('Modal does not have any controllers')
        return false
    }

    return true
}

const validateController = controller => {
    if (!controller || !(controller instanceof HTMLElement)) {
        error('A controller must be an HTMLElement')
        return false
    }

    return true
}

const setupControllers = (controllers, m) => {
    return controllers.map(controller => {
        if (validateController(controller)) {
            const control = controller.getAttribute('data-control')
            const target = controller.getAttribute('data-target')

            if (!control) {
                error('Every controller must have a "data-control" attribute')
            }

            control === 'hide-modal' &&
                target === m.element.getAttribute('id') &&
                controller.addEventListener('click', hide(m))
        }
    })
}

const setupModalObject = m => {
    const bg = m.element.getElementsByClassName('modal-background')
    const content = m.element.getElementsByClassName('modal-content')
    const controllers = Array.from(m.element.getElementsByClassName('controller'))

    m.background = bg.length ? bg[0] : null
    m.content = content.length ? content[0] : null
    m.controllers = controllers.length ? setupControllers(controllers, m) : null

    return m
}

const setModal = data => {
    let m = null

    if (validateElement(data.element)) {
        m = setupModalObject(data)
    }

    return m
}

const hide = m => {
    return () => {
        if (typeof (m.fn) === 'function') {
            m.fn()
        }

        m.element && m.element.classList.remove('active')
        m.background && m.background.classList.remove('active')
        m.content && m.content.classList.remove('active')
    }
}

const show = modal => {
    if (!validateContent || !validateControllers) {
        return false
    }

    modal.element && modal.element.classList.add('active')
    modal.content && modal.content.classList.add('active')
    modal.background && modal.background.classList.add('active')

    return true
}

const modal = (element, fn = null) => {
    fn = validateFn(fn)
    const data = { element, fn }
    const modal = setModal(data)
    show(modal)

}

export default modal;