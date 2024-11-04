/* eslint-disable @typescript-eslint/no-unused-vars */

import User from "@/app/resources/user"

class Player implements User
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
  finalRound: number;
  currentRank: number;
  allTimeWins: number;
  allTimeLosses: number;
  totalGamesPlayed: number;
  datesPlayed: Array<Date>;

  constructor()
  {

    this.id = -1;
    this.playerName = "-1";
    this.passwordHash = "-1";
    this.email = "-1";
    this.created = new Date();
    this.lastUpdate = new Date();
    this.eliminations = -1;
    this.inGame = false;
    this.currentRound = -1;
    this.finalRound = -1;
    this.currentRank = -1;
    this.allTimeWins = -1;
    this.allTimeLosses = -1;
    this.datesPlayed = [];
    this.totalGamesPlayed = -1
  }
  init(playerName: string,
    passwordHash: string,
    email: string,
    id?: number)
  {
    this.playerName = playerName;
    this.passwordHash = passwordHash;
    this.email = email;


    if (id !== undefined)
    {
      this.id = id;
    }
  }
  /*
Functions Getters and Setters with some basic input validation
*/
  get getPlayerID()
  {
    return this.id!;
  }
  set setPlayerID(playerID: number)
  {
    if (this.id === undefined)
    {
      this.id = playerID;
    } else
    {
      console.log("Unable to update playerID because one already exists. This should not be possible. Err 016");
    }
  }
  get getPlayerName()
  {
    return this.playerName;
  }
  set setPlayerName(playerName: string)
  {
    this.playerName = playerName;
  }
  get getEmail()
  {
    return this.email;
  }
  set setEmail(email: string)
  {
    try
    {
      if (email.includes("@") || email.includes("."))
      {
        this.email = email;
      } else
      {
        throw new Error("Email format incompatible. Please resubmit. Err 017");
      }
    } catch (e)
    {
      console.log(e);
    }
  }
  get getPasswordHash()
  {
    return this.passwordHash;
  }
  get getCreated()
  {
    return this.created;
  }
  get getLastUpdate()
  {
    return this.lastUpdate;
  }
  set setLastUpdate(lastUpdate: Date)
  {
    this.lastUpdate = lastUpdate;
  }
  get getEliminations()
  {
    return this.eliminations;
  }
  set setEliminations(eliminations: number)
  {
    this.eliminations = eliminations;
  }
  get getInGame()
  {
    return this.inGame;
  }
  set setInGame(inGame: boolean)
  {
    this.inGame = inGame;
  }
  get getCurrentRound()
  {
    return this.currentRound;
  }
  set setCurrentRound(round: number)
  {
    this.currentRound = round;
  }
  get getCurrentRank()
  {
    return this.currentRank;
  }
  set setCurrentRank(currentRank: number)
  {
    this.currentRank = currentRank;
  }
  get getAllTimeWins()
  {
    return this.allTimeWins;
  }
  set setAllTimeWins(allTimeWins: number)
  {
    this.allTimeWins = allTimeWins;
  }
  get getAllTimeLosses()
  {
    return this.allTimeLosses;
  }
  set setAllTimeLosses(allTimeLosses: number)
  {
    this.allTimeLosses = allTimeLosses;
  }
  get getGamesPlayed()
  {
    return this.totalGamesPlayed;
  }
  set setGamesPlayed(totalGamesPlayed: number)
  {
    this.totalGamesPlayed = totalGamesPlayed;
  }
  get getDatesPlayed()
  {
    return this.datesPlayed;
  }
  set setDatesPlayed(datesPlayed: Array<Date>)
  {
    this.datesPlayed = datesPlayed;
  }
}


export default class PlayerManager
{
  static #instance: PlayerManager;
  private Players: Array<Player>;

