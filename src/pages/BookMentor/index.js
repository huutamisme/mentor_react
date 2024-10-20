import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { vi } from "date-fns/locale";
import { MockInterviewData } from "../Services/Data/MockInterView";
import { CareerAdviseData } from "../Services/Data/CareerAdvise";
import { ProjectAdviseData } from "../Services/Data/ProjectAdvise";
import { useParams, useNavigate } from "react-router-dom";
import { format, parse, addHours } from "date-fns";
import { Voucher } from './Voucher';
import { toast, ToastContainer } from 'react-toastify';

export default function BookMentorPage() {
    const [duration, setDuration] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [timeSlot, setTimeSlot] = useState("");
    const [discountCode, setDiscountCode] = useState("");
    const [discountValue, setDiscountValue] = useState(0);
    const { type, id } = useParams();
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(30);
    const [isTimerActive, setIsTimerActive] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Bộ đếm ngược
    useEffect(() => {
        let timer;
        if (isTimerActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            toast.warning("Thời gian giữ lịch hẹn đã hết!");
            setTimeout(() => {
                navigate('/services');
            }, 2500);
        }
        return () => clearInterval(timer);
    }, [isTimerActive, timeLeft, navigate]);

    let dataSource;
    if (type === 'mock') {
        dataSource = MockInterviewData;
    } else if (type === 'career') {
        dataSource = CareerAdviseData;
    } else if (type === 'project') {
        dataSource = ProjectAdviseData;
    } else {
        return <h1 className="text-5xl">Invalid type!</h1>
    }

    const mentor = dataSource.find(mentor => mentor.id === parseInt(id));

    const handleDurationChange = (e) => {
        setDuration(parseInt(e.target.value));
    };

    const handleTimeSlotChange = (time) => {
        setTimeSlot(time);
    };

    const handleDiscountChange = (e) => {
        const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ""); // Only allow uppercase letters and numbers
        setDiscountCode(value);
    };

    const applyDiscountCode = () => {
        const voucher = Voucher.find(v => v.code === discountCode); // Tìm kiếm voucher khớp với mã giảm giá
        if (voucher) {
            setDiscountValue(voucher.value); // Áp dụng giá trị giảm giá
        } else {
            setDiscountValue(0); // Nếu mã không tồn tại, không áp dụng giảm giá
            toast.error('Mã giảm giá không hợp lệ!');
        }
        setDiscountCode("");
    };

    const mentorPrice = duration * mentor.pricing;
    const vatPrice = (mentorPrice * 10) / 100;
    const discountPrice = (discountValue / 100) * (mentorPrice + vatPrice);
    const totalPrice = mentorPrice + vatPrice - discountPrice;

    const calculateEndTime = () => {
        if (!timeSlot) return "";
        const time = parse(timeSlot, "h:mma", new Date());
        const endTime = addHours(time, duration);
        return format(endTime, "h:mma");
    };

    const formatSelectedDate = (date) => {
        if (!date) return "Chưa chọn ngày!";
        const dayOfWeek = format(date, 'eeee', { locale: vi });
        const day = format(date, 'd');
        const month = format(date, 'MM');
        const year = format(date, 'yyyy');
        return `${dayOfWeek}, ngày ${day}/${month}/${year}`;
    };

    const handleConfirmBooking = () => {
        toast.success("Đặt lịch hẹn thành công!");
        setTimeout(() => {
            navigate('/services');
        }, 2500);
    };



    return (
        <div className="block md:flex bg-background min-h-screen p-10 md:space-x-10">
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="w-full md:w-1/2 p-5 bg-gradient-custom shadow-lg rounded-lg mb-3 md:mb-0">
                <h2 className="text-3xl font-bold mb-4 text-white">Chọn Thông Tin Đặt Lịch</h2>

                <div className="mb-6">
                    <label className="text-xl text-white font-semibold">Chọn Thời Lượng (giờ):</label>
                    <select
                        className="block w-full p-2 mt-2 border border-gray-300 rounded"
                        value={duration}
                        onChange={handleDurationChange}
                    >
                        <option value={1}>1 giờ</option>
                        <option value={2}>2 giờ</option>
                        <option value={3}>3 giờ</option>
                    </select>
                </div>

                <div className="mb-6 space-x-4">
                    <label className="text-xl font-semibold text-white">Chọn Ngày:</label>
                    <div className="flex justify-center">
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="dd/MM/yyyy"
                            locale={vi}
                            minDate={new Date()}
                            inline
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="text-xl font-semibold text-white">Chọn Khung Giờ:</label>
                    <div className="pt-4 pb-2 mt-4 flex space-x-4 flex-wrap items-start">
                        {mentor.period.map((time, index) => (
                            <button
                                key={index}
                                onClick={() => handleTimeSlotChange(time)}
                                className={`${timeSlot === time
                                    ? "border-4 border-blue-500"
                                    : "border-4 border-transparent"
                                    } bg-white text-customBlue font-semibold rounded-full py-1 px-5 w-fit mb-2 text-2xl`}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg">
                <div className="flex items-center space-x-4 border-b-2 p-5">
                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            <img src={mentor.image} alt={mentor.name} />
                        </div>
                    </div>
                    <div>
                        <p className="text-4xl font-bold text-customBlue">Tư vấn với {mentor.name}</p>
                        Giữ lịch hẹn trong {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </div>
                </div>
                <div className="border-b-2 p-5">
                    <div className="mb-4 flex justify-between">
                        <p className="text-2xl font-bold text-customBlue">{duration} giờ</p>
                        <p className="text-2xl font-bold text-customBlue">{mentorPrice.toLocaleString('vi-vn')} VND</p>
                    </div>

                    <div className="mb-4">
                        <p className="text-2xl">{formatSelectedDate(selectedDate)}</p>
                    </div>

                    <div className="mb-4">
                        <p className="text-2xl text-customBlue">{timeSlot ? `${timeSlot} - ${calculateEndTime()}` : "Chưa chọn khung giờ!"}</p>
                    </div>

                    {/* Discount Code Input */}
                    <div className="flex items-center space-x-2 mb-6 border border-2 border-black rounded-full">
                        <input
                            type="text"
                            value={discountCode}
                            onChange={handleDiscountChange}
                            placeholder="Nhập mã giảm giá"
                            className="w-2/3 p-2 rounded-full text-customBlue text-center focus:outline-none"
                        />
                        <button
                            onClick={applyDiscountCode}
                            className="w-1/3 bg-customBlue text-white p-2 rounded font-semibold rounded-r-full"
                        >
                            Áp dụng
                        </button>
                    </div>
                </div>

                <div className="text-customBlue px-10 space-y-4 py-4">
                    <div className="flex justify-between">
                        <h3 className="text-2xl">Phí tư vấn: </h3>
                        <h3 className="text-2xl">{mentorPrice.toLocaleString('vi-VN')} VND</h3>
                    </div>
                    <div className="flex justify-between">
                        <h3 className="text-2xl">VAT (10%): </h3>
                        <h3 className="text-2xl">{vatPrice.toLocaleString('vi-VN')} VND</h3>
                    </div>
                    {discountValue !== 0 &&
                        <div className="flex justify-between">
                            <h3 className="text-2xl">Mã giảm giá ({discountValue}%):</h3>
                            <h3 className="text-2xl">{discountPrice.toLocaleString('vi-VN')} VND</h3>
                        </div>
                    }
                    <div className="flex justify-between">
                        <h3 className="text-2xl font-bold">Tổng cộng: </h3>
                        <h3 className="text-2xl font-bold">{totalPrice.toLocaleString('vi-VN')} VND</h3>
                    </div>

                    <button
                        className={`mt-6 w-full p-3 text-white font-bold text-lg rounded-lg ${!selectedDate || !timeSlot ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
                            }`}
                        disabled={!selectedDate || !timeSlot}
                        onClick={handleConfirmBooking}
                    >
                        Xác nhận và Đặt lịch
                    </button>
                </div>
            </div>
        </div>
    );
}
