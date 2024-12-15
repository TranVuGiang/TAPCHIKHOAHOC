import { authService } from '@/utils/authService';
import { createUrlSlug } from '@/utils/urlUtils';
import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const BaiVietDaXem = () => {
    const [baibaos, setBaibaos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        loadBaiBaoDaXem();
    }, []);

    const loadBaiBaoDaXem = async () => {
        const current = JSON.parse(localStorage.getItem('currentUser'));
        console.log(current.token);
        if (current === null || undefined) {
            navigate('/home/login');
        }
        try {
            setIsLoading(true);
            const resp = await authService.baibaoDaXem(current.token);
            setBaibaos(resp.data);
            console.log(resp);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    const LoadingSpinner = () => {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500" />
            </div>
        );
    };
    const handleArticleClick = (tendanhmuc, tieude) => {
        const magazineSlug = createUrlSlug(tendanhmuc);
        const articleSlug = createUrlSlug(tieude);
        navigate(`/home/${magazineSlug}/${articleSlug}`);
    };
    return (
        <div className="space-y-4 cursor-pointer">
            {isLoading && <LoadingSpinner />}
            {baibaos.map((item) => (
                <div
                    onClick={() => handleArticleClick(item.tendanhmuc, item.tenbaibao)}
                    key={item}
                    className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0 border border-gray-100"
                >
                    <div>
                        <h4 className="font-semibold text-gray-800">Bài viết {item.tenbaibao}</h4>
                    </div>
                    <ChevronRight className="text-gray-400 self-end md:self-center" />
                </div>
            ))}
        </div>
    );
};
