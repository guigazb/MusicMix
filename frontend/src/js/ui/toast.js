export function showToast(message, success = true) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg text-white font-bold shadow-2xl z-50 block transition-all ${
    success ? 'bg-green-600' : 'bg-red-600'
  }`;
  setTimeout(() => toast.classList.add('hidden'), 3000);
}