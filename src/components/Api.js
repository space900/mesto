import { jobInput, nameInput, popupCardLinkInput, popupCardNameInput } from "../utils/constants";

class Api {
  constructor({ address, token, groupId }) {
    this._address = address;
    this._token = token;
    this._groupId = groupId;
  }

  getInitialCards() {
    return fetch(`${this._address}/${this._groupId}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then((result) => (result.ok ? result.json() : Promise.reject(`${result.status}`)));
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
    }).then((result) => (result.ok ? result.json() : Promise.reject(`${result.status}`)));
  }

  getUserInfo() {
    return fetch(`${this._address}/${this._groupId}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then((result) => (result.ok ? result.json() : Promise.reject(`${result.status}`)));
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
    }).then((result) => (result.ok ? result.json() : Promise.reject(`${result.status}`)));
  }

  changeAvatar() {
    return fetch(`${this._address}/${this._groupId}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          authorization: this._token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            avatar: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1052&q=80',
          }),
      }).then((result) => (result.ok ? result.json() : Promise.reject(`${result.status}`)));
  }

  deleteCard(id) {
    return fetch(`${this._address}/${this._groupId}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((result) => (result.ok ? result.json() : Promise.reject(`${result.status}`)));
  }

  setLike(cardId) {
    return fetch(`${this._address}/${this._groupId}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this._token,
      },
    }).then((result) => (result.ok ? result.json() : Promise.reject(`${result.status}`)));
  }

  deleteLike(cardId) {
    return fetch(`${this._address}/${this._groupId}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((result) => (result.ok ? result.json() : Promise.reject(`${result.status}`)));
  }
}

export default Api;
