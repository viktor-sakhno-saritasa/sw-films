import { ModalType } from '../interfaces';

/**
 * Get Modal HTML Template.
 * @param title Title of the modal.
 * @param content Content of the modal.
 * @returns HTML Modal template.
 */
function getModalHTML(title: string, content: string): string {
  return `
  <div class="modal-overlay">
    <div class="modal-window">
      <div class="modal-header">
        <span class="modal-title">${title}</span>
        <span class="modal-close">&times;</span>
      </div>
      <div class="modal-body">${content}</div>
      <div class="modal-footer">
        <button class="button modal-button modal-success">OK</button>
        <button class="button modal-button modal-cancel">Cancel</button>
      </div>
    </div>
  </div>`;
}

function createModal(title: string, content: string): HTMLDivElement {
  const modal = document.createElement('div');
  modal.classList.add('vmodal');

  modal.insertAdjacentHTML('afterbegin', getModalHTML(title, content));
  document.body.appendChild(modal);

  return modal;
}

/**
 * Function for create modal.
 * @param title Title of modal.
 * @param content Content of modal.
 * @param handler Event handler for "OK" button.
 * @returns Object for work with modal.
 */
export function getModal(title: string, content: string, handler: Function): ModalType {
  const ANIMATION_SPEED = 200;
  const modal = createModal(title, content);

  let closing = false;

  const closeBtn = modal.querySelector('.modal-close') as HTMLButtonElement;
  const overlay = modal.querySelector('.modal-overlay') as HTMLButtonElement;
  const okButton = modal.querySelector('.modal-success') as HTMLButtonElement;
  const cancelButton = modal.querySelector('.modal-cancel') as HTMLButtonElement;

  closeBtn.addEventListener('click', () => onClose(modal, ANIMATION_SPEED));
  overlay.addEventListener('click', event => {
    if (event.target === overlay) {
      onClose(modal, ANIMATION_SPEED);
    }
  });

  okButton.addEventListener('click', (event: Event) => {
    handler(event);
  });

  cancelButton.addEventListener('click', () => onClose(modal, ANIMATION_SPEED));

  return {
    open(): void {
      if (!closing) {
        onOpen(modal);
      }
    },
    close(): void {
      closing = true;

      onClose(modal, ANIMATION_SPEED);

      closing = false;
    },
    destroy(): void {
      modal.remove();
      modal.replaceWith(modal.cloneNode(true));
    },
    setContent(html: string): void {
      const modalBody = modal.querySelector('.modal-body') as HTMLElement;
      modalBody.innerHTML = html;
    },
  };
}

/**
 * Close the modal.
 * @param modal Modal window.
 * @param ANIMATION_SPEED Speed for css animation.
 */
function onClose(modal: HTMLElement, ANIMATION_SPEED: number): void {
  modal.classList.remove('open');
  modal.classList.add('hide');

  setTimeout(() => {
    modal.classList.remove('hide');
  }, ANIMATION_SPEED);
}

/**
 * Open the modal.
 * @param modal Modal window.
 */
function onOpen(modal: HTMLElement): void {
  modal.classList.add('open');
}
