import axios from "axios";

export default {
  auth: {
    isLoggedIn: (state, setState, data, cb) => {
      axios.defaults.withCredentials = true;
      axios.defaults.baseURL = "http://localhost:3001";
      axios.get("/User?func=isLoggedIn").then((res) => {
        if (res.data.success) {
          setState(
            {
              user: { ...res.data.user },
            }, () => {
              if (typeof cb === "function") {
                cb(res.data)
              }
            }
          );
        }
      });
    },
    register: (state, setState, data, cb) => {
      axios
        .post("/User?func=register", data)
        .then((res) => {
          if (typeof cb === "function") {
            cb(res.data);
          }
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
              },
              () => {
                if (typeof cb === "function") {
                  cb(res.data);
                }
              }
            );
          } else if (typeof cb === "function") {
            cb(res.data);
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
  },
  create: {
    post: (state, setState, data, cb) => { },
    message: (state, setState, data, cb) => { },
    upload: (state, setState, data, cb) => {
      var form = new FormData(data.target)
      axios
        .post(
          "/auth/upload?func=image&albumId=" + data.albumId, form)
        .then((res) => {
          if (res.data !== false) {
            var views = { ...state.views };
            var newData = res.data;
            for (var i = 0; i < newData.length; i++) {
              newData[i].description = "";
              newData[i].keywords = [];
              newData[i].albumId = data.albumId;
            }
            views.upload = {
              photos: [...newData],
              photoIndex: 0
            };
            setState({ views }, cb);
          }
        });
    },
    album: (state, setState, data, cb) => {
      axios.post("/auth/Album?func=create", data).then((res) => {
        var views = { ...state.views };
        views.albums[views.albums.length] = { ...res.data }
        setState({ views }, cb)
      })
    },
    friends: (state, setState, data, cb) => { },
    friendRequests: (state, setState, data, cb) => { },
    keyword: (state, setState, data, cb) => {
      axios.post("/auth/Keyword?func=create", data).then((res) => {
        var views = { ...state.views };
        var i = 0;
        while (i < views.upload.photos.length && views.upload.photos[i].id !== data.photoId) { i++ }
        views.upload.photos[i].keywords[views.upload.photos[i].keywords.length] = { ...res.data }
        setState({ views }, cb)
      })
    }
  },
  read: {
    feed: (state, setState, data, cb) => {
      axios.get("/auth/Post?func=readFeed").then((res) => {
        var views = { ...state.views };
        views.feed = [...res.data];
        setState({ views }, cb);
      });
    },
    timeline: (state, setState, data, cb) => {
      axios
        .get(
          "/auth/Post?func=readTimelineByUser&targetId=" +
          data.targetId
        )
        .then((res) => {
          var views = { ...state.views };
          views.timeline = { ...res.data };
          setState({ views }, cb);
        });
    },
    albums: (state, setState, data, cb) => {
      axios.get("/auth/Album?func=readByUser&userId=" + data.userId).then((res) => {
        var views = { ...state.views };
        views.albums = [...res.data];
        setState({ views }, cb);
      })
    },
    photos: (state, setState, data, cb) => {
      axios.get("/auth/Photo?func=readByAlbum&albumId=" + data.albumId).then((res) => {
        var views = { ...state.views };
        views.photos = { ...res.data[0] };
        setState({ views }, cb);
      })
    },
    search: (state, setState, data, cb) => {
      var typeObj = {
        Pictures: "Photo?func=",
        People: "User?func=",
        Albums: "Album?func=",
        Posts: "Post?func=",
      };
      axios
        .get(
          "http://localhost:3001/auth/" +
          typeObj[data.type] +
          "search&query=" +
          data.query +
          "&sort=" +
          data.sort
        )
        .then((res) => {
          var views = { ...state.views };
          views.search.results = [...res.data];
          views.search.results.forEach((result) => {
            result.type = data.type;
          });
          setState({ views }, cb);
        });
    },
    //album: (state, setState, data, cb) => { },
    friends: (state, setState, data, cb) => { },
    friendRequests: (state, setState, data, cb) => { },
    inbox: (state, setState, data, cb) => { },
    conversation: (state, setState, data, cb) => { },
  },
  update: {
    post: (state, setState, data, cb) => { },
    user: (state, setState, data, cb) => { },
    photo: (state, setState, data, cb) => {
      axios.post("/auth/Photo?func=update", data).then((res) => {
        if (typeof cb === "function") {
          cb(res.data)
        }
      })
    },
    album: (state, setState, data, cb) => { },
  },
  delete: {
    post: (state, setState, data, cb) => { },
    user: (state, setState, data, cb) => { },
    photo: (state, setState, data, cb) => { },
    album: (state, setState, data, cb) => { },
    friends: (state, setState, data, cb) => { },
    friendRequests: (state, setState, data, cb) => { },
    keyword: (state, setState, data, cb) => {
      axios.delete("/auth/Keyword?func=delete&id=" + data.id).then((res) => {
        if (res.data) {
          var views = { ...state.views }
          var i = 0;
          while (i < views.upload.photos.length && views.upload.photos[i].id !== data.photoId) { i++; }
          var j = 0;
          while (j < views.upload.photos[i].keywords.length && views.upload.photos[i].keywords[j].id !== data.id) { j++; }
          views.upload.photos[i].keywords.splice(j, 1);
          setState({ views }, cb)
        }
      })
    }
  }
};
