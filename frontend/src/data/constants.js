export const ARTICLE_STATUSES = {
    new: { label: 'Mới', color: 'bg-green-100 text-green-800' },
    reviewing: { label: 'Đang kiểm duyệt', color: 'bg-blue-100 text-blue-800' },
    reviewed: { label: 'Đã kiểm duyệt', color: 'bg-yellow-100 text-yellow-800' },
    revision: { label: 'Cần chỉnh sửa', color: 'bg-red-100 text-red-800' },
    approved: { label: 'Đã duyệt', color: 'bg-emerald-100 text-emerald-800' },
    published: { label: 'Đã xuất bản', color: 'bg-purple-100 text-purple-800' }
  };
  
  export const MOCK_ARTICLES = {
    new: [
      {
        id: 1,
        title: 'Nghiên cứu về kinh tế số',
        author: 'Nguyễn Văn A',
        submittedDate: '2024-10-15',
        status: 'new',
        category: 'Kinh tế',
        abstract: 'Tóm tắt về nghiên cứu kinh tế số...',
        pdfUrl: '/path/to/pdf1.pdf'
      },
      {
        id: 2,
        title: 'Phát triển bền vững trong ASEAN',
        author: 'Trần Thị B',
        submittedDate: '2024-10-16',
        status: 'new',
        category: 'Chính trị',
        pdfUrl: '/path/to/pdf2.pdf'
      },
    ],
    inProgress: [
      {
        id: 3,
        title: 'Ảnh hưởng của AI trong giáo dục',
        author: 'Lê Văn C',
        submittedDate: '2024-10-14',
        status: 'reviewing',
        reviewer: 'TS. Phạm Văn X',
        category: 'Giáo dục',
        pdfUrl: '/path/to/pdf3.pdf',
        reviewStatus: 'pending'
      },
      {
        id: 4,
        title: 'Blockchain và tương lai',
        author: 'Nguyễn Thị D',
        submittedDate: '2024-10-13',
        status: 'reviewed',
        reviewer: 'PGS.TS. Lê Thị Y',
        category: 'Công nghệ',
        pdfUrl: '/path/to/pdf4.pdf',
        reviewStatus: 'completed',
        reviewDate: '2024-10-20'
      }
    ],
    completed: [
      {
        id: 5,
        title: 'Phát triển đô thị thông minh',
        author: 'Trần Văn E',
        submittedDate: '2024-10-12',
        status: 'published',
        reviewer: 'TS. Trần Văn Z',
        category: 'Đô thị học',
        pdfUrl: '/path/to/pdf5.pdf',
        reviewStatus: 'approved',
        reviewDate: '2024-10-18',
        publishDate: '2024-10-19'
      }
    ]
  };
  
  export const MOCK_REVIEWERS = [
    { id: 1, name: 'TS. Phạm Văn X', expertise: 'Kinh tế học', currentLoad: 2 },
    { id: 2, name: 'PGS.TS. Lê Thị Y', expertise: 'Chính trị học', currentLoad: 1 },
    { id: 3, name: 'TS. Trần Văn Z', expertise: 'Công nghệ', currentLoad: 3 }
  ];