"use client"
import GenericBracket  from "@/app/brackets/page";

const TwoPlayer = () => 
    {
        return (
            <>
                <GenericBracket>
                <svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="40" fill="blue" />
                    <circle cx="150" cy="50" r="40" fill="red" />
                    <text x="50" y="55" fill="white" textAnchor="middle" fontSize="20">Player 1</text>
                    <text x="150" y="55" fill="white" textAnchor="middle" fontSize="20">Player 2</text>
                </svg> 
                </GenericBracket> 
            </>
        ); 
    }

export default TwoPlayer;   