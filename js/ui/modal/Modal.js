import UIException from '../UIException'

class Modal {

    constructor({ element, fn, pos }) {
        this.pos = pos
        this.modal = this.setModal(element)
        if (typeof (fn) === 'function') {
            this.fn = fn
        }
    }

    show() {
        if (!this._validateElement()) {
            throw new UIException('Invalid HTMLElement')
        }

        this.modal.element && this.modal.element.classList.add('active')
        this.modal.content && this.modal.content.classList.add('active')
        this.modal.background && this.modal.background.classList.add('active')
    }

    hide(fn = this.fn) {
        if (!this._validateElement()) {
            throw new UIException('Invalid HTMLElement')
        }

        if (fn) {
            fn()
        }

        this.modal.element && this.modal.element.classList.remove('active')
        this.modal.background && this.modal.background.classList.remove('active')
        this.modal.content && this.modal.content.classList.remove('active')
        return true
    }

    setModal(element) {
        let modal = null
        if (this._validateElement(element)) {
            modal = {
                element,
                background: null,
                content: null
            }
            const bg = modal.element.getElementsByClassName('modal-background')
            const c = modal.element.getElementsByClassName('modal-content')

            if (bg.length) {
                modal.background = bg[0]
            }

            if (!c.length) {
                console.error('No content in modal')
            }

            const content = c[0]

            if (element.classList.contains('context-modal') && this.pos) {
                content.style.top = this.pos.top
                content.style.left = this.pos.left
            }

            modal.content = content
        }

        return modal
    }

    _validateElement(modal = this.modal.element) {
        if (!modal || !(modal instanceof HTMLElement)) {
            console.error('Modal must be an HTML element')
            return false
        }

        if (this.modal && !this.modal.content) {
            console.error('Modal does not have any content')
            return false
        }

        return true
    }
}

export default Modal;