
import User from "@/app/resources/user";
import playerManager from "@/app/player";
import crypto from "crypto";

/* Use the below logical flow to write the rest of the api routes for the bracket*/

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
    update players
    end match
    end loop
    update players
*/

type Seed = number;
type UserID = number;
type matchType = "single" | "double" | "default";
type winner =
    {
        player1: number,
        player2: number,
        currentVotes: number,
    }
/*
Run the bracket and update users
*/
export class Bracket
{

    private player1: number;

    private player2: number;
    private playerManager: playerManager;
    private isRunning: boolean;
    private winner: winner;
    private roomCode:string;
    private totalByes:number;
    private numOfPlayers:number;
    private users: Map<UserID, Seed>;
    private usersHavePlayed: Map<UserID, Seed>;
    private currentRound:number;
    private finalRound:number;
    private matchType: matchType;
    private fault: number;

    constructor()
    {
        const generateRoomCode = () =>
        {
            const salt = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            let returnValue = '';
            for (let i = 0; i < 2; i++)
            {
                returnValue += salt[crypto.randomInt(salt.length)];
            }

            for (let i = 0; i < 3; i++)
            {
                returnValue += crypto.randomInt(10).toString();
            }

            returnValue += salt[crypto.randomInt(salt.length)];

            return returnValue;
        }

        this.isRunning = false;
        this.users = new Map();
        this.usersHavePlayed = new Map();
        this.winner = {
            player1: 0,
            player2: 0,
            currentVotes: 0,
        }

        this.roomCode = generateRoomCode();
        this.playerManager = playerManager.getInstance;
        this.player1 = -1;
        this.player2 = -1;
        this.totalByes = -1;
        this.numOfPlayers = -1;
        this.currentRound = -1;
        this.finalRound = -1;
        this.matchType = "default";
        this.fault = -1;
    }
    get getBracketSize()
    {

        const currentPlayers = this.users
        return currentPlayers.size;
    }
    get getRoomCode()
    {
        return this.roomCode;
    }
    get getIsRunning()
    {
        const localIsRunning = this.isRunning;
        return localIsRunning;
    }
    get getPlayer1()
    {
        return this.player1;
    }
    get getPlayer2()
    {
        return this.player2;
    }
    async joinBracket(playerID: number)
    {

        this.playerManager.setInGame(playerID, true);

        //  await db.updateUser(currentPlayer.getPlayerID);
        this.users.set(playerID, this.generateSeed(this.users.size));


    }
    async leaveBracket(playerID: number)
    {

        this.users.delete(playerID);
        //(playerManager.setInGame(playerID,false))
        // await this.playerManager.updatePlayer(currentPlayer);
        // await db.updateUser(currentPlayer.getPlayerID);

    }
    private generateSeed = (count: number) =>
    {
        const randomID = Math.floor(Math.random() * 1000) + Date.now();

        this.users.forEach((seed) =>
        {
            if (seed == randomID)
            {
                if (count > 1000)
                {
                    throw new Error("RandomID could not be generated. Fatal. Err 101");
                }
                this.generateSeed(count + 1);
            }
        })

        return randomID;
    }
    private setSinglesByes()
    { //called by startSinglesRound 
        //modifys this.totalByes and this.numOfPlayers
        if (this.numOfPlayers < 2)
        {
            console.log("Unable to begin tournament with less than two players. Err 003");
        }
        else if (this.numOfPlayers < 3)
        {
            this.totalByes = 2 - this.numOfPlayers;
            this.numOfPlayers = 2
            /* 
            log base 2 of N 
            or what power of 2 gives N 
            1 round as much as 1 bye
            */
            this.finalRound = 1;
        }
        else if (this.numOfPlayers < 5)
        {
            this.totalByes = 4 - this.numOfPlayers;
            this.numOfPlayers = 4;
            this.finalRound = 2;

        }
        else if (this.numOfPlayers < 9)
        {
            this.totalByes = 8 - this.numOfPlayers;
            this.numOfPlayers = 8;
            this.finalRound = 3;
        }
        else if (this.numOfPlayers < 17)
        {
            this.totalByes = 16 - this.numOfPlayers;
            this.numOfPlayers = 16;
            this.finalRound = 4;
        }
        else if (this.numOfPlayers < 33)
        {
            this.totalByes = 32 - this.numOfPlayers;
            this.numOfPlayers = 32;
            this.finalRound = 5;
        }
    }
    private setDoubleByes()
    { //called by startSinglesRound 
        //modifys this.totalByes and this.numOfPlayers
        if (this.numOfPlayers < 2)
        {
            console.log("Unable to begin tournament with less than two players. Err 003");
        }
        else if (this.numOfPlayers < 3)
        {
            this.totalByes = 2 - this.numOfPlayers;
            this.numOfPlayers = 2
            /* 
            finalRound should be 2N-2 
            */
            this.finalRound = 2;
        }
        else if (this.numOfPlayers < 5)
        {
            this.totalByes = 4 - this.numOfPlayers;
            this.numOfPlayers = 4;
            this.finalRound = 6;

        }
        else if (this.numOfPlayers < 9)
        {
            this.totalByes = 8 - this.numOfPlayers;
            this.numOfPlayers = 8;
            this.finalRound = 14;
        }
        else if (this.numOfPlayers < 17)
        {
            this.totalByes = 16 - this.numOfPlayers;
            this.numOfPlayers = 16;
            this.finalRound = 30;
        }
        else if (this.numOfPlayers < 33)
        {
            this.totalByes = 32 - this.numOfPlayers;
            this.numOfPlayers = 32;
            this.finalRound = 62;
        }
    }
    private async applyByes()
    {   //This function called by both startSinglesRound and startDoublesRound
        //uses the result from setSinglesByes to apply bye rounds
        for (let i = 0; i < this.totalByes; i++)
        {
            await this.loadPlayers();
        }
    }
    async loadPlayers()
    {
        let player1ID = 0;
        let low = 0;
        const findUser = () =>
        {
            this.users.forEach((userID, seed) =>
            {
                if (low < seed)
                {
                    low = seed;
                    if (low == seed)
                    {

                        try
                        {
                            player1ID = userID;

                            this.usersHavePlayed.set(player1ID, seed);
                        }
                        catch
                        {

                            /* 
                            logic is that hashmap (typescript map class) should require each key to be unique
                            should throw an error when you try to add the same key twice 
                            if you try to pull a user into the game who has already played, you should probably
                            end the round 
                            and quite possibly the match  
                            */
                            console.log("Probably should call endMatch here?");
                        }
                    }
                }

            })
        }
        findUser();

        //we assert that getRound returns a value here because getRound should handle undefined values itself 
        this.playerManager.setCurrentRound(player1ID, (this.playerManager.getCurrentRound(player1ID)! + 1));

        return player1ID;
    }
    async startMatch(matchType: matchType)
    {
        this.matchType = matchType;

        this.isRunning = true;

        this.applyByes();

        switch (matchType)
        {
            case "single":
                this.setSinglesByes();
                break;

            case "double":
                this.setDoubleByes();
                break;

            case "default":
                console.log("Invalid argument for startMatch. Err 037");
                break;
        }

    }
    async startSinglesRound()
    {
        if (this.isRunning === false)
        {
            throw new Error("Failed to initialize isRunning. Bracket either not running or failed to launch Err 041");
        }

        this.matchType = "single";

        this.currentRound = this.currentRound + 1;

        this.numOfPlayers = this.users.size

        const player1ID = await this.loadPlayers();
        const player2ID = await this.loadPlayers();

        this.player1 = player1ID;
        this.player2 = player2ID;

        this.playerManager.setEliminations(this.player1, 0);
        this.playerManager.setEliminations(this.player2, 0);
    }
    async startDoublesRound()
    {
        if (this.isRunning === false)
        {
            throw new Error("Failed to initialize isRunning. Bracket either not running or failed to launch Err 041");
        }

        this.matchType = "double";

        this.currentRound = this.currentRound + 1;

        this.numOfPlayers = this.users.size;


        const player1ID = await this.loadPlayers();
        const player2ID = await this.loadPlayers();


        this.player1 = player1ID;
        this.player2 = player2ID;

    }
    public setCurrentRound(value: number)
    {
        //debug
        this.currentRound = value;
    }
    async selectWinner(winningUserID: number)
    {

        try
        {

            if (this.player1 === winningUserID)
            {
                this.winner.player1 = this.winner.player1 + 1;
                this.winner.currentVotes = this.winner.currentVotes + 1;
            }
            else if (this.player1 === winningUserID)
            {
                this.winner.player2 = this.winner.player2 + 1;
                this.winner.currentVotes = this.winner.currentVotes + 1;
            }
            else
            {
                console.log("Invalid argument");
            }


            if (this.winner.currentVotes == 2)
            {
                if (this.winner.player1 == 2)
                {
                    this.endRound(this.player1, this.player2);
                    this.winner.currentVotes = 0;
                }
                else if (this.winner.player2 == 2)
                {
                    this.endRound(this.player2, this.player1);
                    this.winner.currentVotes = 0;
                }
                else if (this.winner.player1 < 2 && this.winner.player2 < 2)
                {
                    return -1;
                }
                else 
                {
                    console.log("Unknown error. Err 002");
                }
            }
            else if (this.winner.currentVotes > 2)
            {
                this.winner.currentVotes = 0;
                this.winner.player1 = 0;
                this.winner.player2 = 0;
                throw new Error(`currentVotes variable greater than 2. 
                        This should not be possible. Attempting to self heal. Cast votes again. Err 011`);

            }
        }
        catch (e)
        {
            console.log(e);
        }


        if (this.isRunning === true)
        {
            switch (this.matchType)
            {
                case "single":
                    await this.startSinglesRound();
                    break;

                case "double":
                    await this.startDoublesRound();
                    break;
                case "default":
                    throw new Error(`Cannot determine what type of round to start next or bracket not propertly initialized. 
                        Fatal error. Err 017`);
            }
        }
        else
        {

            throw new Error("Failure to read matchType variable. Err 040");
        }
    }
    async endRound(winningUserID: number, losingUserID: number)
    {
        this.playerManager.setAllTimeWins(winningUserID, this.playerManager.getAllTimeWins(winningUserID)! + 1);
        this.playerManager.setAllTimeLosses(winningUserID, this.playerManager.getAllTimeLosses(losingUserID)! + 1);
        //asserting this function call will return a value because it handles undefined values itself
        //await db.updateUser(losingPlayer.getPlayerID); 
    }
    async endMatch()
    {

        this.fault = this.fault + 1;
        if (this.fault > -1)
        {
            throw new Error("FATAL ERR. Scenario: endMatch called more than 1x.");
        }
        this.users.forEach(async (userID) =>
        {
            this.playerManager.setInGame(userID, false);

            this.playerManager.setCurrentRound(userID, 0); 

        })
        this.isRunning = false;
        this.currentRound = 0;
        this.matchType = "default";
        this.player1 = -1;
        this.player2 = -1;
        this.totalByes = 0;

        throw new Error("Program Terminated by endMatch() call.")

    }
}

