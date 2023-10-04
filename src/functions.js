var setState;
var state;

export default {
    init: (_state, _setState, cb) => {
        state = _state
        setState = _setState;
        if (typeof cb === "function") {
            cb();
        }
    },
    updateState: (_state) => {
        state = _state;
    },
    parseDateTime: (input) => {
        var temp = input.split("T");
        var date = temp[0];
        var time = temp[1];
        temp = date.split("-");
        var year = temp[0];
        var month = temp[1];
        var day = temp[2];
        temp = time.split(":");
        var hour = temp[0];
        var minute = temp[1];
        var AMPM = "AM";
        if (parseInt(hour) > 12) {
            hour = parseInt(hour - 12);
            AMPM = "PM";
        }
        return (
            month + "/" + day + "/" + year + " @ " + hour + ":" + minute + " " + AMPM
        );
    },
    changeView: (currentView, userView, cb) => {
        setState({ currentView, userView, history: [...state.history, currentView] }, cb)
    },
    updateView: (view, field, value, cb) => {
        var views = { ...state.views };
        views[view][field] = value;
        setState({ views }, cb)
    },
    setPhotoDescription: (description, cb) => {
        var views = { ...state.views };
        views.upload.photos[views.upload.photoIndex].description = description;
        setState({ views }, cb)
    },
    setPhotoAlbumId: (id, cb) => {
        var views = { ...state.views };
        views.upload.photos[views.upload.photoIndex].albumId = id;
        setState({ views }, cb)
    },
    back: () => {
        var history = [...state.history];
        history.pop();
        setState({ currentView: state.history[state.history.length - 2], history })
    }
};
