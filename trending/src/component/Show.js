import React from 'react'
class ShowPlaylist extends React.Component {
    constructor(props) {
    super(props)
    this.state = {
      title: '',
      songs: []
      }
      this.handleAdd = this.handleAdd.bind(this)
          this.handleDelete = this.handleDelete.bind(this)
          this.handleUpdate = this.handleUpdate.bind(this)
  }
    componentDidMount() {
        this.getPlaylists()
    }
    getPlaylists() {
        fetch(`http://localhost:3000/users/1/playlists`)
        .then(response => response.json())
        .then(json => {
      this.setState({ playlists: json })
  }) console.log(playlists);
    .catch(error => console.error('noo', error))
    }
     handleAdd(event, formInputs) {
         event.preventDefault()
         fetch('/playlists', {
             body: JSON.stringify(formInputs),
             method: 'POST',
             headers: {
                 Accept: 'application/json, text/plain, */*',
                 'Content-Type': 'application/json'
             }
         })
         .then(createdNotice => {
             return createdNotice.json()
         })
         .then(jsonedNotice => {
             this.setState({
                 playlists: [jsonedNotice, ...this.state.playlists]
             })
         }).catch(error => console.error(error))
     }
     handleDelete(deletedSong) {
      fetch(`http://localhost:3000/users/1/playlists/1/${deletedSong.id}`, {
         method: 'DELETE',
         headers: {
           'Accept': 'application/json, text/plain, */*',
           'Content-Type': 'application/json'
         }
       })
     .then(json => {
       this.setState(state => {
         const playlists = state.playlists.filter((playlist, index) => song.id !== deletedSong.id)
         return {
           playlists
         }
       })
     })
     .catch(error => console.log(error))
    }
     handleUpdate(event, formInputs) {
        event.preventDefault()
        fetch(`http://localhost:3000/users/1/playlists/${playlist.id}/${formInputs.id}`, {
            body: JSON.stringify(formInputs),
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        })
        .then(updatedNotice => {
            this.getPlaylists()
        })
        .catch(error => console.error(error))
    }
  render () {
    return (
      <>
        <div>
         <h2>Playlist Info:</h2>
       </div>
      </>
    )
  }
 }
export default Show
