import React, { Component } from 'react'
import LogIn from './templates/LogIn';
import Register from './templates/Register';
import Search from "./templates/Search";
import Timeline from './templates/Timeline';
import Dashboard from "./templates/Dashboard";
import Upload from "./templates/Upload";
import Feed from "./templates/Feed";
import TopNavBar from './components/TopNavBar';
import BottomNavBar from './components/BottomNavBar';
import Albums from './templates/Albums';
import Photos from './templates/Photos';

class App extends Component {
  constructor(props) {
    super(props);
  }
  appStyle;

  componentDidMount() {
    this.props.apiCall.auth("isLoggedIn", {}, this.openFeed.bind(this))
    this.appStyle = {
      fontSize: this.props.store.settings.fontSize
    }
  }

  componentDidUpdate(prevProps, prevState) {
  }

  openFeed() {
    this.props.apiCall.read("feed", {}, () => {
      this.props.functions.changeView("feed");
    })
  }

  openAlbums(userId) {
    this.props.apiCall.read("albums", { userId }, () => {
      this.props.functions.changeView("albums", userId);
    })
  }

  openPhotos(albumId) {
    this.props.apiCall.read("photos", { albumId }, () => {
      this.props.functions.changeView("photos", this.props.store.user.id);
    })
  }

  openTimeline(targetId) {
    this.props.apiCall.read("timeline", { targetId }, () => {
      this.props.functions.changeView("timeline", targetId)
    })
  }

  openSearch() {
    this.props.functions.changeView("search")
  }

  render() {
    return (Object.keys(this.props.store).length > 0 ?
      <div style={this.appStyle}>
        <TopNavBar settings={this.props.store.settings} back={this.props.functions.back.bind(this)} openSearch={this.openSearch.bind(this)} currentView={this.props.store.currentView} />
        <div style={{ height: 64, width: "100%" }} />
        {this.props.store.currentView === "timeline" ?
          <Timeline
            settings={this.props.store.settings}
            content={this.props.store.views.timeline}
            parseDateTime={this.props.functions.parseDateTime.bind(this)} 
             />
          : null}
        {this.props.store.currentView === "albums" ?
          <Albums
            settings={this.props.store.settings}
            content={this.props.store.views.albums}
            changeView={this.props.functions.changeView.bind(this)}
            openPhotos={this.openPhotos.bind(this)}
            apiCall={this.props.apiCall} />
          : null}
        {this.props.store.currentView === "photos" ?
          <Photos
            settings={this.props.store.settings}
            content={this.props.store.views.photos}
            changeView={this.props.functions.changeView.bind(this)}
            apiCall={this.props.apiCall} />
          : null}
        {this.props.store.currentView === "search" ?
          <Search
            settings={this.props.store.settings}
            content={this.props.store.views.search}
            updateView={this.props.functions.updateView.bind(this)}
            changeView={this.props.functions.changeView.bind(this)}
            apiCall={this.props.apiCall} />
          : null}
        {this.props.store.currentView === "upload" ?
          <Upload
            settings={this.props.store.settings}
            content={this.props.store.views.upload}
            updateView={this.props.functions.updateView.bind(this)}
            changeView={this.props.functions.changeView.bind(this)}
            apiCall={this.props.apiCall}
            albums={this.props.store.views.albums}
            setPhotoDescription={this.props.functions.setPhotoDescription.bind(this)}
            setPhotoAlbumId={this.props.functions.setPhotoAlbumId.bind(this)}
          />
          : null}
        {this.props.store.currentView === "logIn" ?
          <LogIn
            settings={this.props.store.settings}
            content={this.props.store.views.logIn}
            updateView={this.props.functions.updateView.bind(this)}
            changeView={this.props.functions.changeView.bind(this)}
            openFeed={this.openFeed.bind(this)}
            apiCall={this.props.apiCall} />
          : null}
        {this.props.store.currentView === "register" ?
          <Register
            settings={this.props.store.settings}
            content={this.props.store.views.register}
            updateView={this.props.functions.updateView.bind(this)}
            changeView={this.props.functions.changeView.bind(this)}
            apiCall={this.props.apiCall} />
          : null}
        {this.props.store.currentView === "feed" ?
          <Feed
            settings={this.props.store.settings}
            content={this.props.store.views.feed}
            updateView={this.props.functions.updateView.bind(this)}
            changeView={this.props.functions.changeView.bind(this)}
            apiCall={this.props.apiCall}
            parseDateTime={this.props.functions.parseDateTime.bind(this)} 
            />
          : null}
        <div style={{ height: 64, width: "100%" }} />
        <BottomNavBar
          settings={this.props.store.settings}
          openAlbums={() => {
            if (this.props.store.user !== null) {
              this.openAlbums(this.props.store.user.id)
            }
          }}
          openSearch={() => { }}
          openFeed={this.openFeed.bind(this)}
          openTimeline={() => { this.openTimeline(this.props.store.user.id) }} />
      </div> : null);
  }
}

export default App;
