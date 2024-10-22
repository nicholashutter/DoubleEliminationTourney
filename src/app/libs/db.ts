import mysql, {PoolOptions} from "mysql2/promise";


const fightersOptions:PoolOptions =
    {
        host:process.env.DB_HOST, 
        user: process.env.DB_USER,
        password: process.env.DB_PASS, 
        database: "tourneydb",
        waitForConnections:true,
      
    };

    const usersOptions:PoolOptions =
    {
        host:process.env.DB_HOST, 
        user: process.env.DB_USER,
        password: process.env.DB_PASS, 
        database: "userdb",
        waitForConnections:true, 
     
    };
type selectdb = "userdb"|"tourneydb";


async function doQuery(selectdb: selectdb, query:string, params:Array<string>)
{
    
    try
    {
        if (selectdb === "userdb")
        {
            const connection = await mysql.createPool(usersOptions);
            const [results, fields] = await connection.execute(query, params); 

        if (results === undefined)
        {
            console.error (`${fields}`);
            console.error("%c Invalid Response from Database. Err 989", "color:red");
            return -1; 
        }
        else
        {
            console.log(fields); 
            return [results]; 
        }
        }
        else if (selectdb === "tourneydb")
        {
            const connection = await mysql.createPool(fightersOptions);
            const [results, fields] = await connection.execute(query, params); 
            if (results === undefined)
                {
                    console.error (`${fields}`);
                    console.error("%c Invalid Response from Database. Err 999", "color:red");
                    return -1; 
                }
                else
                {
                    console.log(fields);
    
                    return [results]; 
                }
        }
        
        
    }
    catch (e)
    {
        console.error("%c ${e}. Err 763", "color:red");
    }
}

export {doQuery}; 