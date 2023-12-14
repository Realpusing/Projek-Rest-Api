import { Link } from "@inertiajs/react";

const Navbar = ({ user, toggleSidebar }) => {
    
    return (
        <nav>
            <div
                className="navbar bg-base-100"
                style={{ backgroundColor: "navy", color: "white" }}
            >
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">
                        <div className="w-10 rounded-full">
                            <img src="asett/sadhar.png" />
                        </div>
                    </a>
                    <div>
                        <h1>
                            <b>Informatika</b>
                        </h1>
                        <h1>Fakultas Sains Dan Teknologi</h1>
                    </div>
                </div>

                <div className="dropdown dropdown-end">
                    <label
                        tabIndex={0}
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full">
                            <img src="asett/man.png" />
                        </div>
                    </label>
                    <ul
                        tabIndex={0}
                        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                    >
                        {!user ? (
                            <>
                                <li>
                                    <Link href={route("login")} as="button">
                                        Edit Profile
                                    </Link>
                                </li>
                                <li>
                                <Link href={route("register")} as="button">
                                    Register
                                </Link>
                            </li>
                                <li>
                                    <Link>Bantuan</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        href={route("dashboard")}
                                        as="button"
                                        className="justify-between"
                                    >
                                        Dashboard
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link>Settings</Link>
                                </li>
                                <li>
                                    <Link>Bantuan</Link>
                                </li>
                                <li>
                                    <Link href="/logout" method="post">Logout</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;