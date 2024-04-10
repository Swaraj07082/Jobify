import {NextResponse} from 'next/server'
export const GET = async(req, res)=>{

return new NextResponse(
    JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
);

}