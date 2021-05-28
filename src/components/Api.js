import { jobInput, nameInput, popupCardLinkInput, popupCardNameInput } from "../utils/constants";

class Api {
  constructor({ address, token, groupId }) {
    this._address = address;
    this._token = token;
    this._groupId = groupId;
  }

  getStatus(result) {
    return result.ok ? result.json() : Promise.reject(`${result.status}`);
  }

  getInitialCards() {
    return fetch(`${this._address}/${this._groupId}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then(this.getStatus);
  }

  getUserData() {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameInput.value,
        about: jobInput.value,
      }),
    }).then(this.getStatus);
  }

  getUserInfo() {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then(this.getStatus);
  }

  addCard(data) {
    return fetch(`${this._address}/${this._groupId}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link: data.link,
        name: data.photoName,
      }),
    }).then(this.getStatus);
  }

  changeAvatar(infoAvatar) {
    return fetch(`${this._address}/${this._groupId}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: infoAvatar.avatar,
      }),
    }).then(this.getStatus);
  }

  deleteCard(id) {
    return fetch(`${this._address}/${this._groupId}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this.getStatus);
  }

  setLike(cardId) {
    return fetch(`${this._address}/${this._groupId}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    }).then(this.getStatus);
  }

  deleteLike(cardId) {
    return fetch(`${this._address}/${this._groupId}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this.getStatus);
  }
}

export default Api;
