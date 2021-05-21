class Api {
    constructor({ address, token, groupId }) {
        this._address = address;
        this._token = token;
        this._groupId = groupId;
    }

    getInitialCards() {
        return fetch(`${this._address}/${this._groupId}/cards`, {
            headers: {
                authorization: this._token
            }
        })
            .then(result => result.ok ? result.json() : Promise.reject(`${result.status}`));

    }

    getUserInfo() {
        return fetch(`${this._address}/${this._groupId}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
            .then(result => result.ok ? result.json() : Promise.reject(`${result.status}`));
    }
        
    // addCard({name, link, altText}) {
    //     return fetch(`${this._address}/${this._groupId}/cards`, {
    //         method: 'POST',
    //         headers: {
    //             authorization: this._token,
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             name = this._name,
    //             link = this._link,
    //             altText = this._altText
    //         })
    //     })
    //         .then(res => {
    //             if (res.ok) {
    //                 return res.json();
    //             }
    //             return Promise.reject(`Ошибка: ${res.status}`);
    //         })

    // }


}

export default Api