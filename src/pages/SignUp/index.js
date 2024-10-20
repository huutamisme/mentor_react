import { FaGoogle, FaFacebook } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function SignUp() {
    return (
        <div className="flex items-center justify-center bg-background min-h-screen" style={{ fontFamily: 'EB Garamond' }}>
            <motion.div className="p-8 max-w-sm w-full text-center shadow-lg"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
            >
                {/* Title */}
                <h2 className="text-6xl font-semibold text-gray-800 mb-8">Sign Up</h2>

                {/* Call to action for sign up */}
                <p className="my-6 text-gray-600 text-xl">
                    Already a member?{" "}
                    <NavLink to="/login" className="text-blue-600 hover:underline">
                        Log In
                    </NavLink>
                </p>

                {/* Google Sign Up */}
                <button className="flex items-center justify-start w-full p-3 bg-red-500 text-white mb-4 hover:bg-red-600 transition">
                    <FaGoogle className="mr-16 text-2xl" /> Sign up with Google
                </button>

                {/* Facebook Sign Up */}
                <button className="flex items-center justify-start w-full p-3 bg-blue-600 text-white mb-4 hover:bg-blue-700 transition">
                    <FaFacebook className="mr-16 text-2xl" /> Sign up with Facebook
                </button>

                {/* Divider */}
                <div className="relative flex py-3 items-center mb-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="flex-shrink mx-4 text-gray-400">or</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Sign Up with Email */}
                <button className="w-full py-3 bg-backround border border-black text-black hover:bg-gray-100 transition">
                    Sign up with Email
                </button>
            </motion.div>
        </div>
    );
}