export default class BracketManager 
{

    private static instance: BracketManager;
    private brackets: Array<Bracket>;
    private playerManager: playerManager;

    private constructor()
    {
        this.brackets = new Array<Bracket>();
        this.playerManager = playerManager.getInstance;
    }

    static get getInstance(): BracketManager
    {
        if (!BracketManager.instance)
        {
            BracketManager.instance = new BracketManager();
        }

        return BracketManager.instance;
    }

    public showAllRooms()
    {
        /* debug */
        const snapShot = this.brackets;



        return snapShot;
    }

    public clearBrackets()
    {
        /* debug */
        this.brackets = [];
    }

    async createRoom(playerID: number)
    {

        const currentBracket = new Bracket();

        this.brackets.push(currentBracket);

        const roomCode = currentBracket.getRoomCode;

        await currentBracket.joinBracket(playerID);

        return roomCode;
    }

    async leaveRoom(playerID: number, roomCode: string)
    {


        try 
        {
            const foundBracket = this.brackets.find((Bracket) => Bracket.getRoomCode == roomCode);

            if (foundBracket)
            {
                await foundBracket.leaveBracket(playerID);
                return true;
            }
            else 
            {
                console.log("Unable to find bracket specified. Possible Null or incorrect type. Err 005");
                return false;

            }
        }

        catch (e)
        {
            console.log(e)
        }
    }

