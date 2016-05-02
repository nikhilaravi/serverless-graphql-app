export const SONG_SUGGESTIONS_QUERY = `
  query songSuggestionsQuery($query: String, $limit: Int) {
    suggestions(query: $query, limit: $limit) {
      name,
      artist,
      url,
      imageUrl
    }
  }
`;

export const PLAYLIST_QUERY = `
  query {
  	playlist {
      name,
      artist,
      imageUrl,
      url
    }
  }
`;
