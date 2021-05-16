class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
    }

    getUserInfo() {
        this._values = {}
        return {
            'title': this._values['title'] = this._name.textContent,
            'subtitle': this._values['subtitle'] = this._job.textContent
        }
        
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._job.textContent = data.job;
    }
}

export default UserInfo