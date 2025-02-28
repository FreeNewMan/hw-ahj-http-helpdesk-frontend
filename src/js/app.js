import AddButton from './components/AddButton';
import TicketsList from './components/TicketsList';
import TicketForm from './components/TicketForm';
import {
  loadData, getTicket, postTicket,
  deleteData, editData, updateStatus,
} from './api';

const addButtonblock = document.querySelector('.top-panel');
let addButtonSelector;
const ticketListSelector = document.querySelector('.tickets-list');
const ticketFormBlock = document.querySelector('.form-block');

let ticketForm;
let ticketList;
let ticketListData = [];
let describeActions = {};

const deleteItem = (prm) => {
  deleteData(prm)
    .then((json) => {
      ticketListData = json;
      ticketList.refreshData(ticketListData);
      describeActions();
    });
};

const editItem = (itm) => {
  editData(itm)
    .then((json) => {
      ticketListData = json;
      ticketList.refreshData(ticketListData);
      describeActions();
    });
};

const toggleStatus = (prm) => {
  const elm = ticketListData.filter((el) => el.id === prm)[0];
  elm.status = elm.status === '0' ? '1' : '0';
  updateStatus(elm)
    .then((json) => {
      ticketListData = json;
      ticketList.refreshData(ticketListData);
      describeActions();
    });
};

const addItem = (itm) => {
  postTicket(itm)
    .then((json) => {
      ticketListData = json;
      ticketList.refreshData(ticketListData);
      describeActions();
    });
};

const describeEditEvent = (itm) => {
  itm.addEventListener('click', (e) => {
    const ticketId = e.target.parentElement.getAttribute('ticket_id');
    const ticketObj = ticketListData.filter((obj) => obj.id === ticketId)[0];
    ticketForm = new TicketForm(ticketFormBlock, 'Исправить тикет', 1, () => editItem(ticketObj), ticketObj);
    ticketForm.bindToDOM();
  });
};

const describeDeleteEvent = (itm) => {
  itm.addEventListener('click', (e) => {
    const ticketId = e.target.parentElement.getAttribute('ticket_id');
    ticketForm = new TicketForm(ticketFormBlock, 'Удалить тикет', 2, () => deleteItem(ticketId));
    ticketForm.bindToDOM();
  });
};

const describeStatusEvent = (itm) => {
  itm.addEventListener('click', (e) => {
    const ticketId = e.target.parentElement.getAttribute('ticket_id');
    toggleStatus(ticketId);
  });
};

const describeDescriptionEvent = (itm) => {
  itm.addEventListener('click', (e) => {
    const ticketId = e.target.parentElement.getAttribute('ticket_id');
    getTicket(ticketId)
      .then(
        (result) => {
          const ticketObj = ticketListData.filter((obj) => obj.id === ticketId)[0];
          const { name, description, status } = result;
          ticketObj.name = name;
          ticketObj.description = description;
          ticketObj.status = status;
          ticketList.toggleDescription(ticketObj);
        },
      );
  });
};

describeActions = () => {
  ticketListSelector.querySelectorAll('.edit-item').forEach((itm) => {
    describeEditEvent(itm);
  });

  ticketListSelector.querySelectorAll('.delete-item').forEach((itm) => {
    describeDeleteEvent(itm);
  });

  ticketListSelector.querySelectorAll('.item-status').forEach((itm) => {
    describeStatusEvent(itm);
  });

  ticketListSelector.querySelectorAll('.item-name').forEach((itm) => {
    describeDescriptionEvent(itm);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  loadData()
    .then((json) => {
      ticketListData = json;
      ticketList = new TicketsList(ticketListSelector, ticketListData);
      ticketList.bindToDOM();
      describeActions();
    });

  const addButton = new AddButton(addButtonblock);
  addButton.bindToDOM();
  addButtonSelector = document.querySelector('.addTicket');

  addButtonSelector.addEventListener('click', () => {
    const ticketObj = { id: null, name: '', description: '' };
    ticketForm = new TicketForm(ticketFormBlock, 'Добавить тикет', 0, () => addItem(ticketObj), ticketObj);
    ticketForm.bindToDOM();
  });
});
