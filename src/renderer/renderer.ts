import { ipc } from './connection/IpcRendererHandler';

document.addEventListener('DOMContentLoaded', () => {
  ipc;
  intializeInputs();
});

function intializeInputs() {
  document.getElementById('clipboard-input-1').addEventListener('contextmenu', (event) => {
    event.preventDefault();
    navigator.clipboard.writeText((document.getElementById('clipboard-input-1') as HTMLInputElement).value);
  });
  document.getElementById('clipboard-input-2').addEventListener('contextmenu', (event) => {
    event.preventDefault();
    navigator.clipboard.writeText((document.getElementById('clipboard-input-2') as HTMLInputElement).value);
  });
  document.getElementById('clipboard-input-3').addEventListener('contextmenu', (event) => {
    event.preventDefault();
    navigator.clipboard.writeText((document.getElementById('clipboard-input-3') as HTMLInputElement).value);
  });
  document.getElementById('clipboard-input-4').addEventListener('contextmenu', (event) => {
    event.preventDefault();
    navigator.clipboard.writeText((document.getElementById('clipboard-input-4') as HTMLInputElement).value);
  });
  document.getElementById('clipboard-input-5').addEventListener('contextmenu', (event) => {
    event.preventDefault();
    navigator.clipboard.writeText((document.getElementById('clipboard-input-5') as HTMLInputElement).value);
  });
}
