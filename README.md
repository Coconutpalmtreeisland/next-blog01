# next.js vs react.js

- SSR(Server Side Rendering)
SSR은 서버에서 사용자의 요청에 대한 결과를 HTML로 변환하여 클라이언트에 보내주는 방식입니다. 이 방식은 초기 로딩 속도가 빠르고, SEO(Search Engine Optimization)에 유리하다는 장점이 있습니다. 단점은 사용자의 각 요청마다 서버에서 렌더링을 해야 하기 때문에 서버 부하가 클 수 있습니다.

- CSR(Client Side Rendering)
CSR은 클라이언트 측에서 JavaScript를 이용해 렌더링하는 방식입니다. 이 방식은 서버 부하가 적고, 사용자의 인터랙션에 따른 화면 변경이 빠르다는 장점이 있습니다. 단점은 초기 로딩 시간이 길고, SEO에 약점이 있다는 점입니다.

- React.js
React.js는 Facebook에서 개발한 사용자 인터페이스를 구축하는 JavaScript 라이브러리입니다. React.js는 CSR 방식을 주로 사용하는데, 이로 인해 초기 로딩 속도와 SEO 문제를 가지고 있습니다.

- Next.js
Next.js는 React의 이러한 단점을 보완한 프레임워크입니다. Next.js는 SSR을 지원하므로 초기 로딩 속도를 개선하고 SEO 문제를 해결할 수 있습니다. 또한, Next.js는 Static Site Generation(SSG)과 Incremental Static Regeneration(ISR) 같은 기능을 추가로 제공하여 성능과 효율성을 더욱 높일 수 있습니다.

따라서, Next.js는 React.js의 SSR과 SEO 문제를 해결하고, 추가적인 기능을 제공하여 더 효율적인 웹 애플리케이션 개발이 가능하게 합니다.

`npx create-next-app@latest .`

√ Would you like to use TypeScript? ... `No` / Yes
√ Would you like to use ESLint? ... No / `Yes`
√ Would you like to use Tailwind CSS? ... `No` / Yes
√ Would you like to use `src/` directory? ... No / `Yes`
√ Would you like to use App Router? (recommended) ... No / `Yes`
√ Would you like to customize the default import alias (@/*)? ... No / `Yes`     
√ What import alias would you like configured? ... @/*

`npm insatll mongodb`
`npm insatll sass`

## 초기화

- globlas.scss
```javascript
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```
- layout.js
```javascript
import './globals.scss'


export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}

```
- page.js
```javascript
export default function Home() {
  return (
    <main>
      d
    </main>
  )
}
```
- page.module.css: 내용 비움

## app폴더 안에 list 폴더
- page.js
```javascript
import { connectDB } from "@/util/database"

export default async function List() {

    const db = (await connectDB).db("forum");
    let result = await db.collection("post").find().toArray();
    console.log(result) // db 내용 가져옴

    return (
        <div>List</div>
    )
}
```
## src 폴더 안에 components 폴더 안에 layout 폴더
- Header.js
```javascript
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
```

- layout.js에 Header.js 추가 &globlas.scss 삭제 simple600 assets 폴더 복사 style.scss 연동
```javascript
import Header from '@/components/layout/Header'
import '../app/assets/scss/style.scss'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
```
## list 폴더 page.js db내용 뿌리기
```javascript
import { connectDB } from "@/util/database"

export default async function List() {

    const db = (await connectDB).db("forum");
    let result = await db.collection("post").find().toArray();
    console.log(result)

    return (
        <div className="list__wrap">
            {result.map((list, key) => (
                <div className="list" key={key}>
                    <span className="cate">교육</span>
                    <h3 className="title">{list.title}</h3>
                    <p className="desc">{list.content}</p>
                    <div className="auth">잉크</div>
                </div>
            ))}
        </div>
    )
}
```

다이나믹로우터 -> 폴더가 주소
## 서버단 셋팅: 가장 바깥에 pages 폴더 안에 api 폴더 안에 post 폴더
- write.js
```javascript
import { connectDB } from "@/util/database";

export default async function handler(req, res) {
    if (req.method === "POST") {
        // console.log(req.body);

        try {
            const db = (await connectDB).db("forum");
            let result = await db.collection("post").insertOne(req.body);
            return res.status(200).json({ success: true }).redirect("/list");
        } catch (err) {
            console.log(err);
        }
    }
}
```

## write 폴더
- write.js
```javascript
export default function Write() {
    return (
        <div className='login__wrap'>
            <div className="login__header">
                <h3>Write</h3>
                <p>글을 작성하시겠습니까?</p>
            </div>
            <form action="/api/post/write" method="POST" className='login__form'> {/*서버에 보내기*/}
                <fieldset>
                    <legend className="blind">글쓰기 영역</legend>
                    <div>
                        <label htmlFor="youName" className="required blind">글 제목</label>
                        <input type="text" name="title" id="youName" placeholder='글 제목을 작성하세요!'
                        />
                    </div>
                    <div>
                        <label htmlFor="youConts" className="required blind">글 내용</label>
                        <textarea name="contents" id="youConts" placeholder='글 내용을 작성하세요!'
                        />
                    </div>
                    <button type="submit" className="btn__style2 mt30">글쓰기</button>
                </fieldset>
            </form>
        </div>
    )
}
```

## list 폴더
- page.js
```javascript
import { connectDB } from "@/util/database"
import Link from "next/link";

export default async function List() {

    const db = (await connectDB).db("forum");
    let result = await db.collection("post").find().toArray();
    // console.log(result)

    return (
        <div className="list__wrap">
            {result.map((list, key) => (
                <div className="list" key={key}>
                    <span className="cate">교육</span>
                    <Link href={`/detail/${list._id}`}><h3 className="title">{list.title}</h3></Link> {/* _id값 가져오기 */}
                    <p className="desc">{list.content}</p>
                    <div className="auth">잉크</div>
                </div>
            ))}
        </div>
    )
}
```

## detail 폴더 안에 [id] 폴더 - 상세페이지마다 id 값이 달라서?
- page.js
```javascript
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Link from "next/link";

export default async function Detail(props) {
    // console.log(props); props는 Next.js의 페이지 동적 라우팅 기능임. 이동된 URL 주소를 id 변수에 담아 props.params.id로 전달

    const db = (await connectDB).db("forum");
    let result = await db.collection("post").findOne({ _id: new ObjectId(props.params.id) }) ;  // mongodb _id필드는 ObjectId라는 데이터 타입을 사용함. URL에서 받아온 id값을 ObjectId 타입으로 변환하여 mongodb에서 해당 _id를 가진 문서를 찾음
    console.log(result);

    return (
        <div className='detail__wrap'>
            <div className='detail__title'>
                <h3>{result.title}</h3>
                <span className='auth'>잉크</span>
            </div>
            <div className='detail__content'>
                {result.content}
            </div>
            <div className='detail__btn'>
                <Link href="/">수정</Link>
                <button>삭제</button>
                <Link href='/list'>목록</Link>
            </div>
        </div>
    )
}
```