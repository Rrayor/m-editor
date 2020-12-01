import { initUIEventHandlers } from "./ui/UIEventHandlers"
import { initEditorEventHandlers } from "./editor/EditorEventHandlers"

export const initEventHandlers = () => {
    initUIEventHandlers()
    initEditorEventHandlers()
}