module.exports = {
  user: null,
  orientation:
    window.innerWidth > window.innerHeight ? "landscape" : "portrait",
  userView: -1,
  currentView: "logIn",
  history: [],
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
    upload: {
      photos: [],
      photoIndex: 0,
    },
    timeline: { //userid
      displayName: "",
      email: "",
      phone: "",
      job: "",
      employer: "",
      aboutMe: "",
      profilePhoto: {},
      posts: [],
    },
    albums: [], //userId
    photos: { albumId: null, description: "", photos: [] }, //this will be a single album with all it's photos
    search: { query: "", sort: "Relevance", type: "People", results: [] },

    friendRequests: [],
    friends: [],
    inbox: [],
    conversation: { recipient: {}, messages: [] },
  },
};
