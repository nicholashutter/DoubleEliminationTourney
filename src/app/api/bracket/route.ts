  /* 
       create users - done
       join users to room - done
       start match - done
       start loop - done
       start round - done
       select players - done
       select winner - done 
       end round - done
       update players - done
       end loop - done
       end match - done
       update players - done
   */

/*
    create room, store room code
    loop
        create users 32
        join to room 
    end loop 
    start match
    start loop
        start round
        select winner
        end round
    end match
    end loop
*/
  
  export async function GET(request:Request) {
    return new Response("This route will show all available brackets");
  }

  export async function PUT(request:Request) {
    return new Response("This route will edit bracket rules: take in bracketOptions object and return success or failure");
  }

  export async function POST(request:Request) {
    return new Response("This route will create new bracket and add authed user to bracket:take in userID and it should return roomCode");
  }

  export async function DELETE(request:Request) {
    return new Response("This route will delete a user from a bracket: take in userID and bracketID return success or failure");
  }