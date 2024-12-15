import { authService } from "@/utils/authService";
import { DollarSign, FileText, Radio, Users } from "lucide-react";
import { useEffect, useState } from "react";

export const RenderDashboard = () => {
    const [thongke, setThongke] = useState([]);

    useEffect(() => {
        loadThongke()
    }, [])

    const loadThongke = async() => {
        const current = JSON.parse(localStorage.getItem('currentUser'));
        if (!current) {
            return;
        }
        const token = current.token;
        try {
            const resp = await authService.loadThongkeByAdmin({token})
            setThongke(resp.data.data)
            console.log(resp)
        } catch (error) {
            console.log(error)
            
        }
    } 
    const StatCard = ({ title, value, icon }) => (
        <div className="bg-white shadow-md rounded-lg p-5 flex items-center justify-between">
            <div>
                <h3 className="text-gray-500 text-sm">{title}</h3>
                <p className="text-2xl font-bold">{value}</p>
            </div>
            {icon}
        </div>
    );

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Người dùng" value={thongke.sltaikhoan} icon={<Users className="text-blue-500" />} />
            <StatCard title="Bài báo" value={thongke.slbaibao} icon={<FileText className="text-green-500" />} />
            <StatCard
                title="Quảng cáo"
                value={thongke.slquangcao}
                icon={<Radio className="text-purple-500" />}
            />
            <StatCard
                title="Tổng Doanh Thu"
                value={thongke.doanhthu+" "+ "VND"}
                icon={<DollarSign className="text-yellow-500" />}
            />
        </div>
    );
};
