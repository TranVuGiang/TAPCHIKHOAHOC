
import { ArrowRight, Calendar } from 'lucide-react';

function MagazineCard({ issueNumber, publicationDate, title, excerpt, coverImage }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Image cover with issue number overlay */}
      <div className="relative">
        <img 
          src={coverImage}
          alt={title}
          className="w-full h-[250px] object-cover"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
          {issueNumber}
        </div>
      </div>

      {/* Content section */}
      <div className="px-6 py-4">
        {/* Publication date */}
        <div className="flex items-center text-gray-500 mb-4">
          <Calendar size={16} className="mr-2" />
          <span className="text-sm">{publicationDate}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {excerpt}
        </p>

        {/* Read more button */}
        <button className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-300">
          Đọc thêm
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
}
export default MagazineCard