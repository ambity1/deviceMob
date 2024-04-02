export default function setRepairRecordModalOpen(state = false,action) {
    if(action.type === 'SET_REPAIR_RECORD_MODAL_OPEN'){
        return action.val;
    }
    return state;
}