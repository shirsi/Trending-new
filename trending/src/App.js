import React, { Component } from "react";
import NewPlaylist from "./component/NewPlaylist.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
    };
    this.deletePlaylist = this.deletePlaylist.bind(this);
    this.handleAddPlaylist = this.handleAddPlaylist.bind(this);
  }
  async getPlaylists() {
    try {
      const response = await fetch("http://localhost:3000/users/1/playlists");
      const data = await response.json();
      this.setState({ playlists: data });
      console.log(this.state.playlists);
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.getPlaylists();
  }
  async deletePlaylist(id) {
    try {
      console.log(`${id}`);
      const response = await fetch(
        `http://localhost:3000/users/1/playlists/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);
      const foundPlaylist = this.state.playlists.findIndex(
        (playlist) => playlist._id === id
      );
      const copyPlaylists = [...this.state.playlists];
      copyPlaylists.splice(foundPlaylist, 1);
      this.setState({ playlists: copyPlaylists });
    } catch (e) {
      console.log(e);
    }
  }

  handleAddPlaylist(playlist) {
    const copyPlaylists = [playlist, ...this.state.playlist];
    this.setState({
      playlist: copyPlaylists,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="position-sticky show"></div>
        <div>
          <h1>Trending!</h1>
        </div>
        <NewPlaylist handleAddPlaylist={this.handleAddPlaylist} />
        <br />
        {this.state.playlists.map((playlist) => {
          return (
            <div key={playlist._id} className="column">
              <div className="row">
                <div className="card col">
                  <div className="card-body">
                    <h5 className="">{playlist.title}</h5>
                    <h6 className="">{playlist.num_songs}</h6>
                    <p className="card-text">{playlist.user}</p>
                    <a
                      onClick={() => {
                        this.deletePlaylist(playlist.id);
                      }}
                      href="#"
                      className=""
                    >
                      X
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
