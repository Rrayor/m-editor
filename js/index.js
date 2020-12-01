import { modal } from './ui/modal/modals'
import { initEventHandlers } from './eventHandlers'
import { initGroups, groups } from './ui/groups/groups'

initEventHandlers()
initGroups()

const btn_show_modal = document.getElementById('btn_show_modal');
btn_show_modal && btn_show_modal.addEventListener('click', (e) => modal(e, 'modal', () => console.log(groups['accept'].getValues())))