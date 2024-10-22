import User from "@/app/resources/user";

export async function GET(request: Request)
{
    return new Response("This route will show all registered players");
}

export async function POST(request: Request)
{
    return new Response("This route will create a player with the given user information:take in User object return success or failure");
}

export async function PUT(request: Request)
{
    return new Response("This route will update a players properties:take in properties and return success or failure");
}

