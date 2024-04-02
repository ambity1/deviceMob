export function askQuestionModalOpen(val) {
    return (dispatch) => {
        dispatch({type: 'SET_ASK_QUESTION_MODAL_OPEN', val: val})
    }
}