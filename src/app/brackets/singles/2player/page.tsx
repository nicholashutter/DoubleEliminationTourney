"use client"
import GenericBracket  from "@/app/brackets/page";

interface Props{
    x1:number;
    x2:number;
    y1:number;
    y2:number;
}


const TwoPlayer = (props: Props) => 
    {
        return (
            <>
                <GenericBracket>
                <svg width="100%" height="100%" >
                    <rect width= "100%" height = "100%" fill="white" rx=".5%" ry=".5%"/>
                    <line x1="0" x2="100" y1="225" y2="225" stroke="black" strokeWidth="5"/>
                </svg> 
                </GenericBracket> 
            </>
        ); 
    }

export default TwoPlayer;   