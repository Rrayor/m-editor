import Modal from './Modal'
import strings from '../strings'

const contextOffsetTop = 25
const contextOffsetLeft = 25
const modals = {}

const unit = (value, unit) => {
    return `${value}${unit}`
}

const getOffset = element => {
    return {
        top: parseInt(element.getAttribute(strings.dataOffsetTop), 10) || contextOffsetTop,
        left: parseInt(element.getAttribute(strings.dataOffsetLeft), 10) || contextOffsetLeft
    }
}

const setPos = (sender, offset) => {
    const senderPos = sender.getBoundingClientRect()

    return {
        top: unit(senderPos.top + offset.top, 'px'),
        left: unit(senderPos.left + offset.left, 'px')
    }
}

const createModal = ({ pos, element, target, fn }) => {
    if (typeof (fn) !== 'function') {
        fn = null
    }
    const modal = new Modal({ element, fn, pos })

    modals[target] = modal
    modal.show()
}

const removeModal = ({ modal, target }) => {
    modal.hide()
    modals[target] = null
}

export const showModal = e => {
    const target = e.target.getAttribute(strings.dataTarget)
    const element = document.getElementById(target)

    const offset = getOffset(element)
    const pos = setPos(e.target, offset)

    createModal({ pos, element, target })
}

export const hideModal = e => {
    const target = e.target.getAttribute(strings.dataTarget)
    const modal = modals[target]

    if (!modal) {
        console.error('Modal not found')
    }

    removeModal({ modal, target })
}

export const modal = (e, target, fn = null) => {
    const element = document.getElementById(target)

    const offset = getOffset(element)
    const pos = setPos(e.target, offset)

    createModal({ pos, element, target, fn })
}