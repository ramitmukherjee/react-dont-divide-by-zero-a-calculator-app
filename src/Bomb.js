import {
    useState
} from 'react';
import './Bomb.css';

export default function Bomb(props) {
    let [timeLeft, setTimeLeft] = useState(10);
    let [diffused, setDiffused] = useState(false);

    const hints = ["Obvious does not mean wrong :)", '"Taking the __ pill ends the story -  The Matrix"', '"Stay away from the Gamma Rays"', '"The Pokémon"'];

    // Set a 1 second timeout on each render if bomb is not diffued and timer has not run out
    if(timeLeft > -1 && !diffused) {
        setTimeout(() => {
            const left = timeLeft - 1;
            setTimeLeft(left);
        }, 1000);
    }

    function cutWire(e, wire) {
        if(props.correctWire === wire) {
            setDiffused(true);
            props.diffused(e, true);
        }
    }
    
    return (
        <div className="bomb">
            {diffused ? <span className="timer">🎉</span> : (
                <>
                    <div>
                    {timeLeft < 0 ? <span className="timer">💥💥💥</span> : (
                        <>
                            <span className="timer">{timeLeft.toString().padStart(2, '0')}</span>
                            <button className="red" onClick={(e) => cutWire(e, 0)}>✂️</button>
                            <button className="blue" onClick={(e) => cutWire(e, 1)}>✂️</button>
                            <button className="green" onClick={(e) => cutWire(e, 2)}>✂️</button>
                            <button className="yellow" onClick={(e) => cutWire(e, 3)}>✂️</button>
                            <span className="hint">{hints[props.correctWire]}</span>
                        </>
                    )}

                    </div> 
                    <div>⚠️ WARNING You divided by zero and now the app will blow up. Cut the correct wire to diffuse.</div>
                    <div>⚠️ WARNUNG Du hast durch Null geteilt und jetzt wird die Anwendung abstürzen.</div>
                    <div>⚠️ AVERTISSEMENT Vous avez divisé par zéro et maintenant l'application va planter.</div>
                    <div>⚠️ ADVERTENCIA Dividiste por cero y ahora la aplicación explotará.</div>
                    <div>⚠️ चेतावनी आपने शून्य से भाग दिया और अब एप्लिकेशन क्रैश हो जाएगा।</div>
                    <div>⚠️ ПРЕДУПРЕЖДЕНИЕ Вы разделили на ноль, и теперь приложение выйдет из строя.</div>
                    <div>⚠️ 警告 你除以了零，现在应用程序要崩溃了。</div>
                    <div>⚠️ 警告 ゼロで割ると、アプリケーションがクラッシュします。</div>
                </>
            )}
        </div>
    )
}