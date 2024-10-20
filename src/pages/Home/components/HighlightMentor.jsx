import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from '../../../components/slickBtn';
import { NavLink } from "react-router-dom";

const HighlightMentor = ({ right, left }) => {
    const settings = {
        dots: false,
        infinite: true,
        draggable: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow right={right} />,
        prevArrow: <PrevArrow left={left} />,
    };

    const mentors = [
        {
            img: "/MockInterview/AnnaHuynh.png",
            name: "Anna Huỳnh",
            career: "HR executive",
            quote: "Tôi là Anna Huỳnh, đảm nhận vị trí HR Executive tại Công ty TNHH Daiko với 5 năm kinh nghiệm. Tôi đã đồng hành cùng nhiều ứng viên, đặc biệt là các bạn trẻ có đam mê với lĩnh vực Digital Marketing và Content Creation...",
            url: "/services/mock/1",
            booking: "/services/book/mock/1"
        },
        {
            img: "/CareerAdvise/MinhMan.png",
            name: "Minh Mẫn",
            career: "Senior Marketing Manager",
            quote: "Tôi là Minh Mẫn, là một Senior Marketing Manager với hơn 7 năm kinh nghiệm làm việc tại các công ty đa quốc gia và doanh nghiệp khởi nghiệp. Nổi bật với sự sáng tạo trong tư duy chiến lược, khả năng lãnh đạo và chuyên môn sâu rộng về Digital Marketing...",
            url: "/services/career/1",
            booking: "/services/book/career/1"
        },
        {
            img: "/ProjectAdvise/DavidNguyen.png",
            name: "David Nguyễn",
            career: "Brand Manager",
            quote: "Với hơn 10 năm kinh nghiệm dày dạn trong lĩnh vực quản lý thương hiệu và đồng hành cùng nhiều startup thành công. Tôi đã có cơ hội làm việc với các thương hiệu lớn nhỏ, từ giai đoạn xây dựng thương hiệu ban đầu cho đến khi trở thành những cái tên được nhiều người biết đến...",
            url: "/services/project/1",
            booking: "/services/book/project/1"
        }
    ]

    return (
        <div className="mx-auto md:mt-6">
            <Slider {...settings}>
                {mentors.map((mentor, index) => (
                    <div key={index}>
                        <div className="grid grid-cols-2 min-h-screen relative">
                            {/* Left Column */}
                            <div className="bg-background flex flex-col items-start justify-center p-10 z-10 space-y-4">
                                <h1 className="text-5xl font-semibold">{mentor.name}</h1>
                                <p className="text-3xl">{mentor.career}</p>
                                <p className="whitespace-normal break-words">
                                    {mentor.quote}
                                </p>
                                <div className="flex md:flex-row flex-col gap-4">
                                    <NavLink to={mentor.url} className="px-8 py-2 bg-customBlue text-background rounded-full text-lg md:text-2xl font-bold">
                                        Learn More
                                    </NavLink>
                                    <NavLink to={mentor.booking} className="px-8 py-2 bg-customBlue text-background rounded-full text-lg md:text-2xl font-bold">
                                        Book Now
                                    </NavLink>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col relative">

                                <div className="bg-customBlue h-4/5" />
                                <div className="bg-background h-1/5" />
                                <img
                                    alt="mentor avatar"
                                    src={mentor.img}
                                    className="absolute top-10 -left-10 object-contain h-full z-20"
                                />
                            </div>


                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );

};


export default HighlightMentor;