module.exports = {
  settings: {
    color: {
      r: 0,
      g: 205,
      b: 150,
      getString: (r, g, b) => {
        return (
          "rgb(" +
          (r + (typeof r === "undefined" ? this.state.settings.color.r : 0)) +
          ", " +
          (g + (typeof g === "undefined" ? this.state.settings.color.g : 0)) +
          ", " +
          (b + (typeof b === "undefined" ? this.state.settings.color.b : 0)) +
          ")"
        );
      },
    },
    fontSize: 24,
  },
  user: null,
  orientation:
    window.innerWidth > window.innerHeight ? "landscape" : "portrait",
  userView: -1,
  currentView: "logIn",
  views: {
    register: {
      logInName: "",
      password: "",
      verifyPassword: "",
      displayName: "",
      email: "",
      phone: "",
    },
    logIn: {
      logInName: "",
      password: "",
    },
    feed: [],
    uploadEditor: {
      photos: [],
      currentPhotoIndex: 0,
      keywords: [],
      description: "",
      albumId: -1,
    },
    timeline: {
      displayName: "",
      email: "",
      phone: "",
      job: "",
      employer: "",
      aboutMe: "",
      profilePhoto: "",
      posts: [],
    },
    inbox: [],
    friendRequests: [],
    friends: [],
    albums: [],
    photos: [],
    search: [],
    conversation: { recipient: {}, messages: [] },
    albumViewer: null,
  },
};
