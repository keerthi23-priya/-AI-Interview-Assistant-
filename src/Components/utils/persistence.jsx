export function saveState(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadState(key) {
  return JSON.parse(localStorage.getItem(key));
}
