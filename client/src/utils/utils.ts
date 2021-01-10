export const createHtmlElement = (tagName: string, className = ''): HTMLElement => {
  const element: HTMLElement = document.createElement(tagName);

  if (className !== '') {
    element.className = className;
  }

  return element;
};

export const createHtmlFormElement = (
  method = 'get',
  name = '',
  action = '',
  className = ''
): HTMLFormElement => {
  const form: HTMLFormElement = document.createElement('form');

  form.method = method;
  form.name = name;
  form.action = action;
  if (className !== '') {
    form.className = className;
  }

  return form;
};
