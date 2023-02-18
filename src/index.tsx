import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Suspense, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { Loading } from 'components/Loading/Loading';
import App from './App';
import reportWebVitals from './reportWebVitals';

const element = document.getElementById('root');
const root = createRoot(element!);
root.render(<h1>Hello, world!</h1>);

root.render(
    <StrictMode>
        <RecoilRoot>
            <Suspense fallback={<Loading />}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Suspense>
        </RecoilRoot>
    </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
