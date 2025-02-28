export default class TicketForm {
  constructor(parentEl, caption, formType, callBack, ticketObj) {
    this.element = parentEl;
    this.caption = caption;
    this.formType = formType;
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.markup = this.markup.bind(this);
    this.callBack = callBack;
    this.ticketObj = ticketObj;
    this.formRemove = this.formRemove.bind(this);
  }

  markup() {
    return this.formType <= 1
      ? `<form class="ticket-form">
       <div class="form-caption"><h3>${this.caption}</h3></div>
       <div class="form-group">
        <label for="ticket-name">Краткое описание</label>
        <input type="text" name="ticket-name" value="${this.ticketObj.name}" autocomplete="off">
       </div>
       <div class="form-group">
         <label for="ticket-descriptoin">Подробное описание</label>
         <textarea name="ticket-description">${this.ticketObj.description}</textarea>
        </div>  
        <div class="buttons-list">
          <button type="button" class="cancel">Отмена</button>
          <button class="submit">ОК</button>
        </div>
    </form>`
      : `<form class="ticket-form">
       <div class="form-caption"><h3>${this.caption}</h3></div>
       <div class="form-group">
        <p>Вы уверены, что хотите удалить тикет? Это действие необратимо.</p>
       </div>
        <div class="buttons-list">
          <button type="button" class="cancel">Отмена</button>
          <button class="submit">ОК</button>
        </div>
    </form>`;
  }

  static get submitSelector() {
    return '.submit';
  }

  static get formSelector() {
    return '.ticket-form';
  }

  static get cancelSelector() {
    return '.cancel';
  }

  bindToDOM() {
    this.element.innerHTML = this.markup();
    this.form = this.element.querySelector(TicketForm.formSelector);
    this.form.addEventListener('submit', this.onSubmit);

    this.cancel = this.element.querySelector(TicketForm.cancelSelector);
    this.cancel.addEventListener('click', this.onCancel);
  }

  formRemove() {
    this.cancel.removeEventListener('click', this.onCancel);
    this.form.removeEventListener('submit', this.onCancel);
    this.form.remove();
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.formType === 2) {
      this.callBack();
    }

    if (this.formType < 2) {
      const formData = Array.from(this.form.elements)
        .filter(({ name }) => name);

      formData.forEach((el) => {
        this.ticketObj[el.name.split('-')[1]] = el.value;
      });

      this.callBack(this.ticketObj);
    }

    this.formRemove();
  }

  onCancel() {
    this.formRemove();
  }
}
