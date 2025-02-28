export default class TicketsList {
  constructor(parentEl, data) {
    this.parentEl = parentEl;
    this.data = data;
    this.toggleDescription = this.toggleDescription.bind(this);
    this.refreshData = this.refreshData.bind(this);
  }

  static get markup() {
    return `
       <div class="items"></div>
          `;
  }

  bindToDOM() {
    this.parentEl.innerHTML = TicketsList.markup;

    this.items = this.parentEl.querySelector('.items');

    this.refreshData(this.data);
  }

  addItem(prm) {
    const item = document.createElement('div');
    item.classList.add('items-item');
    item.setAttribute('ticket_id', prm.id);

    const itemStatus = document.createElement('div');
    itemStatus.classList.add('item-status');
    if (prm.status === '1') {
      itemStatus.textContent = '✔';
    }

    const itemName = document.createElement('div');
    itemName.classList.add('item-name');
    itemName.textContent = prm.name;

    const itemDateTime = document.createElement('div');
    itemDateTime.classList.add('item-datetime');
    itemDateTime.textContent = prm.created;

    const itemEdit = document.createElement('div');
    itemEdit.classList.add('edit-item');
    itemEdit.textContent = '✎';

    const itemDelete = document.createElement('div');
    itemDelete.classList.add('delete-item');
    itemDelete.textContent = 'x';

    item.appendChild(itemStatus);
    item.appendChild(itemName);
    item.appendChild(itemDateTime);
    item.appendChild(itemEdit);
    item.appendChild(itemDelete);

    this.items.appendChild(item);
    return item;
  }

  toggleDescription(prm) {
    const itm = this.items.querySelector(`[ticket_id="${prm.id}"]`);
    let itemDescription = itm.querySelector('.item-description');
    if (itemDescription) {
      itemDescription.remove();
    } else {
      itemDescription = document.createElement('div');
      itemDescription.classList.add('item-description');
      itemDescription.textContent = prm.description;
      itm.appendChild(itemDescription);
    }
  }

  refreshData(data) {
    if (data) {
      this.items.innerHTML = '';
      data.forEach((element) => {
        this.addItem(element);
      });
    }
  }
}
