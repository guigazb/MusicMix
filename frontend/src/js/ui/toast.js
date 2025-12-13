export function showToast(message, success = true) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: ${success ? '#16a34a' : '#dc2626'};
    color: white;
    padding: 16px 32px;
    border-radius: 12px;
    font-weight: bold;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: toastIn 0.5s ease;
  `;

  clearTimeout(toast.timeout);
  toast.timeout = setTimeout(() => {
    toast.style.animation = 'toastOut 0.5s ease forwards';
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}