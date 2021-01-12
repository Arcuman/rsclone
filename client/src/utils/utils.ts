export const createHtmlElement = (tagName: string, className = ''): HTMLElement => {
  const element: HTMLElement = document.createElement(tagName);

  if (className !== '') {
    element.className = className;
  }

  return element;
};
