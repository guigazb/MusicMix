export function $(selector) {
  return document.querySelector(selector);
}

export function $all(selector) {
  return document.querySelectorAll(selector);
}

export function on(element, event, handler) {
  element?.addEventListener(event, handler);
}

export function delegate(parent, event, selector, handler) {
  parent?.addEventListener(event, (e) => {
    if (e.target.matches(selector)) {
      handler(e);
    }
  });
}