  private constructor( 
  )
  {
    this.Players = [];
  }
  public static get getInstance(): PlayerManager
  {
    if (!PlayerManager.#instance)
    {
      PlayerManager.instance = new PlayerManager();
    }
    return PlayerManager.#instance;
  }
  public createPlayer(
    playerName: string,
    passwordHash: string,
    email: string,
    id?: number
  )
  {
    if (playerName == '')
    {
      throw new Error("playerName value required. Cannot proceed. Fatal. Err 227");
    }
    const currentPlayer = new Player();

    const generateUniqueID = (count: number) =>
    {
      const randomID = Math.floor(Math.random() * 1000) + Date.now();

      this.Players.forEach(player =>
      {
        if (player.getPlayerID == randomID)
        {
          if (count > 1000)
          {
            throw new Error("Collision Rate Higher than allowed: Err 100");
          }
          generateUniqueID(count + 1);
        }
      })

      return randomID;
    }

    if (id === undefined)
    {
      currentPlayer.init(playerName, passwordHash, email, generateUniqueID(0));
      this.Players.push(currentPlayer);
    }
    else
    {
      currentPlayer.init(playerName, passwordHash, email, id);
      this.Players.push(currentPlayer);
    }


    return currentPlayer.getPlayerID;

  }
  //this function should be used sparingly
  updatePlayer(id: number, playerName?: string,
    email?: string,
    passwordHash?: string,
    created?: Date,
    lastUpdate?: Date,
    eliminations?: number,
    inGame?: boolean,
    currentRound?: number,
    currentRank?: number,
    allTimeWins?: number,
    allTimeLosses?: number,
    totalGamesPlayed?: number,
    datesPlayed?: Array<Date>
  )
  {
    const localPlayer: User =
    {
      id: 0,
      playerName: "",
      email: "",
      passwordHash: "",
      created: new Date(),
      lastUpdate: new Date(),
      eliminations: 0,
      inGame: false,
      currentRound: 0,
      currentRank: 0,
      allTimeWins: 0,
      allTimeLosses: 0,
      totalGamesPlayed: 0,
      datesPlayed: []
    }
    const foundPlayer = this.Players.find(player => player.id === id);

    if (foundPlayer === undefined)
    {
      throw new Error("player not found in players collection. Err 667");
    }
    else
    {

      localPlayer.id = foundPlayer.getPlayerID;

      if (playerName === undefined)
      {
        localPlayer.playerName = foundPlayer.getPlayerName;
      }
      else
      {
        localPlayer.playerName = playerName;
      }
      localPlayer.email = foundPlayer.getEmail;
      if (email === undefined)
      {
        localPlayer.email = foundPlayer.getEmail;
      }
      else
      {
        localPlayer.email = email;
      }
      localPlayer.passwordHash = foundPlayer.getPasswordHash;
      if (passwordHash === undefined)
      {
        localPlayer.passwordHash = foundPlayer.getPasswordHash;
      }
      else
      {
        localPlayer.passwordHash = passwordHash;
      }
      localPlayer.created = foundPlayer.getCreated;
      if (created === undefined)
      {
        localPlayer.created = foundPlayer.getCreated;
      }
      else
      {
        localPlayer.created = created;
      }
      localPlayer.lastUpdate = foundPlayer.getLastUpdate;
      if (lastUpdate === undefined)
      {
        localPlayer.lastUpdate = foundPlayer.getLastUpdate;
      }
      else
      {
        localPlayer.lastUpdate = lastUpdate;
      }
      localPlayer.eliminations = foundPlayer.eliminations;
      if (eliminations === undefined)
      {
        localPlayer.eliminations = foundPlayer.getEliminations;
      }
      else
      {
        localPlayer.eliminations = eliminations;
      }
      localPlayer.inGame = foundPlayer.inGame;
      if (inGame === undefined)
      {
        localPlayer.inGame = foundPlayer.getInGame;
      }
      else
      {
        localPlayer.inGame = inGame;
      }
      localPlayer.currentRound = foundPlayer.currentRound;
      if (currentRound === undefined)
      {
        localPlayer.currentRound = foundPlayer.getCurrentRound;
      }
      else
      {
        localPlayer.currentRound = currentRound;
      }
      localPlayer.currentRank = foundPlayer.getCurrentRank;
      if (currentRank === undefined)
      {
        localPlayer.currentRank = foundPlayer.getCurrentRank;
      }
      else
      {
        localPlayer.currentRank = currentRank;
      }
      localPlayer.allTimeWins = foundPlayer.allTimeWins;
      if (allTimeWins === undefined)
      {
        localPlayer.allTimeWins = foundPlayer.getAllTimeWins;
      }
      else
      {
        localPlayer.allTimeWins = allTimeWins;
      }
      localPlayer.totalGamesPlayed = foundPlayer.totalGamesPlayed;
      if (totalGamesPlayed === undefined)
      {
        localPlayer.totalGamesPlayed = foundPlayer.getGamesPlayed;
      }
      else
      {
        localPlayer.totalGamesPlayed = totalGamesPlayed;
      }
      localPlayer.datesPlayed = foundPlayer.datesPlayed;
      if (datesPlayed === undefined)
      {
        localPlayer.datesPlayed = foundPlayer.getDatesPlayed;
      }
      else
      {
        localPlayer.datesPlayed = datesPlayed;
      }
      localPlayer.allTimeLosses = foundPlayer.getAllTimeLosses;
      if (allTimeLosses === undefined)
      {
        localPlayer.allTimeLosses = foundPlayer.getAllTimeLosses;
      }
      else
      {
        localPlayer.allTimeLosses = allTimeLosses;
      }
    }

  }
  deletePlayer(playerID: number)
  {
    try
    {
      const foundplayer = this.Players.find(currentPlayer => currentPlayer.getPlayerID === playerID);

      if (foundplayer === undefined)
      {
        throw new Error("player not found in players collection. Err 015");
      }

      else
      {
        this.Players.splice(this.Players.findIndex(currentPlayer => currentPlayer.getPlayerID === playerID), 1);
        return true
      }
    }
    catch (error) { console.log(error); }
  }
  showAllplayers()
  {

    const showplayers = this.Players;

    return showplayers;
  }
  clearplayers()
  {

    this.Players = [];
  }
  getPlayerID(playerName: string)
  {
    const foundPlayer = this.Players.find((player) => player.playerName === playerName);
    if (foundPlayer === undefined)
    {
      console.error("%c Unable to find specified player. Err 108.", "color:red");
    }
    else
    {
      return foundPlayer.getPlayerID;
    }
  }
  setPlayerID(playerID: number, newPlayerID: number)
  {
    const foundPlayer = this.Players.find((player) => player.id === playerID);
    if (foundPlayer === undefined)
    {
      console.error("%c Unable to find specified player. Err 617.", "color:red");
    }
    else
    {
      foundPlayer.setPlayerID = newPlayerID;
    }
  }
  public getPlayerName(playerID: number)
  {
    {
      const foundPlayer = this.Players.find((player) => player.id === playerID);
      if (foundPlayer === undefined)
      {
        console.error("%c Unable to find specified player. Err 449.", "color:red");
      }
      else
      {
        return foundPlayer.getPlayerName;
      }
    }
  }
  setPlayerName(playerID: number, newPlayerID: number)
  {
    {
      const foundPlayer = this.Players.find((player) => player.id === playerID);
      if (foundPlayer === undefined)
      {
        console.error("%c Unable to find specified player. Err 414.", "color:red");
      }
      else
      {
        foundPlayer.setPlayerID = newPlayerID;
      }
    }
  }
  getEmail(playerID: number)
  {
    {
      const foundPlayer = this.Players.find((player) => player.id === playerID);
      if (foundPlayer === undefined)
      {
        console.error("%c Unable to find specified player. Err 878.", "color:red");
      }
      else
      {
        return foundPlayer.getEmail;
      }
    }
  }
  setEmail(playerID: number, newEmail: string)
  {
    {
      const foundPlayer = this.Players.find((player) => player.id === playerID);
      if (foundPlayer === undefined)
      {
        console.error("%c Unable to find specified player. Err 414.", "color:red");
      }
      else
      {
        foundPlayer.setEmail = newEmail;
      }
    }
  }
  getPasswordHash(playerID: number)
  {
    {
      const foundPlayer = this.Players.find((player) => player.id === playerID);
      if (foundPlayer === undefined)
      {
        console.error("%c Unable to find specified player. Err 036.", "color:red");
      }
      else
      {
        return foundPlayer.getPasswordHash;
      }
    }
  }
  //no set password hash bc to change pw you must go through playerManager.updatePlayer
  getCreated(playerID: number)
  {
    {
      const foundPlayer = this.Players.find((player) => player.id === playerID);
      if (foundPlayer === undefined)
      {
        console.error("%c Unable to find specified player. Err 413.", "color:red");
      }
      else
      {
        return foundPlayer.getCreated;
      }
    }
  }
  //no set created bc it should be treated as read only
  getLastUpdate(playerID: number)
  {
    {
      const foundPlayer = this.Players.find((player) => player.id === playerID);
      if (foundPlayer === undefined)
      {
        console.error("%c Unable to find specified player. Err 449.", "color:red");
      }
      else
      {
        return foundPlayer.getLastUpdate;
      }
    }
  }
  setLastUpdate(playerID: number, newLastUpdate: Date)
  {
    {
      const foundPlayer = this.Players.find((player) => player.id === playerID);
      if (foundPlayer === undefined)
      {
        console.error("%c Unable to find specified player. Err 414.", "color:red");
      }
      else
      {
        foundPlayer.setLastUpdate = newLastUpdate;
      }
    }
  }
  getEliminations(playerID: number)
  {
    {
      const foundPlayer = this.Players.find((player) => player.id === playerID);
      if (foundPlayer === undefined)
      {
        console.error("%c Unable to find specified player. Err 449.", "color:red");
      }
      else
      {
        return foundPlayer.getEliminations;
      }
    }
  }
  setEliminations(playerID: number, newEliminations: number)
  {
    {
      const foundPlayer = this.Players.find((player) => player.id === playerID);
      if (foundPlayer === undefined)
      {
        console.error("%c Unable to find specified player. Err 414.", "color:red");
      }
      else
      {
        foundPlayer.setEliminations = newEliminations;
      }
    }
  }
  getInGame(playerID: number)
  {
    {
      const foundPlayer = this.Players.find((player) => player.id === playerID);
      if (foundPlayer === undefined)
      {
        console.error("%c Unable to find specified player. Err 449.", "color:red");
      }
      else
      {
        return foundPlayer.getInGame;
      }
    }
  }
  setInGame(playerID: number, newInGame: boolean)
  {
    {
      const foundPlayer = this.Players.find((player) => player.id === playerID);
      if (foundPlayer === undefined)
      {
        console.error("%c Unable to find specified player. Err 414.", "color:red");
      }
      else
      {
        foundPlayer.setInGame = newInGame;
      }
    }
  }
  getCurrentRound(playerID: number)
  {
    {
      const foundPlayer = this.Players.find((player) => player.id === playerID);
      if (foundPlayer === undefined)
      {
        console.error("%c Unable to find specified player. Err 449.", "color:red");
      }
      else
      {
        return foundPlayer.getCurrentRound;
      }
    }
  }
  setCurrentRound(playerID: number, newRound: number)
  {
    {
      const foundPlayer = this.Players.find((player) => player.id === playerID);
      if (foundPlayer === undefined)
      {
        console.error("%c Unable to find specified player. Err 414.", "color:red");
      }
      else
      {
        foundPlayer.setCurrentRound = newRound;
      }
    }
  }
  getCurrentRank(playerID: number)
  {
    {
      const foundPlayer = this.Players.find((player) => player.id === playerID);
      if (foundPlayer === undefined)
      {
        console.error("%c Unable to find specified player. Err 449.", "color:red");
      }
      else
      {
        return foundPlayer.getCurrentRank;
      }
    }
  }
  setCurrentRank(playerID: number, newCurrentRank: number)
  {
    {
      const foundPlayer = this.Players.find((player) => player.id === playerID);
      if (foundPlayer === undefined)
      {
        console.error("%c Unable to find specified player. Err 414.", "color:red");
      }
      else
      {
        foundPlayer.setCurrentRank = newCurrentRank;
      }
    }
  }
  getAllTimeWins(playerID: number)
  {
    {
      const foundPlayer = this.Players.find((player) => player.id === playerID);
      if (foundPlayer === undefined)
      {
        console.error("%c Unable to find specified player. Err 449.", "color:red");
      }
      else
      {
        return foundPlayer.getAllTimeWins;
      }
    }
  }
  setAllTimeWins(playerID: number, newAllTimeWins: number)
  {
    {
      const foundPlayer = this.Players.find((player) => player.id === playerID);
      if (foundPlayer === undefined)
      {
        console.error("%c Unable to find specified player. Err 414.", "color:red");
      }
      else
      {
        foundPlayer.setAllTimeWins = newAllTimeWins;
      }
    }
  }
  getAllTimeLosses(playerID: number)
  {
    {
      const foundPlayer = this.Players.find((player) => player.id === playerID);
      if (foundPlayer === undefined)
      {
        console.error("%c Unable to find specified player. Err 449.", "color:red");
      }
      else
      {
        return foundPlayer.getAllTimeLosses;
      }
    }
  }
  setAllTimeLosses(playerID: number, newAllTimeLosses: number)
  {
    {
      const foundPlayer = this.Players.find((player) => player.id === playerID);
      if (foundPlayer === undefined)
      {
        console.error("%c Unable to find specified player. Err 414.", "color:red");
      }
      else
      {
        foundPlayer.setAllTimeLosses = newAllTimeLosses;
      }
    }
  }
  getGamesPlayed(playerID: number)
  {
    {
      const foundPlayer = this.Players.find((player) => player.id === playerID);
      if (foundPlayer === undefined)
      {
        console.error("%c Unable to find specified player. Err 449.", "color:red");
      }
      else
      {
        return foundPlayer.getGamesPlayed;
      }
    }
  }
  setGamesPlayed(playerID: number, totalGamesPlayed: number)
  {
    {
      const foundPlayer = this.Players.find((player) => player.id === playerID);
      if (foundPlayer === undefined)
      {
        console.error("%c Unable to find specified player. Err 414.", "color:red");
      }
      else
      {
        foundPlayer.setGamesPlayed = totalGamesPlayed;
      }
    }
  }
  getDatesPlayed(playerID: number)
  {
    {
      const foundPlayer = this.Players.find((player) => player.id === playerID);
      if (foundPlayer === undefined)
      {
        console.error("%c Unable to find specified player. Err 449.", "color:red");
      }
      else
      {
        return foundPlayer.getDatesPlayed;
      }
    }
  }
  setDatesPlayed(playerID: number, datesPlayed: Array<Date>)
  {
    {
      const foundPlayer = this.Players.find((player) => player.id === playerID);
      if (foundPlayer === undefined)
      {
        console.error("%c Unable to find specified player. Err 414.", "color:red");
      }
      else
      {
        foundPlayer.setDatesPlayed = datesPlayed;
      }
    }
  }


}

