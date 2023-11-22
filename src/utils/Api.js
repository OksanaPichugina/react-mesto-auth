class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
}  


  getMethodCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  getMethodUser() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }
  postCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  setUserInfo(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  patchAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }

  deleteMethod(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        return this._getResponseData(res);
      })
  }


  
  changeLikeCardStatus(id, isLiked){
    if (isLiked){
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers,
      })
        .then((res) => {
          return this._getResponseData(res);
        })
    } else {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers,
      })
        .then((res) => {
          return this._getResponseData(res);
        })
    }
  }

}

const api = {
  url: "https://nomoreparties.co/v1/cohort-75",
  headers: {
    authorization: "2f4a0f3f-0cc6-4586-a3d5-35eed1a37f2e",
    "Content-Type": "application/json",
  },
};

const apiRes = new Api(api);
export default apiRes;