import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MockInterview from './components/MockInterview';
import CareerAdvise from './components/CareerAdvise';
import ProjectAdvise from './components/ProjectAdvise';

const tabsData = [
    { id: 1, title: 'Phỏng vấn giả định', content: 'MockInterview' },
    { id: 2, title: 'Tư vấn nghề nghiệp', content: 'CareerAdvise' },
    { id: 3, title: 'Tư vấn hỗ trợ dự án', content: 'ProjectAdvise' }
];

const TabComponent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(tabsData[0].id);
    const lineRef = useRef(null);
    const activeTabRef = useRef(null);

    // Cuộn lên đầu trang khi component được render
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const updateLinePosition = () => {
            const tabActiveElement = activeTabRef.current;
            if (tabActiveElement && lineRef.current) {
                lineRef.current.style.width = `${tabActiveElement.offsetWidth}px`;
                lineRef.current.style.left = `${tabActiveElement.offsetLeft}px`;
            }
        };

        updateLinePosition();
        window.addEventListener('resize', updateLinePosition); // Cập nhật khi kích thước cửa sổ thay đổi

        return () => {
            window.removeEventListener('resize', updateLinePosition); // Dọn dẹp event listener
        };
    }, [activeTab]);

    // Lấy trạng thái tab từ URL
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabId = urlParams.get('tab');
        if (tabId) {
            setActiveTab(parseInt(tabId));
            activeTabRef.current = document.getElementById(`tab-${tabId}`);
        } else {
            setActiveTab(tabsData[0].id); // Đặt mặc định nếu không có giá trị tab
            activeTabRef.current = document.getElementById(`tab-${tabsData[0].id}`);
        }
    }, [location.search]);

    const [selectedValues, setSelectedValues] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [sliderValue, setSliderValue] = useState(1000000);

    const experienceOptions = [
        { id: 1, label: '1 - 3 năm', value: '1 - 3 năm' },
        { id: 2, label: '3 - 5 năm', value: '3 - 5 năm' },
        { id: 3, label: '5 - 10 năm', value: '5 - 10 năm' },
        { id: 4, label: '10+ năm', value: '10+ năm' },
    ];

    const skillsOptions = [
        { id: 1, label: 'Strategic Planning', value: 'Strategic Planning' },
        { id: 2, label: 'Brand Management', value: 'Brand Management' },
        { id: 3, label: 'Digital Marketing', value: 'Digital Marketing' },
        { id: 4, label: 'Crisis Communication', value: 'Crisis Communication' },
        { id: 5, label: 'Public Relations', value: 'Public Relations' },
        { id: 6, label: 'Market Research', value: 'Market Research' },
        { id: 7, label: 'Social Media Management', value: 'Social Media Management' },
        { id: 8, label: 'Content Creation', value: 'Content Creation' },
        { id: 9, label: 'Analytics', value: 'Analytics' },
        { id: 10, label: 'Copywriting', value: 'Copywriting' },
        { id: 11, label: 'Project Management', value: 'Project Management' },
        { id: 12, label: 'Leadership', value: 'Leadership' },
        { id: 13, label: 'Negotiation', value: 'Negotiation' },
        { id: 14, label: 'Creativity', value: 'Creativity' },
        { id: 15, label: 'Recruitment', value: 'Recruitment' },
    ];

    const handleExpCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedValues([...selectedValues, value]);
        } else {
            setSelectedValues(selectedValues.filter((v) => v !== value));
        }
    };

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedSkills([...selectedSkills, value]);
        } else {
            setSelectedSkills(selectedSkills.filter((v) => v !== value));
        }
    };

    const handleSliderChange = (event) => {
        setSliderValue(event.target.value);
    };

    const renderTabContent = () => {
        switch (tabsData.find(tab => tab.id === activeTab)?.content) {
            case 'MockInterview':
                return <MockInterview experience={selectedValues} skills={selectedSkills} pricing={sliderValue} activeTab={activeTab} />;
            case 'CareerAdvise':
                return <CareerAdvise experience={selectedValues} skills={selectedSkills} pricing={sliderValue} activeTab={activeTab} />;
            case 'ProjectAdvise':
                return <ProjectAdvise experience={selectedValues} skills={selectedSkills} pricing={sliderValue} activeTab={activeTab} />;
            default:
                return null;
        }
    };

    return (
        <>
            <div className="flex flex-col items-center pt-10 bg-background border-t-2">
                <div className="relative">
                    { /* Chỉ hiển thị lineRef khi không phải là màn hình sm */}
                    <div
                        ref={lineRef}
                        className={`absolute bottom-0 left-0 h-1 bg-customBlue duration-200 ${window.innerWidth < 640 ? 'hidden' : ''}`}
                    />
                    <div className='grid grid-cols-1 md:grid-cols-3 place-items-center gap-5 px-10 border-b-2'>
                        {tabsData.map((tab) => (
                            <div
                                key={tab.id}
                                className={`cursor-pointer text-lg md:text-2xl text-customBlue py-4 ${activeTab === tab.id ? 'opacity-100' : 'opacity-60'}`}
                                onClick={() => {
                                    setActiveTab(tab.id);
                                    navigate(`?tab=${tab.id}`);
                                    activeTabRef.current = document.getElementById(`tab-${tab.id}`);
                                }}
                                id={`tab-${tab.id}`}
                            >
                                <div>{tab.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-8 flex flex-col md:flex-row bg-background">
                <div className='w-full md:w-1/4'>
                    <div className="rounded-3xl p-2 bg-white shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Kinh nghiệm</h2>
                        <div className="grid grid-cols-2 gap-2">
                            {experienceOptions.map((option) => (
                                <div key={option.id} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={`experience-${option.id}`}
                                        value={option.value}
                                        checked={selectedValues.includes(option.value)}
                                        onChange={handleExpCheckboxChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`experience-${option.id}`}>{option.label}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl p-2 bg-white shadow-lg mt-4">
                        <h2 className="text-xl font-bold mb-4">Skills</h2>
                        <div className="grid grid-cols-2 gap-2">
                            {skillsOptions.map((option) => (
                                <div key={option.id} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={`skills-${option.id}`}
                                        value={option.value}
                                        checked={selectedSkills.includes(option.value)}
                                        onChange={handleCheckboxChange}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`skills-${option.id}`}>{option.label}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl p-2 bg-white shadow-lg mt-4">
                        <h2 className="text-xl font-bold mb-4">Mức phí</h2>
                        <div className="flex items-center">
                            <input
                                type="range"
                                min={200000}
                                max={1000000}
                                step={50000}
                                value={sliderValue}
                                onChange={handleSliderChange}
                                className="range"
                            />
                            <span className="ml-4">{sliderValue.toLocaleString('vi-vn')}</span>
                        </div>
                    </div>
                </div>

                <div className='w-full md:w-3/4 flex justify-center mt-4 md:mt-0'>
                    {renderTabContent()}
                </div>
            </div>
        </>
    );
};

export default TabComponent;
