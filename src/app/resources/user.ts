

export default interface User
{
    id: number;
    playerName: string;
    email: string;
    passwordHash: string;
    created: Date;
    lastUpdate: Date;
    eliminations: number;
    inGame: boolean;
    currentRound: number;
    currentRank: number;
    allTimeWins: number;
    allTimeLosses: number;
    totalGamesPlayed: number;
    datesPlayed: Array<Date>;

}

