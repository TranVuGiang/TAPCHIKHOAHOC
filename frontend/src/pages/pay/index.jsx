import React, { useState } from 'react';
import { CreditCard, Book, Beaker, Award, CheckCircle } from 'lucide-react';

export default function ScientificJournalAdPayment() {
  const [selectedPackage, setSelectedPackage] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit');

  const adPackages = {
    basic: { name: 'Cơ bản', price: '1,000,000', features: ['1 bài đăng', '30 ngày hiển thị', 'Tiếp cận độc giả cơ bản'] },
    standard: { name: 'Tiêu chuẩn', price: '2,500,000', features: ['3 bài đăng', '60 ngày hiển thị', 'Phân tích độc giả', 'Ưu tiên hiển thị'] },
    premium: { name: 'Cao cấp', price: '5,000,000', features: ['Không giới hạn bài đăng', '90 ngày hiển thị', 'Báo cáo chi tiết', 'Vị trí quảng cáo đặc biệt', 'Hỗ trợ biên tập'] }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-800">Đăng Ký Gói Quảng Cáo Tạp Chí Khoa Học</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(adPackages).map(([key, pack]) => (
          <div 
            key={key}
            className={`p-6 rounded-lg border-2 transition-all duration-300 ${
              selectedPackage === key 
                ? 'border-indigo-500 bg-indigo-50 shadow-lg' 
                : 'border-gray-200 hover:border-indigo-300'
            }`}
            onClick={() => setSelectedPackage(key)}
          >
            <h3 className="text-xl font-semibold mb-2 text-indigo-700">{pack.name}</h3>
            <p className="text-2xl font-bold mb-4 text-gray-800">{pack.price} VNĐ</p>
            <ul className="space-y-2">
              {pack.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              className={`mt-4 w-full py-2 px-4 rounded-md transition-colors ${
                selectedPackage === key 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {selectedPackage === key ? 'Đã chọn' : 'Chọn gói'}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-800">Phương thức thanh toán</h2>
        <div className="space-y-4">
          <label className="flex items-center space-x-3 p-3 bg-white rounded-md border border-gray-200 cursor-pointer hover:border-indigo-300">
            <input
              type="radio"
              name="paymentMethod"
              value="credit"
              checked={paymentMethod === 'credit'}
              onChange={() => setPaymentMethod('credit')}
              className="form-radio text-indigo-600"
            />
            <CreditCard className="w-6 h-6 text-indigo-500" />
            <span className="text-gray-700">Thẻ tín dụng/ghi nợ</span>
          </label>
          <label className="flex items-center space-x-3 p-3 bg-white rounded-md border border-gray-200 cursor-pointer hover:border-indigo-300">
            <input
              type="radio"
              name="paymentMethod"
              value="bank"
              checked={paymentMethod === 'bank'}
              onChange={() => setPaymentMethod('bank')}
              className="form-radio text-indigo-600"
            />
            <Award className="w-6 h-6 text-indigo-500" />
            <span className="text-gray-700">Chuyển khoản ngân hàng</span>
          </label>
        </div>
      </div>

      {paymentMethod === 'credit' && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-indigo-800">Thông tin thẻ</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Số thẻ</label>
              <input
                type="text"
                id="cardNumber"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="expDate" className="block text-sm font-medium text-gray-700 mb-1">Ngày hết hạn</label>
                <input
                  type="text"
                  id="expDate"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="MM / YY"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">Mã bảo mật</label>
                <input
                  type="text"
                  id="cvv"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="123"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300">
        Xác nhận đăng ký và thanh toán
      </button>

      <div className="mt-8 flex items-center justify-center space-x-4 text-gray-600">
        <Book className="w-6 h-6" />
        <Beaker className="w-6 h-6" />
        <p className="text-sm">Quảng cáo của bạn sẽ được hiển thị trên các tạp chí khoa học hàng đầu</p>
      </div>
    </div>
  );
}