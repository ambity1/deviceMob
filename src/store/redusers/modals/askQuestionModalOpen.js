export default function setRepairRecordModalOpen(state = false,action) {
    if(action.type === 'SET_ASK_QUESTION_MODAL_OPEN'){
        return action.val;
    }
    return state;
}