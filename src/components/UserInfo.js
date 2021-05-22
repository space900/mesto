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

    setUserInfo({ name, job, avatar}) {
        if (name) {
            this._name.textContent = name;
            this._job.textContent = job;
            this._avatarSelector = avatar;
        }
    }
}

export default UserInfo