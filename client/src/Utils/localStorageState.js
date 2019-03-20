export const loadState = () => {
    try {
        const serializeState = localStorage.getItem("state")
        if (serializeState === undefined) {
            return undefined
        }
        return JSON.parse(serializeState)
    } catch (err) {
        return undefined
    }
}
export const saveState = (state) => {
    try {
        let copyState=JSON.parse(JSON.stringify(state))
        const serializeState = JSON.stringify(copyState)
        localStorage.setItem("state", serializeState)
    } catch (err) {

    }
}