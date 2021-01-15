export function createLinkButton(
  link: string,
  nameButton: string,
  getPage: () => Promise<HTMLElement | null | undefined>,
): HTMLElement {
  const linkButton = document.createElement('a');
  linkButton.setAttribute('href', link);
  linkButton.innerText = nameButton;
  linkButton.addEventListener('click', () => {
    const oldMain = document.querySelector('.main');
    oldMain?.remove();
    getPage().then((elementHTML: HTMLElement) => document.body.append(elementHTML));
  });
  return linkButton;
}
