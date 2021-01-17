export function deleteOldMain(): void {
  const oldMain: HTMLElement | null = document.body.querySelector('.main');
  if (oldMain !== null) {
    oldMain.remove();
  }
}

export const createHtmlElement = (tagName: string, className = ''): HTMLElement => {
  const element: HTMLElement = document.createElement(tagName);
  if (className !== '') {
    element.className = className;
  }
  return element;
};
