class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector, userID }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._userID = userID;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    //   avatar: this._avatar.src
    };
  }

  setUserInfo({ name, about, avatar, userID }) {
    if ((name, about)) {
      this._name.textContent = name;
      this._job.textContent = about;
      this._avatarSelector = avatar;
      this._userID = userID;
    }
  }
}

export default UserInfo;
