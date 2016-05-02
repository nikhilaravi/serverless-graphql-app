export const ADD_TRACK_MUTATION = `
  mutation addTrackMutation($name: String, $artist: String, $url: String, $imageUrl: String) {
    addTrack(name: $name, artist: $artist, url: $url, imageUrl: $imageUrl) {
      id
    }
  }
`;
