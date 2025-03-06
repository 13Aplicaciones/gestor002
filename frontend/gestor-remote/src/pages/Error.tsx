import { useEffect, useState } from "react";
import { getToken } from "orchestrator_remote/service/Tokens";

const Error = () => {
    const [token, setToken] = useState({});

    useEffect(() => {
        const token1 = async () =>{ 
            const token1 = await getToken();
            setToken(token1);
            if(token){
            console.log("miToken", JSON.stringify(token));
            }
        }
        token1();
    }, []);
    
    return (
        <div>
            <h1>Error</h1>
            
            {JSON.stringify(token)}
        </div>
    );
}

export default Error;
