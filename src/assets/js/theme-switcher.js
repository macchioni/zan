// Gestione del tema chiaro/scuro
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Verifica se esiste una preferenza salvata
    const savedColorMode = localStorage.getItem('colorMode');
    
    // Imposta il tema in base alla preferenza salvata o al tema di sistema
    if (savedColorMode) {
      document.documentElement.setAttribute('color-mode', savedColorMode);
    } else {
      // Usa il tema preferito di sistema come fallback
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('color-mode', 'dark');
      } else {
        document.documentElement.setAttribute('color-mode', 'light');
      }
    }
    
    // Gestisce il click sul pulsante
    themeToggle.addEventListener('click', () => {
      const currentColorMode = document.documentElement.getAttribute('color-mode');
      const newColorMode = currentColorMode === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('color-mode', newColorMode);
      localStorage.setItem('colorMode', newColorMode);
    });
  });