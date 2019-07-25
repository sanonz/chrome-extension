(window as any).count = 0;
const floatingText = document.createElement('div');
floatingText.textContent = '0';

floatingText.style.position = 'fixed';
floatingText.style.right = '20px';
floatingText.style.bottom = '20px';
floatingText.style.padding = '10px 20px';
floatingText.style.color = '#fff';
floatingText.style.fontSize = '16px';
floatingText.style.backgroundColor = '#ff0000';

document.body.appendChild(floatingText);

addCustomEvent('update', function (evt: CustomEvent<number>) {
  (window as any).count = evt.detail;
  floatingText.textContent = evt.detail.toString();
});


function addCustomEvent<T>(type: string, listener: (evt: CustomEvent<T>) => void) {
  document.addEventListener(`prefix.${type}`, listener as EventListener);
}
