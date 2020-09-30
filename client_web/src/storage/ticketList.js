const authTokenKey = "invoicePlatform_key_tiketList";

export const saveTicketList = ticketList => {
    localStorage.setItem(authTokenKey, ticketList);
}

export const fetchTicketList = () => {
    return localStorage.getItem(authTokenKey);
}