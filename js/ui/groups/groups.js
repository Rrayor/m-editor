import InputGroup from "./InputGroup"
import UIException from "../UIException"
import strings from '../strings'
import CheckBoxRadioGroup from "./CheckBoxRadioGroup"

export const groups = {}

const setupInputGroups = inputGroups => {
    inputGroups.forEach(group => {
        let inputGroup = null
        if (group.classList.contains(strings.checkboxesClass) || group.classList.contains(strings.radiosClass)) {
            inputGroup = new CheckBoxRadioGroup(group)
        } else {
            inputGroup = new InputGroup(group)
        }

        if (groups[group.getAttribute('id')]) {
            throw new UIException('Input group id has to be unique')
        }

        groups[group.getAttribute('id')] = inputGroup
    })
}

export const initGroups = () => {
    const inputGroups = Array.from(document.getElementsByClassName(strings.inputGroupClass))

    if (inputGroups.length) {
        setupInputGroups(inputGroups)
    }
}
