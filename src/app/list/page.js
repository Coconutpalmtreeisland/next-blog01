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
                    <Link href={`/detail/${list._id}`}><h3 className="title">{list.title}</h3></Link>
                    <p className="desc">{list.content}</p>
                    <div className="auth">잉크</div>
                </div>
            ))}
        </div>
    )
}