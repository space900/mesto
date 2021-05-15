
class Section {
    constructor({ data, renderer }, containerSelector) {
        this._renderedItems = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    appendItem(showCard) {
        this._container.append(showCard);
    }

    prependItem(showCard) {
        this._container.prepend(showCard);
    }

    clear() {
        this._container.innerHTML = '';

    }

    renderItems() {
        this.clear();
        this._renderedItems.forEach((item) => {
            this._renderer(item);
        });
    }
}

export default Section