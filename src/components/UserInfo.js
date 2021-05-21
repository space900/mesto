class UserInfo {
    constructor({ nameSelector, jobSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        
        return {
            name: this._name.textContent,
            job: this._job.textContent,
            avatar: this._avatar.src
        } 
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._job.textContent = data.job;
        this._avatarSelector = data.avatar;
    }
}

export default UserInfo