    async joinRoom(playerID: number, roomCode: string)
    {

        try 
        {
            const foundBracket = this.brackets.find((Bracket) => Bracket.getRoomCode == roomCode);

            if (foundBracket !== undefined)
            {
                await foundBracket.joinBracket(playerID);
                return true;
            }

            else 
            {
                console.log("Unable to find bracket specified. Possible Null or incorrect type. Err 006");
                return false;
            }
        }

        catch (e)
        {
            console.log(e)
        }

    }

    async startSinglesMatch(roomCode: string)
    {
        await this.startSinglesRound(roomCode);
    }

    async startSinglesRound(roomCode: string)
    {
        try
        {
            const localBracket = this.brackets.find((bracket) => bracket.getRoomCode == roomCode);

            if (localBracket === undefined)
            {
                throw new Error("No bracket found with that roomCode. Err 033");
            }

            else
            {
                await localBracket.startMatch("single");

            }
        }
        catch (e)
        {
            console.log(e)
        }

    }

    async startDoublesMatch(roomCode: string)
    {
        await this.startDoublesRound(roomCode);
    }

    async startDoublesRound(roomCode: string)
    {
        try
        {
            const localBracket = this.brackets.find((bracket) => bracket.getRoomCode == roomCode);

            if (localBracket === undefined)
            {
                throw new Error("No bracket found with that roomCode. Err 033");
            }

            else
            {
                await localBracket.startSinglesRound();

            }
        }
        catch (e)
        {
            console.log(e)
        }

    }

    async selectWinner(roomCode: string, winningPlayerID: number)
    {
        try
        {
            const localBracket = this.brackets.find((bracket) => bracket.getRoomCode == roomCode);


            if (localBracket === undefined)
            {
                console.log("No bracket found with that roomCode. Err 033");
                return false;
            }

            else
            {
                await localBracket.selectWinner(winningPlayerID);

                if (winningPlayerID === localBracket.getPlayer1)
                {
                    await localBracket.endRound(localBracket.getPlayer1, localBracket.getPlayer2);
                }
                else if (winningPlayerID === localBracket.getPlayer2)
                {
                    await localBracket.endRound(localBracket.getPlayer2, localBracket.getPlayer1);
                }
                return true;
            }
        }
        catch (e)
        {
            console.log(e);
        }
    }

    getIsRunning(roomCode: string)
    {
        try
        {
            const localBracket = this.brackets.find((bracket) => bracket.getRoomCode == roomCode);

            if (localBracket === undefined)
            {
                throw new Error("No bracket found with that roomCode. Err 039");
            }

            else
            {
                return localBracket.getIsRunning;
            }
        }
        catch (e)
        {
            console.log(e);
        }
    }
}