export default class AddButton {
  constructor(elContainer) {
    this.elContainer = elContainer;
  }

  static get markup() {
    return '<button type="button" class="button addTicket">Добавить тикет</button>';
  }

  static get selector() {
    return '.button.addTicket';
  }

  bindToDOM() {
    this.elContainer.innerHTML = AddButton.markup;
  }
}
