// src/App.jsx
import { useState } from 'react'

export default function PaymentPage() {
    const [formData, setFormData] = useState({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
        amount: ''
    })

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const validateForm = () => {
        const newErrors = {}

        if (!formData.cardNumber.match(/^\d{16}$/)) {
            newErrors.cardNumber = 'Số thẻ phải có 16 chữ số'
        }

        if (!formData.cardHolder.trim()) {
            newErrors.cardHolder = 'Vui lòng nhập tên chủ thẻ'
        }

        if (!formData.expiryDate.match(/^\d{2}\/\d{2}$/)) {
            newErrors.expiryDate = 'Định dạng phải là MM/YY'
        }

        if (!formData.cvv.match(/^\d{3}$/)) {
            newErrors.cvv = 'CVV phải có 3 chữ số'
        }

        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            newErrors.amount = 'Vui lòng nhập số tiền hợp lệ'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) return

        setLoading(true)

        try {
            // Giả lập API call
            await new Promise(resolve => setTimeout(resolve, 2000))
            setSuccess(true)
        } catch (error) {
            alert('Có lỗi xảy ra khi xử lý thanh toán')
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    if (success) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <div className="text-green-500 text-5xl mb-4">✓</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Thanh toán thành công!</h2>
                    <p className="text-gray-600 mb-6">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                    >
                        Quay lại
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <div className="bg-white shadow-md rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Thông tin thanh toán
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            {/* Số thẻ */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Số thẻ
                                </label>
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
                                    placeholder="1234 5678 9012 3456"
                                    className={`w-full px-3 py-2 border rounded-md ${
                                        errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                {errors.cardNumber && (
                                    <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
                                )}
                            </div>

                            {/* Tên chủ thẻ */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tên chủ thẻ
                                </label>
                                <input
                                    type="text"
                                    name="cardHolder"
                                    value={formData.cardHolder}
                                    onChange={handleInputChange}
                                    placeholder="NGUYEN VAN A"
                                    className={`w-full px-3 py-2 border rounded-md ${
                                        errors.cardHolder ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                {errors.cardHolder && (
                                    <p className="mt-1 text-sm text-red-500">{errors.cardHolder}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Ngày hết hạn */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Ngày hết hạn
                                    </label>
                                    <input
                                        type="text"
                                        name="expiryDate"
                                        value={formData.expiryDate}
                                        onChange={handleInputChange}
                                        placeholder="MM/YY"
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.expiryDate && (
                                        <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>
                                    )}
                                </div>

                                {/* CVV */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        CVV
                                    </label>
                                    <input
                                        type="text"
                                        name="cvv"
                                        value={formData.cvv}
                                        onChange={handleInputChange}
                                        placeholder="123"
                                        className={`w-full px-3 py-2 border rounded-md ${
                                            errors.cvv ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.cvv && (
                                        <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>
                                    )}
                                </div>
                            </div>

                            {/* Số tiền */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Số tiền
                                </label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    placeholder="0"
                                    className={`w-full px-3 py-2 border rounded-md ${
                                        errors.amount ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                {errors.amount && (
                                    <p className="mt-1 text-sm text-red-500">{errors.amount}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3 px-4 text-white rounded-md ${
                                    loading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-blue-500 hover:bg-blue-600'
                                }`}
                            >
                                {loading ? 'Đang xử lý...' : 'Thanh toán'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}