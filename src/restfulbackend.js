export default class RESTfulBackend {
    logIn(username, password) {
        return new Promise((resolve, reject) => 
        fetch("https://localhost:5000/login", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then((response) => {
          if (!response.ok) {
            throw response.statusText;
          }
          return response.json();
        })
        .then((data) => resolve(data.access_token))
        .catch((error) => reject(error)));
    }

    createUser(username, password) {
        return new Promise((resolve, reject) => 
        fetch("https://localhost:5000/users/" + username, {
            method: "POST",
            body: JSON.stringify({
                password: password
            })
        })
        .then((response) => resolve(response))
        .catch((error) => reject(error)));
    }

    getUserData(accessToken, username) {
        return new Promise((resolve, reject) => 
        fetch("https://localhost:5000/users/"+ + username, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken
            }
        })
        .then((response) => {
            if (!response.ok) {
              throw response.statusText;
            }
            return response.json();
          })
          .then((data) => resolve(data))
          .catch((error) => reject(error)));
    }
}