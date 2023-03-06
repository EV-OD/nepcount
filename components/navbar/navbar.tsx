import { useSession, signOut, signIn } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
    const { data: session } = useSession();

    return (
        <nav className="flex justify-between items-center h-16 bg-gradient-to-r from-purple-500 to-indigo-500 text-white relative shadow-sm font-mono" role="navigation">
            <div className="pl-8">
                <a href="/" className="text-2xl font-bold">
                    MyLogo
                </a>
            </div>
            <div className="px-4 cursor-pointer md:hidden">
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </div>
            <div className="pr-8 md:flex hidden">
                {session && (
                    <>
                        <button
                            onClick={() => signOut()}
                            className="px-2 bg-indigo-700 hover:bg-indigo-800 rounded-md"
                        >
                            Logout
                        </button>
                        <Image
                            width={50}
                            height={50}
                            src={session.user.image as string}
                            alt="User"
                            className="rounded-full h-10 w-10 ml-4"
                        />
                    </>
                )}
                {!session && (
                    <button onClick={() => signIn("google")} className="p-4 hover:text-gray-400">
                        Login
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
