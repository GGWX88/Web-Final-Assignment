function showFormMessage(messageBox, text, type) {
  if (!messageBox) {
    return;
  }

  messageBox.textContent = text;

  messageBox.classList.remove('success', 'error', 'warning');
  messageBox.classList.add(type);
}

function hideFormMessage(messageBox) {
  if (!messageBox) {
    return;
  }

  messageBox.textContent = '';
  messageBox.classList.remove('success', 'error', 'warning');
}
