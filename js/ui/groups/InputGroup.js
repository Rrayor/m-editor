import UIException from "../UIException"

export default class InputGroup {

    constructor(element) {
        this.values = null
        this.group = this.setInputGroup(element)
        this.validNames = this.setValidInputNames(this.group)
    }

    setInputGroup(element) {
        if (!this._valdiateElement(element)) {
            console.error('Unable to set Radio Group')
            return false
        }

        return element
    }

    setValidInputNames(element = this.group) {
        const inputNames = []

        if (!this._valdiateElement(element)) {
            throw new UIException('Element is not valid')
        }

        const inputs = Array.from(element.getElementsByTagName('input'))

        if (!inputs.length) {
            throw new UIException('No inputs were found in group')
        }

        inputs.forEach(input => inputNames.push(input.getAttribute('name')))

        return inputNames
    }

    getValues(element = this.group) {
        if (!this._valdiateElement(element)) {
            throw new UIException('Element is not valid')
        }

        const inputs = Array.from(element.getElementsByTagName('input'))

        if (!inputs.length) {
            throw new UIException('No inputs were found in group')
        }

        let values = { ...this.values }

        inputs.forEach(input => {
            const name = input.getAttribute('name')
            if (this.validNames.includes(name)) {
                values = { ...values, [name]: input.value }
            }
        })

        return values
    }

    _valdiateElement(element) {
        if (!element || !(element instanceof HTMLElement)) {
            console.error('Input Group must be an HTMLElement')
            return false
        }

        if (!element.getAttribute('id')) {
            console.error('Input Group must have an id')
            return false
        }

        return true
    }
}