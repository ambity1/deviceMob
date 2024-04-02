export function repairRecordModalOpen(val) {
    return (dispatch) => {
        dispatch({type: 'SET_REPAIR_RECORD_MODAL_OPEN', val: val})
    }
}