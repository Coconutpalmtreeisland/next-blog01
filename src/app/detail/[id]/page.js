import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Link from "next/link";

export default async function Detail(props) {
    console.log(props)

    const db = (await connectDB).db("forum");
    let result = await db.collection("post").findOne({ _id: new ObjectId(props.params.id) });
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