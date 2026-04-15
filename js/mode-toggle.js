// ============================================
// MODE TOGGLE — Default ↔ Creative
// ============================================

function toggleMode() {
  var defaultMode = document.getElementById('default-mode');
  var creativeMode = document.getElementById('creative-mode');
  var toggleBtn = document.getElementById('mode-toggle-btn');
  var toggleLabel = toggleBtn.querySelector('.toggle-label');
  var defaultIcon = toggleBtn.querySelector('.toggle-default-icon');
  var creativeIcon = toggleBtn.querySelector('.toggle-creative-icon');

  var isDefault = defaultMode.style.display !== 'none';

  if (isDefault) {
    // Switch to Creative Mode
    defaultMode.style.display = 'none';
    creativeMode.style.display = '';
    toggleBtn.classList.add('creative-active');
    toggleBtn.title = 'Switch to Default Mode';
    toggleLabel.textContent = 'Default';
    defaultIcon.style.display = 'none';
    creativeIcon.style.display = '';

    // Add placeholder content if creative mode is empty
    if (creativeMode.children.length === 0 || creativeMode.innerHTML.trim() === '<!-- Creative mode content will go here -->') {
      creativeMode.innerHTML = '<div class="creative-placeholder"><h2>Creative Mode</h2><p>Coming Soon</p></div>';
    }

    // Re-trigger animation
    creativeMode.style.animation = 'none';
    creativeMode.offsetHeight; // force reflow
    creativeMode.style.animation = '';
  } else {
    // Switch to Default Mode
    creativeMode.style.display = 'none';
    defaultMode.style.display = '';
    toggleBtn.classList.remove('creative-active');
    toggleBtn.title = 'Switch to Creative Mode';
    toggleLabel.textContent = 'Creative';
    defaultIcon.style.display = '';
    creativeIcon.style.display = 'none';

    // Re-trigger animation
    defaultMode.style.animation = 'none';
    defaultMode.offsetHeight; // force reflow
    defaultMode.style.animation = '';
  }
}
