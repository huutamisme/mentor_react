import './index.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from '../../components/slickBtn';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from "react";

const AboutPage = () => {
    const settings = {
        dots: false,
        infinite: true,
        draggable: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <NextArrow right={10} />,
        prevArrow: <PrevArrow left={10} />,
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
        ],
    };

    const problems = [
        "Sinh viên, những người mới ra trường (Fresher) không có Mentor định hướng",
        "Những người ít kinh nghiệm khó kết nối với các chuyên gia",
        "Doanh nghiệp tốn nhiều thời gian và tiềm lực khi tuyển dụng"
    ];

    const resources = [
        {
            img: "/key_resources/NhuNgoc.jpg",
            name: "NHƯ NGỌC",
            career: "CEO",
        },
        {
            img: "/key_resources/GiaHuy.jpg",
            name: "GIA HUY",
            career: "CMO",
        },
        {
            img: "/key_resources/HongAn.jpg",
            name: "HỒNG ÂN",
            career: "COO",
        },
        {
            img: "/key_resources/ThienPhu.jpg",
            name: "THIÊN PHÚ",
            career: "CTO",
        },
        {
            img: "/key_resources/ToQuynh.jpg",
            name: "TỐ QUỲNH",
            career: "CPO",
        },
        {
            img: "/key_resources/KimNgoc.jpg",
            name: "KIM NGỌC",
            career: "Content Manager",
        },
        {
            img: "/key_resources/MinhHien.jpg",
            name: "MINH HIỀN",
            career: "Community Manager",
        },
        {
            img: "/key_resources/BaoTrang.jpg",
            name: "BẢO TRANG",
            career: "Customer Manager",
        },
        {
            img: "/key_resources/PhuongNhi.jpg",
            name: "PHƯƠNG NHI",
            career: "recruiment Specialist",
        },
        {
            img: "/key_resources/BaoNghi.jpg",
            name: "BẢO NGHI",
            career: "Sales Manager",
        },
    ];

    const values = [
        "Personalize",
        "Professional",
        "Reliable"
    ];

    // Custom hook to handle Intersection Observer
    const useIntersectionObserver = (ref) => {
        const [isVisible, setIsVisible] = useState(false);

        useEffect(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        setIsVisible(true);
                    }
                },
                { threshold: 0.1 } // Trigger when 10% of the element is visible
            );

            if (ref.current) {
                observer.observe(ref.current);
            }

            return () => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            };
        }, [ref]);

        return isVisible;
    };

    // Animation settings
    const fadeInVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    // References for sections
    const whoAreWeRef = useRef(null);
    const problemsRef = useRef(null);
    const resourcesRef = useRef(null);
    const valuesRef = useRef(null);
    const visionRef = useRef(null);
    const missionRef = useRef(null);

    // Visibility states for each section
    const whoAreWeVisible = useIntersectionObserver(whoAreWeRef);
    const problemsVisible = useIntersectionObserver(problemsRef);
    const resourcesVisible = useIntersectionObserver(resourcesRef);
    const valuesVisible = useIntersectionObserver(valuesRef);
    const visionVisible = useIntersectionObserver(visionRef);
    const missionVisible = useIntersectionObserver(missionRef);

    return (
        <>
            {/* Who are we section */}
            <motion.div
                ref={whoAreWeRef}
                initial="hidden"
                animate={whoAreWeVisible ? "visible" : "hidden"}
                variants={fadeInVariants}
                transition={{ duration: 0.5 }}
                className="flex items-baseline px-10 py-5"
            >
                <span className="text-5xl font-bold mr-4 text-customBlue">Who are we</span>
                <div className="flex-grow border-t-2 border-customBlue"></div>
            </motion.div>
            <motion.p
                initial="hidden"
                animate={whoAreWeVisible ? "visible" : "hidden"}
                variants={fadeInVariants}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-customBlue px-20"
            >
                Mentor là một nền tảng trực tuyến - Website giúp sinh viên,
                những người ít kinh nghiệm được kết nối với các chuyên gia hàng đầu,
                và có uy tín trong ngành. Nền tảng sẽ cung cấp các công cụ và dịch vụ hữu ích giúp người dùng phát triển kỹ năng,
                xác định mục tiêu nghề nghiệp, và tạo cầu nối với những người có chuyên môn ở các doanh nghiệp.
                Thông qua những buổi tư vấn 1-1 với các chuyên gia - mentor,
                người dùng - mentee sẽ được cung cấp giải pháp phát triển nghề nghiệp một cách thiết thực.
            </motion.p>

            {/* Problems section */}
            <motion.div
                ref={problemsRef}
                initial="hidden"
                animate={problemsVisible ? "visible" : "hidden"}
                variants={fadeInVariants}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-baseline mt-5 px-10 py-5"
            >
                <span className="text-5xl font-bold mr-4 text-customBlue">Which problems we solve</span>
                <div className="flex-grow border-t-2 border-customBlue"></div>
            </motion.div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 place-items-center px-16">
                {problems.map((problem, index) => (
                    <motion.div
                        key={index}
                        initial="hidden"
                        animate={problemsVisible ? "visible" : "hidden"}
                        variants={fadeInVariants}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        className='flex items-center bg-customBlue rounded-3xl py-5 px-2 max-w-[250px] min-h-[200px]'
                    >
                        <p className='text-white text-2xl text-center'>{problem}</p>
                    </motion.div>
                ))}
            </div>

            {/* Key resources section */}
            <motion.div
                ref={resourcesRef}
                initial="hidden"
                animate={resourcesVisible ? "visible" : "hidden"}
                variants={fadeInVariants}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-baseline px-10 py-5"
            >
                <span className="text-5xl font-bold mr-4 text-customBlue">Key resources</span>
                <div className="flex-grow border-t-2 border-customBlue"></div>
            </motion.div>
            <motion.div
                ref={resourcesRef}
                initial="hidden"
                animate={resourcesVisible ? "visible" : "hidden"}
                variants={fadeInVariants}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <Slider {...settings}>
                    {resources.map((resource, index) => (
                        <div key={index} className="flex justify-center">
                            <div className="flex flex-col items-center">
                                <div className="avatar">
                                    <div className="w-32 rounded-full zoom-effect">
                                        <img src={resource.img} alt={resource.name} />
                                    </div>
                                </div>
                                <p className="text-secondary">{resource.name}</p>
                                <p>{resource.career}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </motion.div>

            {/* Key values section */}
            <motion.div
                ref={valuesRef}
                initial="hidden"
                animate={valuesVisible ? "visible" : "hidden"}
                variants={fadeInVariants}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-baseline px-10 py-5"
            >
                <span className="text-5xl font-bold mr-4 text-customBlue">Key values</span>
                <div className="flex-grow border-t-2 border-customBlue"></div>
            </motion.div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 place-items-center px-16">
                {values.map((value, index) => (
                    <motion.div
                        key={index}
                        initial="hidden"
                        animate={valuesVisible ? "visible" : "hidden"}
                        variants={fadeInVariants}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className='flex items-center justify-center bg-customBlue rounded-3xl py-5 px-2 min-w-[250px] min-h-[200px]'
                    >
                        <p className='text-white text-2xl text-center'>{value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Our vision section */}
            <motion.div
                ref={visionRef}
                initial="hidden"
                animate={visionVisible ? "visible" : "hidden"}
                variants={fadeInVariants}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex items-baseline px-10 py-5"
            >
                <span className="text-5xl font-bold mr-4 text-customBlue">Our vision</span>
                <div className="flex-grow border-t-2 border-customBlue"></div>
            </motion.div>
            <motion.p
                initial="hidden"
                animate={visionVisible ? "visible" : "hidden"}
                variants={fadeInVariants}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-xl text-customBlue px-20"
            >
                Trở thành nền tảng kết nối chuyên nghiệp,
                nơi những người ít kinh nghiệm được tư vấn chuyên môn và định hướng nghề nghiệp 1-1
                từ những chuyên gia có chuyên môn cao, nổi tiếng trong ngành.
            </motion.p>

            {/* Our mission section */}
            <motion.div
                ref={missionRef}
                initial="hidden"
                animate={missionVisible ? "visible" : "hidden"}
                variants={fadeInVariants}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="flex items-baseline px-10 py-5"
            >
                <span className="text-5xl font-bold mr-4 text-customBlue">Our mission</span>
                <div className="flex-grow border-t-2 border-customBlue"></div>
            </motion.div>
            <motion.p
                initial="hidden"
                animate={missionVisible ? "visible" : "hidden"}
                variants={fadeInVariants}
                transition={{ duration: 0.5, delay: 1 }}
                className="text-xl text-customBlue px-20"
            >
                Kết nối những tài năng trẻ với các chuyên gia có uy tín, cung cấp những công cụ và dịch vụ hữu ích,
                giúp họ đạt được mục tiêu nghề nghiệp và tạo ra giá trị cho xã hội.
            </motion.p>
        </>
    );
};

export default AboutPage;
