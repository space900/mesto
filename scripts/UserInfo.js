class UserInfo {
    constructor({ name, job }) {
        this._name = document.querySelector(".info__title");
        this._job = document.querySelector(".info__subtitle");
    }

    getUserInfo() {
        this._fields = {
            fieldName: this._name.textContent,
            fieldJob: this._job.textContent
        }
        return this._fields;
    }

    setUserInfo() {
        
    }
}

export default UserInfo