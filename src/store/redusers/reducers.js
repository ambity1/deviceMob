import {combineReducers} from "redux";

import user from "./auth/auth"
import catalog from "./catalog/catalog"
import service from "./service/service"
import contacts from "./contacts/contacts"
import cart from "./cart/cart"
import repairRecordModalOpen from "./modals/repairRecordModalOpen"
import askQuestionModalOpen from "./modals/askQuestionModalOpen"

export default combineReducers({
    user,
    catalog,
    service,
    cart,
    askQuestionModalOpen,
    repairRecordModalOpen,
    contacts
});