export function createLinkButton(
  link: string,
  nameButton: string,
  routerType: Promise<HTMLElement | null | undefined>,
): HTMLElement {
  const linkButton = document.createElement('a');
  linkButton.setAttribute('href', link);
  linkButton.innerText = nameButton;
  linkButton.addEventListener('click', () => {
    const oldMain = document.querySelector('.main');
    oldMain?.remove();
    routerType.then(res => document.body.append(res!));
  });
  return linkButton;
}
