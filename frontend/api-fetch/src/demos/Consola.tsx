/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@radix-ui/themes';
import { useState, useEffect } from 'react';

const ConsolaPantalla = () => {

    const [errorLogs, setErrorLogs] = useState<string>("");

    useEffect(() => {
        const originalConsoleError = console.error;
        console.error = (message: any, ...optionalParams: any[]) => {
            setErrorLogs(prevLogs => `${prevLogs}\n${message}`);
            originalConsoleError(message, ...optionalParams);
        };

        return () => {
            console.error = originalConsoleError;
        };
    }, []);

    return (
        <div>
            {/* Otros componentes y lógica */}
            <textarea
                value={errorLogs}
                readOnly
                rows={10}
                cols={50}
                style={{ width: '800px', height: '300px' }}
            />
            <Button
                size="1"
                variant="soft"
                onClick={() => setErrorLogs("")}
            >
                Limpiar Consola
            </Button>
        </div>
    );
};

export default ConsolaPantalla;