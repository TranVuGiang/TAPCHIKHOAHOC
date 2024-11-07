export const filterArticles = (articles, { searchQuery, filterReviewer, filterStatus }) => {
    return articles.filter(article => {
      const matchSearch = !searchQuery ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchReviewer = !filterReviewer || article.reviewer === filterReviewer;
      const matchStatus = !filterStatus || article.status === filterStatus;
      return matchSearch && matchReviewer && matchStatus;
    });
  };