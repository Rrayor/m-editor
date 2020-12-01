import UIException from '../UIException'
import InputGroup from './InputGroup'

export default class CheckBoxRadioGroup extends InputGroup {

    setValidInputNames(element = this.group) {
        const inputNames = []

        if (!this._valdiateElement(element)) {
            throw new UIException('Element is not valid')
        }

        const inputs = Array.from(element.getElementsByTagName('input'))

        if (!inputs.length) {
            throw new UIException('No inputs were found in group')
        }

        inputs.forEach(input => inputNames.push(input.value))

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
            if (input.getAttribute('type') !== 'checkbox' && input.getAttribute('type') !== 'radio') {
                throw new UIException('Checkboxes or radios group can only contain said inputs')
            }
            const value = input.value
            if (this.validNames.includes(value)) {
                values = { ...values, [value]: input.checked }
            }
        })

        return values
    }
}