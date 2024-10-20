import Banner from "./components/Banner";
import HighlightMentor from "./components/HighlightMentor";
import ChatBubble from "./components/ChatBubble";
import { useEffect, useRef, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function HomePage() {
    const cookieModalRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // useEffect(() => {
    //     // Hiển thị modal thông báo về cookie khi trang vừa render
    //     if (cookieModalRef.current) {
    //         cookieModalRef.current.showModal();
    //     }
    // }, []);

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phone: Yup.string()
            .required('Phone is required')
            .matches(/^[0-9]+$/, 'Phone must be only numbers')
            .min(10, 'Phone number must be at least 10 digits'),
        resume: Yup.string().required('Resume link is required'),
        message: Yup.string().required('Message is required'),
    });

    // Formik setup
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            resume: '',
            message: '',
        },
        validationSchema,
        onSubmit: (values) => {
            setIsModalOpen(false);
            console.log('Form values', values);
            // Handle form submission here (e.g., send data to server)
        },
    });

    // Hàm đóng modal và reset form
    const closeModal = () => {
        document.getElementById('my_modal_1').close();
        setIsModalOpen(false);
        formik.resetForm(); // Reset formik
    }

    const steps = [
        "Chọn dịch vụ <br /> mình cần",
        "Chọn mentor <br /> theo tiêu chí của <br /> bản thân",
        "Đặt lịch hẹn <br /> và tham gia tư <br /> vấn với mentor <br />phù hợp"
    ];

    return (
        <>
            <div className={`relative ${isModalOpen ? 'blur-sm' : ''}`}>
                <div className="flex flex-col bg-customBlue justify-center items-center p-4 gap-4">
                    <div className="text-white text-6xl font-bold">
                        Nơi Newbie được kết nối trực tiếp với Mentor
                    </div>
                    <button
                        className="px-4 py-2 bg-white text-customBlue rounded-full text-2xl font-bold"
                        onClick={() => {
                            document.getElementById('my_modal_1').showModal();
                            setIsModalOpen(true);
                        }}
                    >
                        Đăng ký ngay
                    </button>
                </div>
                <video className="w-full" loop autoPlay muted>
                    <source src="video.mp4" type="video/mp4" />
                </video>
                <Banner right={10} left={10} />
                <HighlightMentor right={10} left={10} />
                <div className="bg-customBlue py-20">
                    <p className="text-5xl md:text-7xl text-center text-white text-shadow-custom mb-10">HOW TO USE</p>
                    <div className="grid grid-cols-1 space-y-4 md:grid-cols-3 place-items-center ">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center justify-start bg-background rounded-3xl text-customBlue min-h-[300px] px-5">
                                <p className="text-5xl">{index + 1}</p>
                                <p
                                    className="border-2 border-blue-300 px-10 text-3xl rounded-3xl text-center flex items-center justify-center font-semibold min-h-[200px] min-w-[280px]"
                                    dangerouslySetInnerHTML={{ __html: step }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <ChatBubble />
            </div>

            {/* Modal thông báo về cookie */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            )}

            {/* Toast */}
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            {/* Modal thông báo về cookie */}
            <dialog ref={cookieModalRef} id="cookie_modal" className="modal">
                <div className="bg-gradient-custom w-2/3 p-5 rounded-xl">
                    <p className="text-3xl text-white font-bold">
                        Chúng tôi sử dụng Cookie để nâng cao trải nghiệm của bạn trên nền tảng Mentor.
                        Cookie giúp chúng tôi cá nhân hóa nội dung, phân tích hành vi người dùng và cải thiện hiệu quả của các dịch vụ.
                        Bạn có thể quản lý cài đặt Cookie của mình thông qua trình duyệt.
                        Bằng cách tiếp tục sử dụng nền tảng Mentor, bạn đồng ý với việc chúng tôi sử dụng Cookie.
                    </p>
                    <div className="flex justify-center py-5 space-x-4">
                        <button className="btn bg-blue-500 text-white w-32" onClick={() => {
                            cookieModalRef.current.close();
                            setIsModalOpen(false); // Cập nhật lại state khi modal đóng
                        }}>Chấp nhận</button>
                        <button className="btn w-32" onClick={() => {
                            cookieModalRef.current.close();
                            setIsModalOpen(false); // Cập nhật lại state khi modal đóng
                        }}>Từ chối</button>
                    </div>
                </div>
            </dialog>


            {/* Modal để gửi thông tin */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box bg-gradient-custom">
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();

                            formik.handleSubmit();

                            if (formik.isValid && formik.dirty) {
                                toast.success('Form submitted successfully!');
                                closeModal();
                            }
                        }}
                        className="space-y-4"
                    >

                        <p className="text-3xl text-white font-bold">Contact us</p>

                        {/* Name */}
                        <div className={`grid grid-cols-3 gap-4 w-full p-2 rounded-full text-customBlue font-semibold items-center bg-white border ${formik.touched.name && formik.errors.name ? 'border-red-500 border-4' : 'border-gray-300'}`}>
                            <label htmlFor="name" className="block text-xl col-span-1">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Write Your Name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                className="col-span-2 border-none focus:outline-none"
                            />
                        </div>
                        {formik.touched.name && formik.errors.name ? (
                            <div className="text-red-500 text-lg text-center">{formik.errors.name}</div>
                        ) : null}

                        {/* Email */}
                        <div className={`grid grid-cols-3 gap-4 w-full p-2 rounded-full text-customBlue font-semibold items-center bg-white border ${formik.touched.email && formik.errors.email ? 'border-red-500 border-4' : 'border-gray-300'}`}>
                            <label htmlFor="email" className="block text-xl col-span-1">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Write Your Email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className="col-span-2 border-none focus:outline-none"
                            />
                        </div>
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-lg text-center">{formik.errors.email}</div>
                        ) : null}

                        {/* Phone */}
                        <div className={`grid grid-cols-3 gap-4 w-full p-2 rounded-full text-customBlue font-semibold items-center bg-white border ${formik.touched.phone && formik.errors.phone ? 'border-red-500 border-4' : 'border-gray-300'}`}>
                            <label htmlFor="phone" className="block text-xl col-span-1">Phone</label>
                            <input
                                id="phone"
                                name="phone"
                                type="text"
                                placeholder="Write Your Phone Number"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                                className="col-span-2 border-none focus:outline-none"
                            />
                        </div>
                        {formik.touched.phone && formik.errors.phone ? (
                            <div className="text-red-500 text-lg text-center">{formik.errors.phone}</div>
                        ) : null}

                        {/* Resume Link */}
                        <div className={`grid grid-cols-3 gap-4 w-full p-2 rounded-full text-customBlue font-semibold items-center bg-white border ${formik.touched.resume && formik.errors.resume ? 'border-red-500 border-4' : 'border-gray-300'}`}>
                            <label htmlFor="resume" className="block text-xl col-span-1">Resume</label>
                            <input
                                id="resume"
                                name="resume"
                                type="text"
                                placeholder="Link To Your Resume"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.resume}
                                className="col-span-2 border-none focus:outline-none"
                            />
                        </div>
                        {formik.touched.resume && formik.errors.resume ? (
                            <div className="text-red-500 text-lg text-center">{formik.errors.resume}</div>
                        ) : null}

                        {/* Message */}
                        <div className={`grid grid-cols-3 gap-4 w-full p-2 rounded-full text-customBlue font-semibold items-center bg-white border ${formik.touched.message && formik.errors.message ? 'border-red-500 border-4' : 'border-gray-300'}`}>
                            <label htmlFor="message" className="block text-xl col-span-1">Message</label>
                            <input
                                id="message"
                                name="message"
                                placeholder="Write Your Message"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.message}
                                className="col-span-2 border-none focus:outline-none"
                            />
                        </div>
                        {formik.touched.message && formik.errors.message ? (
                            <div className="text-red-500 text-lg text-center">{formik.errors.message}</div>
                        ) : null}

                        {/* Submit button */}
                        <div className="modal-action">
                            <button type="submit" className="btn bg-blue-500 text-white">
                                Submit
                            </button>
                            <button type="button" className="btn" onClick={closeModal}>Close</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
}
