$.modal = function (options) {

  const ANIMATION_SPEED = 300;
  let closing = false
  let destroyed = false

  Element.prototype.appendAfter = function(element) {
   element.parentNode.insertBefore(this, element.nextSibling);
  }

  function _createModalFooter(buttons=[]) {

    function noop() {}

    if (buttons.length === 0) {
      return document.createElement('div')
    }
    const wrap = document.createElement('div')
    wrap.classList.add('modal-footer')

    buttons.forEach(btn => {
      const _btn = document.createElement('button')
      _btn.textContent = btn.text
      _btn.classList.add('btn')
      _btn.classList.add(`btn-${btn.type || 'secondary'}`)
      _btn.onclick = btn.handler || noop
      wrap.appendChild(_btn)
    })

    return wrap
  }

  function _createModal(options) {
    const {title='title of modal', content='', width='400px', closable} = options
    const modal = document.createElement("div");
    modal.classList.add("vmodal");
    const visibleClosable = closable ? `&times;` : ''
    modal.insertAdjacentHTML(
      "afterbegin",
      `
            <div class="modal-overlay" data-close="true">
                <div style="width:${width}" class="modal-window">
                    <div class="modal-header">
                        <span class="modal-title">${title}</span>
                        <span class="modal-close" data-close="true">${visibleClosable}</span>
                    </div>
                    <div class="modal-body" data-content>
                        ${content}
                    </div>
                </div>
            </div>
        `
    );

    document.body.appendChild(modal)

    const footer = _createModalFooter(options.footerButtons)
    const body = modal.querySelector('[data-content]')
    footer.appendAfter(body)
        
    return modal;
  }

  const _modal = _createModal(options);
  
  const modal = {

    open() {
      if (destroyed) {
        return console.log('Modal is destroyed')
      }
      !closing && _modal.classList.add("open");
    },

    close() {
      closing = true;
      _modal.classList.remove("open");
      _modal.classList.add("hide");
      const timerId = setTimeout(() => {
        _modal.classList.remove("hide");
        closing = false;
        if (typeof options.onClose === 'function') {
          options.onClose()
        }
        clearTimeout(timerId);
      }, ANIMATION_SPEED);
    },
    setContent(content) {
        const body = _modal.querySelector('.modal-body')
        body.innerHTML = content
    }
  }

  
  const closeFrom = (event) => {
    if (event.target.dataset.close) modal.close();
  };
  _modal.addEventListener("click", closeFrom);


  return Object.assign(modal, {
     destroy() {
      _modal.removeEventListener('click', closeFrom)
      _modal.parentNode.removeChild(_modal)
      destroyed = true
     }
  })
  
};
