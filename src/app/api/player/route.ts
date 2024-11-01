import User from "@/app/resources/user";
import {NextRequest, NextResponse} from "next/server"; 
import PlayerManager from "@/app/Player";

export async function GET(Request: NextRequest, Response:NextResponse)
{
    const searchParams = Request.nextUrl.searchParams;
    
    let findPlayerID = 0;
    try{
      findPlayerID  = parseFloat(searchParams.get("findPlayerID")!);
    }
    catch(e){
        return NextResponse.json({error: `${e}`}, {status:400});
    } 
    
    const playerManager = PlayerManager.getInstance; 

    const foundPlayer = await playerManager.getPlayerName(findPlayerID); 

    if (foundPlayer === undefined)
    {
        return new NextResponse("Unable to ");
    }

    
}

export async function POST(Request: NextRequest, Response:NextResponse)
{
    return new NextResponse("This route will create a player with the given user information:take in User object return success or failure");
}

export async function PUT(Request: NextRequest, Response:NextResponse)
{
    return new NextResponse("This route will update a players properties:take in properties and return success or failure");
}

export async function DELETE(Request: NextRequest, Response:NextResponse)
{
    return new NextResponse("This route will delete a player:take in playerID and return success or failure");
}