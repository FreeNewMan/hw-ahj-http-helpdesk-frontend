export const baseUrl = 'http://localhost:3000';

export const loadData = () => fetch(`${baseUrl}?method=allTickets`)
  .then((response) => response.json());

export const getTicket = (prmId) => fetch(`${baseUrl}?method=ticketById&id=${prmId}`)
  .then((response) => response.json());

export const postTicket = (itm) => fetch(`${baseUrl}?method=createTicket`, {
  method: 'POST',
  body: JSON.stringify(
    {
      id: null,
      name: itm.name,
      description: itm.description,
      status: 0,
    },
  ),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then(() => loadData());

export const deleteData = (prmId) => fetch(`${baseUrl}?method=deleteTicket&id=${prmId}`, {
  method: 'DELETE',
})
  .then(() => loadData());

export const editData = (itm) => fetch(`${baseUrl}?method=updateTicket`, {
  method: 'PATCH',
  body: JSON.stringify(
    {
      id: itm.id,
      name: itm.name,
      description: itm.description,
      status: itm.status,
    },
  ),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then(() => loadData());

export const updateStatus = (itm) => fetch(`${baseUrl}?method=updateStatusTicket`, {
  method: 'PATCH',
  body: JSON.stringify(
    {
      id: itm.id,
      status: itm.status,
    },
  ),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then(() => loadData());
