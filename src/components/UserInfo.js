class UserInfo {
    constructor({ nameSelector, jobSelector, avatarSelector, userID }) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
        this._avatar = document.querySelector(avatarSelector);
        this._userID = userID;
    }


    getId() {
        return {
            name: this._userID,
        }
    }

    getUserInfo() {
        
        return {
            name: this._name.textContent,
            job: this._job.textContent,
            avatar: this._avatar.src
        } 
    }

    setUserInfo({ name, job, avatar, userID}) {
        if (name, job) {
            this._name.textContent = name;
            this._job.textContent = job;
            this._avatarSelector = avatar;
            this._userID = userID;
        }
    }
}

export default UserInfo