import {NextRequest} from "next/server";
import jwt from "jsonwebtoken";


export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || ""
        const decodedToken :any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
        return decodedToken.id;

    } catch (error) {
        console.log(error);
        throw new Error("Error getting data from token");
    }
}