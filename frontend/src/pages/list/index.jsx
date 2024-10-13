import React from 'react';
import list1 from "@/assets/list1.png";
const data = {
  "issueNumber": "18",
  "date": "8.2024",
  "title": "TẠP CHÍ KHOA HỌC YERSIN",
  "description": "Trường Đại học Yersin Đà Lạt",
 // "coverImage": "/assets/list1.png", // Updated path to the image
  "sections": [
    {
      "title": "CHUYÊN ĐỀ QUẢN LÝ KINH TẾ",
      "articles": [
        {
          "title": "PHÂN TÍCH KINH TẾ...",
          "authors": ["Hoàng Thụy Quỳnh Như"],
          "pages": "1-11",
          "pdfLink": "#"
        },
        {
          "title": "TÁC ĐỘNG CỦA ĐỔI MỚI...",
          "authors": ["Trần Thị Thu Hương", "Nguyễn Thị Thanh Thúy"],
          "pages": "12-26",
          "pdfLink": "#"
        }
      ]
    },
    {
      "title": "CHUYÊN ĐỀ KHOA HỌC - CÔNG NGHỆ",
      "articles": [
        {
          "title": "ĐÁNH GIÁ TÁC ĐỘNG NGẮN HẠN...",
          "authors": ["Nguyễn Hoàng Đăng", "Trần Quang Khánh"],
          "pages": "27-36",
          "pdfLink": "#"
        },
        {
          "title": "ẢNH HƯỞNG CỦA QUÁ TRÌNH TIỀN...",
          "authors": ["Trần Thị Phượng"],
          "pages": "37-48",
          "pdfLink": "#"
        }
      ]
    }
  ]
};

function ListPage() {
  return (
    <div style={styles.container}>
      {/* Styles in JSX */}
      <style>{`
        .journal-header img {
          max-width: 100%;
          height: auto;
        }

        .article-list .article-item {
          display: flex;
          align-items: center;
        }

        .btn-pdf {
          background-color: #007bff;
          color: white;
          padding: 5px 10px;
          text-decoration: none;
          border-radius: 5px;
        }

        .btn-pdf:hover {
          background-color: #0056b3;
        }
      `}</style>

      <div style={styles.header} className="journal-header grid grid-cols-12 gap-4 mb-8">
        
        {/* Issue details */}
        <div className="col-span-9">
          <h1 style={styles.title}>{data.title}</h1>
          <p style={styles.description}>{data.description}</p>
          <p style={styles.issueDate}>
            Số {data.issueNumber} ({data.date})
          </p>
          <p style={styles.publishedDate}>
            Đã xuất bản: 22/08/2024
          </p>
        </div>
        {/* Cover image */}
        <div style={styles.imageContainer} className="col-span-3">
          <img src={list1} alt="Tạp chí khoa học" style={styles.image} />
        </div>
      </div>
      {/* Sections */}
      {data.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} style={styles.section}>
          <h2 style={styles.sectionTitle}>{section.title}</h2>
          <div className="article-list">
            {section.articles.map((article, articleIndex) => (
              <div key={articleIndex} style={styles.articleItem} className="article-item">
                <div style={styles.articleDetails}>
                  <h3 style={styles.articleTitle}>{article.title}</h3>
                  <p style={styles.articleAuthors}>
                    Tác giả: {article.authors.join(', ')}
                  </p>
                  <p style={styles.articlePages}>Trang: {article.pages}</p>
                </div>
                <div style={styles.pdfButtonContainer}>
                  <a href={article.pdfLink} className="btn-pdf">PDF</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Style
const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '16px',
  },
  header: {
    display: 'grid',
    gridTemplateColumns: '1fr 3fr',
    gap: '16px',
    marginBottom: '32px',
  },
  imageContainer: {
    width: '250px',
  },
  image: {
    width: '100%',   
    height: 'auto',  
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
  },
  description: {
    fontSize: '18px',
  },
  issueDate: {
    fontSize: '14px',
    color: '#555',
  },
  publishedDate: {
    fontSize: '12px',
    color: '#999',
  },
  section: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '16px',
  },
  articleItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #ddd',
  },
  articleDetails: {
    flex: 1,
  },
  articleTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  articleAuthors: {
    fontSize: '14px',
  },
  articlePages: {
    fontSize: '12px',
    color: '#777',
  },
  pdfButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

export default ListPage;
