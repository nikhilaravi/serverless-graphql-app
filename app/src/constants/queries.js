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
