
class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    appendItem(showCard) {
        this._container.append(showCard);
    }

    prependItem(showCard) {
        this._container.prepend(showCard);
    }

    _clear() {
        this._container.innerHTML = '';

    }

    renderItems(items) {
        this._clear();
        items.forEach((item) => {
            this._renderer(item);
        });
    }
}

export default Section