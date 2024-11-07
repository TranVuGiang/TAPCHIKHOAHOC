import ArticleCard from '@/components/articleCard';

const ReviewedArticles = (articles) => {
    const reviewedArticles = articles.filter(
        (article) => article.status === 'approved' || article.status === 'rejected',
    );

    return (
        <div className="space-y-6">
            {reviewedArticles.length > 0 ? (
                reviewedArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} showFeedback={false} />
                ))
            ) : (
                <div className="text-center py-8 text-gray-500">Chưa có bài viết nào được duyệt</div>
            )}
        </div>
    );
};

export default ReviewedArticles;
