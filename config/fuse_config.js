module.exports = {
  keys: [
    {
      name: 'title',
      weight: 0.6
    },
    {
      name: 'tags',
      weight: 0.2
    },
    {
      name: 'category.name',
      weight: 0.2
    }
  ],
  minMatchCharLength: 1,
  shouldSort: true,
  findAllMatches: true,
  matchAllTokens: false,
  tokenize: true,
  threshold: 0.6,
  location: 10
};
