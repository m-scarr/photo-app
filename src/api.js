import axios from "axios";

export default {
  isLoggedIn: (state, setState, data, cb) => {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = "http://localhost:3001";
    axios.get("/User?func=isLoggedIn").then((res) => {
      if (res.data.success) {
        setState(
          {
            user: { ...res.data.user },
            userView: res.data.user.id,
            currentView: "dashboard",
          },
          cb
        );
      }
    });
  },
  register: (state, setState, data, cb) => {
    axios
      .post("/User?func=register", data)
      .then((res) => {
        console.log(res.data);
        setState({ currentView: "logIn" }, cb);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  logIn: (state, setState, data, cb) => {
    axios
      .post("/User?func=logIn", data)
      .then((res) => {
        if (res.data.success) {
          setState(
            {
              user: { ...res.data.user },
              userView: res.data.user.id,
              currentView: "dashboard",
            },
            cb
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  logOut: (state, setState, data, cb) => {
    axios.get("/auth/User?func=logOut").then((res) => {
      if (res.data) {
        window.location.href = "/";
      }
    });
  },
  getFeed: (state, setState, data, cb) => {
    axios.get("/Post?func=readFeed").then((res) => {
      var views = { ...state.views };
      views.feed = [...res.data];
      setState({ views }, cb);
    });
  },
  getTimeline: (state, setState, data, cb) => {},
  getInbox: (state, setState, data, cb) => {},
  getConversation: (state, setState, data, cb) => {},
  getFriendList: (state, setState, data, cb) => {},
  getFriendRequest: (state, setState, data, cb) => {},
  getAlbums: (state, setState, data, cb) => {},
  getAlbum: (state, setState, data, cb) => {},
  getSearchResults: (state, setState, data, cb) => {},
};
