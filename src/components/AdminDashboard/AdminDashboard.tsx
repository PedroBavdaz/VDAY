import React, { useState, useEffect } from 'react';
import './ShellPage.css';

export function ShellPage() {
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [showShell, setShowShell] = useState<boolean>(true);
  const [popMessage, setPopMessage] = useState<string>('');
  const [bubbles, setBubbles] = useState<Array<{ id: number, x: string }>>([]);

  const handleShellClick = () => {
    const audio = new Audio(process.env.PUBLIC_URL + '/bubble-pop.mp3');
    audio.play();
    setShowMessage(true);
  };

  const handleBubbleClick = () => {
    const audio = new Audio(process.env.PUBLIC_URL + '/bubble-pop.mp3');
    audio.play();
    setPopMessage('I know I’m far, but I still want to give you at least something, and due to all i been working on is this, I thought it be funny. I know it’s a little dumb project but Happy Valentine’s Linda, if you haven’t heard it already. I hope this little virtual shell and bubble can make you smile. I love you.');
    setShowShell(false);
    setShowMessage(false);
    generateBubbles();
  };

  const generateBubbles = () => {
    setInterval(() => {
      setBubbles(prevBubbles => [
        ...prevBubbles,
        { id: Date.now(), x: `${Math.random() * 100}%` }
      ]);
    }, 500);
  };

  useEffect(() => {
    bubbles.forEach((bubble) => {
      const bubbleElement = document.getElementById(`bubble-${bubble.id}`);
      if (bubbleElement) {
        bubbleElement.addEventListener('animationend', () => {
          const audio = new Audio(process.env.PUBLIC_URL + '/bubble-pop.mp3');
          audio.play();
          setBubbles(prevBubbles => prevBubbles.filter(b => b.id !== bubble.id));
        });
      }
    });
  }, [bubbles]);

  return (
    <div className="ShellPage">
      {showShell && <div className="shell" onClick={handleShellClick}></div>}
      {showMessage && (
        <div className="bubbles" onClick={handleBubbleClick}>
          <div className="bubble">POP ME!!</div>
        </div>
      )}
      {popMessage && <div className="pop-message">{popMessage}</div>}
      <div className="rising-bubbles-container">
        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            id={`bubble-${bubble.id}`}
            className="rising-bubble"
            style={{ '--index': bubble.id, '--x-coordinate': bubble.x } as React.CSSProperties}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default ShellPage;
