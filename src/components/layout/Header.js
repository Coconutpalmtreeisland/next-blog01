import Link from "next/link";

export default function Header() {
    return (
        <header id="header" role="banner">
            <div className='left'>
                <h1 className='logo'>
                    <Link href="/">webs ai</Link>
                </h1>
                <nav className='nav'>
                    <ul>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/list">List</Link>
                        </li>
                        <li>
                            <Link href="/write">Write</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className='right'>
                <ul>
                    <li>
                        <Link href="/login">로그인</Link>
                    </li>
                    <li>
                        <Link href="/Join">회원가입</Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}