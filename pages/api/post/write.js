import { connectDB } from "@/util/database";

export default async function handler(req, res) {
    if (req.method === "POST") {
        // console.log(req.body);

        try {
            const db = (await connectDB).db("forum");
            let result = await db.collection("post").insertOne(req.body);
            return res.status(200).redirect("/list");
        } catch (err) {
            console.log(err);
        }
    }
}