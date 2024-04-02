export default function setContacts(state = [
    {
        address: 'ул. 50-летия Октября, 3',
        phone: '8 (937) 350-55-55',
        phoneLink: '+79373505555',
    },
    {
        address: 'ул. Айская, 75',
        phone: '8 (937) 399‒55‒55',
        phoneLink: '+79373995555',
    },
    {
        address: 'ул. Дагестанская, 15/1',
        phone: '8 (937) 320‒55‒55',
        phoneLink: '+79373205555',
    },
    {
        address: 'ул. Первомайская, 30',
        phone: '8 (937) 952‒55‒55',
        phoneLink: '+79379525555',
    },
    {
        address: 'ул. Чернышевского, 84',
        phone: '8 (937) 136‒55‒55',
        phoneLink: '+79371365555',
    },
    {
        address: 'ул. Рудольфа Нуреева, 5',
        phone: '8 (937) 167‒55‒55',
        phoneLink: '+79371365555',
    },
    {
        address: 'ул. Проспект Октября, 48',
        phone: '8 (937) 101-55-55',
        phoneLink: '+79371015555',
    }
],action) {
    if(action.type === 'SET_CONTACTS'){
        return action.contacts;
    }
    return state;
}