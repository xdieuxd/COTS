import { faFileInvoice, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet, Link, NavLink } from "react-router-dom";

const User = () => {
    return (
        <div className="w-full min-h-screen pt-8 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
            <div className="w-6xl mx-auto grid grid-cols-12 gap-4">
                <div className="col-span-2">
                    <div className="flex items-center gap-2 p-3 font-semibold border-b border-gray-200">
                        <div className="p-3 border border-gray-300 rounded-full text-gray-900 dark:text-white ">
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <span>Nguyễn Đắc Hải</span>
                    </div>

                    <div className="flex flex-col p-3">
                        <NavLink to='profile'
                            className={({ isActive }) =>
                                `flex items-center gap-2 mb-2 ${isActive ? "underline font-semibold" : "hover:-translate-y-1 transition-all duration-300"
                                }`
                            }
                        >
                            <FontAwesomeIcon icon={faUser} />
                            <span>Hồ sơ của tôi</span>
                        </NavLink>

                        <NavLink to='orders'
                            className={({ isActive }) =>
                                `flex items-center gap-2 mb-2 ${isActive ? "underline font-semibold" : "hover:-translate-y-1 transition-all duration-300"
                                }`
                            }
                        >
                            <FontAwesomeIcon icon={faFileInvoice} />
                            <span>Đơn mua</span>
                        </NavLink>
                    </div>
                </div>
                <div className="col-span-10">
                    <Outlet />
                </div>
            </div>


        </div>
    );
}

export default User;