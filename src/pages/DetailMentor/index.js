import { useEffect, useState } from "react";
import { MockInterviewData } from "../Services/Data/MockInterView";
import { CareerAdviseData } from "../Services/Data/CareerAdvise";
import { ProjectAdviseData } from "../Services/Data/ProjectAdvise";
import { NavLink, useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";

export default function DetailMentorPage() {
    const [filteredReview, setFilteredReview] = useState([]);
    const [isNewestActive, setIsNewestActive] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Hàm lọc các review mới nhất (trong vòng 7 ngày)
    const newestReviews = () => {
        const result = mentor.reviews.filter(review => review.date.includes('ngày'));
        setFilteredReview(result); // Cập nhật filteredReview
        setIsNewestActive(true);
    };

    useEffect(() => {
        newestReviews();
    }, []);

    const { type, id } = useParams();

    let dataSource;
    if (type === 'mock') {
        dataSource = MockInterviewData;
    } else if (type === 'career') {
        dataSource = CareerAdviseData;
    } else if (type === 'project') {
        dataSource = ProjectAdviseData;
    } else {
        return <h1 className="text-5xl">Invalid type!</h1>;
    }

    const mentor = dataSource.find(mentor => mentor.id === parseInt(id));

    if (!mentor) {
        return <h1 className="text-5xl">Mentor not found!</h1>;
    }

    // Tính số lượng đánh giá cho mỗi mức sao
    const starCounts = Array(5).fill(0);
    let totalStars = 0; // Tổng số sao để tính trung bình
    mentor.reviews.forEach(review => {
        starCounts[review.rating - 1] += 1; // Đếm số lượng đánh giá cho mỗi mức sao
        totalStars += review.rating; // Cộng tổng sao
    });

    const averageStars = totalStars / mentor.reviews.length || 0; // Tính số sao trung bình

    // Tạo mảng cho progress với chỉ số sao và số lượng đánh giá
    const progressData = starCounts.map((count, index) => ({ stars: index + 1, count }));

    // Sắp xếp mảng theo số lượng đánh giá giảm dần
    progressData.sort((a, b) => b.stars - a.stars);

    // Render thông tin chi tiết của mentor
    return (
        <div className="flex flex-col lg:flex-row bg-background border-t-2">
            <div className="w-full lg:w-1/6 flex flex-col items-center justify-start p-5">
                <div className="avatar">
                    <div className="w-30 rounded-full">
                        <img src={mentor.image} alt={mentor.name} />
                    </div>
                </div>
                <h1 className="text-4xl text-customBlue font-semibold break-words text-center">{mentor.name}</h1>
                <p className="text-3xl text-customBlue italic break-words text-center mb-2">{mentor.career}</p>
                <div className="flex flex-col bg-secondary rounded-3xl p-3 space-y-2 items-center">
                    <p className="text-white font-semibold">{mentor.pricing.toLocaleString('vi-vn')}/giờ</p>
                    <NavLink to={`/services/book/${type}/${id}`} className="rounded-full bg-white text-customBlue font-semibold px-3">Book Now</NavLink>
                </div>
            </div>
            <div className="w-full lg:w-5/6 bg-background py-5 px-5 lg:px-20">
                <p dangerouslySetInnerHTML={{ __html: mentor.about }}></p>
                <div className="border-y-2 border-customBlue pt-4 pb-2 mt-4 flex flex-wrap items-start space-x-2">
                    {mentor.badges.map((badge, index) => (
                        <p key={index} className="bg-base-300 rounded-full p-1 w-fit mb-2">{badge}</p>
                    ))}
                </div>

                {/* Phần Đánh giá và Nhận xét */}
                <div className="mt-8">
                    <h2 className="text-3xl text-customBlue font-bold mb-4">Đánh giá và Nhận xét</h2>

                    {/* Hiển thị số sao trung bình và thanh progress cho mỗi mức sao */}
                    <div className="mt-8 bg-white rounded-3xl w-full lg:w-1/2">
                        <div className="flex items-end p-2">
                            <h3 className="text-4xl text-customBlue font-bold">{averageStars.toFixed(1)} ⭐ </h3>
                            <h3>{mentor.reviews.length} đánh giá</h3>
                        </div>
                        <div className="h-2 bg-background"></div>
                        {progressData.map((data) => (
                            <div key={data.stars} className="flex items-center mb-2 text-customBlue px-5">
                                <span className="mr-2">{data.stars}</span>
                                <progress className="progress progress-warning" value={data.count} max={mentor.reviews.length}></progress>
                            </div>
                        ))}
                    </div>

                    <div className="space-x-4 mt-4">
                        <button
                            className={`py-2 px-4 bg-white text-customBlue rounded-full text-xl font-bold ${isNewestActive ? 'opacity-100' : 'opacity-60'}`}
                            onClick={newestReviews}>
                            Mới nhất
                        </button>
                        <button
                            className={`py-2 px-8 bg-white text-customBlue rounded-full text-xl font-bold ${isNewestActive ? 'opacity-60' : 'opacity-100'}`}
                            onClick={() => {
                                setFilteredReview([]);
                                setIsNewestActive(false);
                            }}>
                            Tất cả
                        </button>
                    </div>

                    <div>
                        {(filteredReview.length > 0 ? filteredReview : mentor.reviews).map((review) => (
                            <div key={review.id} className="py-4 flex space-x-4 flex-row">
                                <div className="avatar h-fit">
                                    <div className="bg-base-200 rounded-full">
                                        <FaUser size={30} />
                                    </div>
                                </div>

                                <div className="flex flex-col w-full">
                                    <div className="flex justify-between">
                                        <div className="flex space-x-2">
                                            <h3 className="font-semibold text-customBlue">{review.name}</h3>
                                            <p className="text-yellow-500">{"⭐".repeat(review.rating)}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-400">{review.date}</p>
                                        </div>
                                    </div>

                                    <p className="text-customBlue">{review.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
