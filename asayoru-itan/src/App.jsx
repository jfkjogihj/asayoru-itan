import React, { useState, useEffect } from 'react';
import './App.css';

const AsayoruItanGame = () => {
  const [gameState, setGameState] = useState('lobby');
  const [sessionId, setSessionId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState([]);
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [questionList, setQuestionList] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [votes, setVotes] = useState({});
  const [roundWinner, setRoundWinner] = useState('');
  const [scores, setScores] = useState({});
  const [isHost, setIsHost] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const generateSessionId = () => {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sessionId);
    alert('コピーしました！');
  };

  const startGame = () => {
    if (!questionList.length) {
      alert('質問を追加してください');
      return;
    }
    if (players.length < 2) {
      alert('最低2人のプレイヤーが必要です');
      return;
    }
    setGameState('playing');
    setQuestion(questionList[0]);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setCurrentAnswer('');
    setVotes({});
    setHasVoted(false);
    const initialScores = {};
    players.forEach(p => {
      initialScores[p.name] = 0;
    });
    setScores(initialScores);
  };

  const submitAnswer = () => {
    if (!currentAnswer.trim()) return;
    const newAnswers = { ...answers, [playerName]: currentAnswer };
    setAnswers(newAnswers);
    setCurrentAnswer('');
  };

  const allAnswered = () => {
    return players.every(p => p.name in answers);
  };

  const castVote = (votedPlayerName) => {
    if (votedPlayerName === playerName) {
      alert('自分の回答には投票できません');
      return;
    }
    const newVotes = { ...votes, [playerName]: votedPlayerName };
    setVotes(newVotes);
    setHasVoted(true);
  };

  const allVoted = () => {
    return players.every(p => p.name in votes);
  };

  const calculateWinner = () => {
    const voteCounts = {};
    Object.values(votes).forEach(votedName => {
      voteCounts[votedName] = (voteCounts[votedName] || 0) + 1;
    });

    let maxVotes = 0;
    let winner = '';
    Object.entries(voteCounts).forEach(([name, count]) => {
      if (count > maxVotes) {
        maxVotes = count;
        winner = name;
      }
    });

    setRoundWinner(winner);
    const newScores = { ...scores };
    if (winner) {
      newScores[winner] = (newScores[winner] || 0) + 1;
    }
    setScores(newScores);

    if (currentQuestionIndex < questionList.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setQuestion(questionList[currentQuestionIndex + 1]);
        setAnswers({});
        setVotes({});
        setHasVoted(false);
        setGameState('playing');
      }, 3000);
    } else {
      setTimeout(() => {
        setGameState('results');
      }, 3000);
    }
  };

  const addQuestion = () => {
    const q = prompt('質問を入力してください：');
    if (q) {
      setQuestionList([...questionList, q]);
    }
  };

  const deleteQuestion = (index) => {
    setQuestionList(questionList.filter((_, i) => i !== index));
  };

  const resetGame = () => {
    setGameState('lobby');
    setSessionId('');
    setPlayerName('');
    setPlayers([]);
    setQuestionList([]);
    setAnswers({});
    setScores({});
    setVotes({});
  };

  // ロビー画面
  if (gameState === 'lobby') {
    return (
      <div className="container">
        <div className="content-box">
          <h1 className="title">🎭 朝までそれ異端</h1>
          <p className="subtitle">一番異端な回答を投票で決めるゲーム</p>

          <div className="button-group">
            <button 
              className="button button-primary"
              onClick={() => {
                const id = generateSessionId();
                setSessionId(id);
                setIsHost(true);
                setGameState('setup');
              }}
            >
              新しいゲーム作成
            </button>
            <button 
              className="button button-primary"
              onClick={() => {
                const id = prompt('セッションIDを入力：');
                if (id) {
                  setSessionId(id);
                  setIsHost(false);
                  setGameState('setup');
                }
              }}
            >
              ゲームに参加
            </button>
          </div>
        </div>
      </div>
    );
  }

  // セットアップ画面
  if (gameState === 'setup') {
    return (
      <div className="container">
        <div className="content-box">
          <h1 className="title">🎭 朝までそれ異端</h1>

          <div className="form-group">
            <label>セッションID</label>
            <div className="input-group">
              <input type="text" value={sessionId} disabled />
              <button className="button-icon" onClick={copyToClipboard}>
                📋
              </button>
            </div>
            <p className="help-text">このIDを友達に共有してください</p>
          </div>

          <div className="form-group">
            <label>あなたの名前</label>
            <input 
              type="text" 
              value={playerName} 
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="名前を入力"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && playerName.trim()) {
                  setPlayers([...players, { name: playerName }]);
                  setPlayerName('');
                }
              }}
            />
            <button 
              className="button button-secondary"
              onClick={() => {
                if (playerName.trim()) {
                  setPlayers([...players, { name: playerName }]);
                  setPlayerName('');
                }
              }}
            >
              + プレイヤーを追加
            </button>
          </div>

          <div className="form-group">
            <label>参加プレイヤー ({players.length})</label>
            <div className="player-list">
              {players.map((p, i) => (
                <div key={i} className="player-item">
                  <span>{p.name}</span>
                  <button 
                    className="button-remove"
                    onClick={() => setPlayers(players.filter((_, idx) => idx !== i))}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {isHost && (
            <div className="form-group">
              <label>質問リスト ({questionList.length})</label>
              <button 
                className="button button-secondary"
                onClick={addQuestion}
              >
                + 質問を追加
              </button>
              <div className="question-list">
                {questionList.map((q, i) => (
                  <div key={i} className="question-item">
                    <span>{q}</span>
                    <button 
                      className="button-remove"
                      onClick={() => deleteQuestion(i)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button 
            className={`button button-start ${players.length >= 2 && questionList.length ? '' : 'disabled'}`}
            onClick={startGame}
            disabled={players.length < 2 || !questionList.length}
          >
            ゲームを開始
          </button>
        </div>
      </div>
    );
  }

  // プレイ画面
  if (gameState === 'playing') {
    const allDone = allAnswered();
    return (
      <div className="container">
        <div className="content-box">
          <div className="question-header">
            <p className="question-number">質問 {currentQuestionIndex + 1} / {questionList.length}</p>
            <h1 className="question-text">{question}</h1>
          </div>

          <div className="status-box">
            <p className="status-label">回答済み ({Object.keys(answers).length} / {players.length})</p>
            <div className="player-status">
              {players.map(p => (
                <div 
                  key={p.name} 
                  className={`status-badge ${p.name in answers ? 'answered' : 'waiting'}`}
                >
                  {p.name} {p.name in answers ? '✓' : '⏳'}
                </div>
              ))}
            </div>
          </div>

          {!(playerName in answers) ? (
            <div className="form-group">
              <input 
                type="text" 
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="あなたの異端な回答を入力"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') submitAnswer();
                }}
                autoFocus
              />
              <button 
                className={`button button-start ${currentAnswer.trim() ? '' : 'disabled'}`}
                onClick={submitAnswer}
                disabled={!currentAnswer.trim()}
              >
                回答を送信
              </button>
            </div>
          ) : (
            <div className="success-message">
              ✓ 回答しました
            </div>
          )}

          {allDone && (
            <>
              <div className="answers-display">
                <h3>全員の回答</h3>
                {Object.entries(answers).map(([name, answer]) => (
                  <div key={name} className="answer-item">
                    <span className="answer-name">{name}:</span>
                    <span className="answer-text">{answer}</span>
                  </div>
                ))}
              </div>

              <button 
                className="button button-start"
                onClick={() => setGameState('voting')}
              >
                投票に進む
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // 投票画面
  if (gameState === 'voting') {
    return (
      <div className="container">
        <div className="content-box">
          <div className="question-header">
            <p className="question-number">投票</p>
            <h1 className="question-text">
              一番異端だと思う回答を選んでください
            </h1>
          </div>

          <div className="status-box">
            <p className="status-label">投票済み ({Object.keys(votes).length} / {players.length})</p>
            <div className="player-status">
              {players.map(p => (
                <div 
                  key={p.name} 
                  className={`status-badge ${p.name in votes ? 'answered' : 'waiting'}`}
                >
                  {p.name} {p.name in votes ? '✓' : '⏳'}
                </div>
              ))}
            </div>
          </div>

          <div className="vote-buttons">
            {Object.entries(answers).map(([name, answer]) => {
              const isSelected = votes[playerName] === name;
              return (
                <button
                  key={name}
                  className={`vote-button ${isSelected ? 'selected' : ''} ${playerName === name ? 'disabled' : ''}`}
                  onClick={() => castVote(name)}
                  disabled={playerName === name}
                >
                  <div className="vote-name">{name}</div>
                  <div className="vote-answer">{answer}</div>
                </button>
              );
            })}
          </div>

          {allVoted() && (
            <button 
              className="button button-start"
              onClick={calculateWinner}
            >
              結果を確認
            </button>
          )}

          {hasVoted && !allVoted() && (
            <div className="waiting-message">
              ✓ 投票しました。他のプレイヤーの投票を待機中...
            </div>
          )}
        </div>
      </div>
    );
  }

  // リザルト画面
  if (gameState === 'results') {
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return (
      <div className="container">
        <div className="content-box">
          <h1 className="title">🎉 ゲーム終了！</h1>

          <div className="winner-box">
            <p className="winner-label">このラウンド一番異端だった回答</p>
            <p className="winner-name">{roundWinner}</p>
            <p className="winner-answer">「{answers[roundWinner]}」</p>
          </div>

          <div className="form-group">
            <label>最終スコア</label>
            <div className="score-list">
              {sorted.map((entry, i) => (
                <div key={entry[0]} className={`score-item ${i === 0 ? 'first' : ''}`}>
                  <div className="score-left">
                    <span className="medal">
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : ''}
                    </span>
                    <span className="score-name">{entry[0]}</span>
                  </div>
                  <span className="score-value">{entry[1]}勝</span>
                </div>
              ))}
            </div>
          </div>

          <button 
            className="button button-secondary"
            onClick={resetGame}
          >
            新しいゲーム
          </button>
        </div>
      </div>
    );
  }
};

export default AsayoruItanGame;
