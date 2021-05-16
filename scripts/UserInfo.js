class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._name = document.querySelector(nameSelector);
        this._job = document.querySelector(jobSelector);
    }

    getUserInfo() {
        
        return {
            name: "1234",
            job: "abcd"
            
        }
        
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._job.textContent = data.job;
    }
}

export default UserInfo