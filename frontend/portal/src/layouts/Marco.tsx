import { ReactNode } from 'react';

const Marco = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <header>
                <h1>Previo </h1>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <h1>Pie</h1>
            </footer>
        </div>
    );
}

export default Marco;