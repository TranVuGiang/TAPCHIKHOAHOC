import LoadingSpinner from '@/components/LoadingSpinner';
import MagazineCard from '@/share/MagazineCard';
import TitleText from '@/share/TitleText';
import { authService } from '@/utils/authService';
import { useEffect, useState } from 'react';

function Home() {
    const [danhmucs, setDanhmucs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quangcao, setQuangcao] = useState([]);

    useEffect(() => {
        loadQuangCao();
    }, []);

    const loadQuangCao = async () => {
        try {
            const resp = await authService.dangQuangCao();
            const quangcao = resp.data.filter((item) => item.bgqcId === '3');
            setQuangcao(quangcao);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Sửa lại cách gọi API - thêm dấu ()
                const response = await authService.getAllDanhMuc({});
                if (response !== null) {
                    const data = await authService.getAllDanhMuc({
                        page: response.pageSize,
                        size: response.totalPage,
                    });
                    console.log(data);
                }
                console.log(response.data.data);

                setDanhmucs(response.data.data); // Giả sử response có dạng { data: [...] }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const mainNews = {
        image: 'https://fundgo.network/wp-content/uploads/2024/02/Banner-16_9-for-press-release-2024-1.png',
        title: 'FUNDGO x Blockchain Life 2024 in Dubai - Waiting for To The Moon',
        source: 'FUNDGO',
        time: '4 giờ',
        engagement: '1941 liên quan',
    };

    const relatedNews = [
        {
            id: 1,
            image: 'https://hololab.vn/wp-content/uploads/2024/01/Cac-xu-huong-cong-nghe-trong-to-chuc-su-kien-nam-2024.jpeg',
            title: 'Các xu hướng công nghệ trong tổ chức sự kiện năm 2024',
            source: 'Hololab',
            time: '3 giờ',
        },
        {
            id: 2,
            image: 'https://vcdn1-sohoa.vnecdn.net/2023/10/18/Picturef1-4942-1697635419.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=2BjP5oZDihk1eW2KG-S94Q',
            title: 'Triển lãm công nghệ sự kiện ETE',
            source: 'VnExpess',
            time: '3 giờ',
        },
        {
            id: 3,
            image: 'https://cdn.vietnammoi.vn/2019/9/29/cac-su-kien-cong-nghe-noi-bat-dang-quan-tam-trong-nhung-thang-cuoi-nam-15697591377721498389125.jpg',
            title: 'Các sự kiện công nghệ nổi bật đáng quan tâm trong những tháng cuối năm',
            source: 'ZNEWS',
            time: '4 giờ',
        },
    ];

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            {/* SỐ MỚI NHẤT */}
            <section className="container mx-auto px-4 py-8 relative">
                <div className="w-full h-[60px] bg-space-400 absolute top-0 right-0 py-4 pl-8">
                    <TitleText>CÁC SỐ MỚI NHẤT</TitleText>
                </div>
                <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {danhmucs.map((issue) => (
                        <div key={issue.danhmucId}>
                            <MagazineCard
                                weekNumber={issue.tuan}
                                issueNumber={issue.so}
                                publicationDate={issue.ngaytao}
                                title={issue.tieude}
                                excerpt={issue.mota}
                                coverImage={issue.url}
                            />
                        </div>
                    ))}
                </div>
            </section>
            {/* END SỐ MỚI NHẤT */}

            {/* SỰ KIỆN HOT TRONG TUẦN */}

            {quangcao.length > 0
                ? quangcao.map((item, index) => (
                      <section key={index} className="container mx-auto px-4 py-8">
                          <div className="w-full h-[60px] bg-space-400 right-0 py-4 pl-8">
                              <TitleText>CÓ THỂ BẠN QUAN TÂM</TitleText>
                          </div>
                          <div className="container mx-auto px-4 py-6">
                              {/* Main news */}
                              <div className="mb-6">
                                  <div className="group cursor-pointer">
                                      <div className="relative w-full h-[300px] md:h-[400px] mb-4">
                                          <img
                                              src={mainNews.image}
                                              alt={mainNews.title}
                                              className="object-cover rounded-lg w-full h-full"
                                          />
                                      </div>
                                      <h1 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                                          {mainNews.title}
                                      </h1>
                                  </div>
                              </div>

                          </div>
                      </section>
                  ))
                : ''}
        </>
    );
}

export default Home;
