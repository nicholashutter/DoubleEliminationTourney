"use client"
import GenericBracket from "@/app/brackets/page";
import { useState, useEffect, useRef } from "react";

interface Props
{
    x1: number;
    x2: number;
    y1: number;
    y2: number;
}





const TwoPlayer = (props: Props) => 
{
    const [coordinates, setCoordinates] = useState({
        x1: 0,
        x2: 100,
        y1: window.innerHeight/2,
        y2: window.innerHeight/2,
    });

    

    const GenericBracketRef = useRef<HTMLDivElement | null>(null);

    useEffect(() =>
    {
        const updateCoordinates = () =>
        {
            if (GenericBracketRef.current !== null)
            {
                const GenericBracketShape = GenericBracketRef.current.getBoundingClientRect();

                const centerY = GenericBracketShape.top/2;
                const centerX = GenericBracketShape.left;

                setCoordinates(
                    {
                        x1: centerX,
                        x2: centerX,
                        y1: centerY,
                        y2: centerY,
                    });

                

            };

            updateCoordinates();

            window.addEventListener("resize", updateCoordinates);

            return () =>
            {
                window.removeEventListener("resize", updateCoordinates);
            }
        }

    }, [props.x1, props.x2, props.y1, props.y2]);

    const { x1, x2, y1, y2 } = coordinates;



    //almost there but this will need to be added to useEffect to force the re render

    const leftBound = (window.innerHeight*0.1);
    const rightBound = (window.innerHeight*.1);

    const stringBounds = leftBound.toString() + "," + rightBound.toString();

    return (
        <>
            <GenericBracket >
                <div ref={GenericBracketRef} className="svgContainer">
                    <svg width="90%" height="90%" transform={stringBounds}>
                        <rect width="100%" height="100%" fill="white" rx=".5%" ry=".5%" />
                        <line x1={x1.toString()} x2={x2.toString()} y1={y1.toString()} y2={y2.toString()} stroke="black" strokeWidth="5" />
                    </svg>
                </div>
            </GenericBracket>

        </>
    );
}

export default TwoPlayer;   