import React from "react";
class NewPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      song: [],
      user: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.currentTarget.id]: event.currentTarget.value });
  }
  async handleSubmit(event) {
    event.preventDefault();
    try {
      let response = await fetch("http://localhost:3000/users/1/playlists", {
        method: "POST",
        body: JSON.stringify({ playlist: this.state.playlist }),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      this.props.handleAddGtp(data);
      this.setState({
        title: "",
        songs: [],
      });
    } catch (e) {
      console.error({ Error: e });
    }
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="title">Playlist Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={this.handleChange}
            value={this.state.title}
            placeholder="Title"
          />
        </div>
        <div>
          <label htmlFor="song">Song:</label>
          <input
            type="text"
            id="song"
            name="songs"
            onChange={this.handleChange}
            value={this.state.song}
            placeholder="ex: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          />
        </div>
        <div className="">
          <input className="" type="submit" value="Share your playlist!" />
        </div>
      </form>
    );
  }
}
export default NewPlaylist;
