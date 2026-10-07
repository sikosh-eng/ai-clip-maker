import { useState } from "react";

export default function App() {
  const [video, setVideo] = useState(null);
  const [clips, setClips] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);

  const handleVideo = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setVideo({
      file,
      url: URL.createObjectURL(file),
      name: file.name
    });

    setClips([]);
  };

  const findBestClips = () => {
    if (!video) return;

    setAnalyzing(true);

    // Пока демонстрация интерфейса.
    // На следующем этапе подключим настоящий AI-анализ.
    setTimeout(() => {
      setClips([
        {
          id: 1,
          start: "00:14",
          end: "00:43",
          score: 96,
          reason: "Сильный хук и неожиданный момент"
        },
        {
          id: 2,
          start: "01:27",
          end: "01:58",
          score: 93,
          reason: "Высокая эмоциональность и хороший payoff"
        },
        {
          id: 3,
          start: "03:12",
          end: "03:46",
          score: 91,
          reason: "Интересная информация и сильная концовка"
        },
        {
          id: 4,
          start: "05:04",
          end: "05:39",
          score: 88,
          reason: "Любопытный момент без лишней воды"
        },
        {
          id: 5,
          start: "07:21",
          end: "07:53",
          score: 85,
          reason: "Неожиданное развитие истории"
        }
      ]);

      setAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">Clip<span>AI</span></div>
        <div className="badge">AI VIDEO TOOL</div>
      </header>

      <main>
        <section className="hero">
          <h1>
            Turn long videos into
            <span> viral clips.</span>
          </h1>

          <p>
            Upload a video and let AI find the most interesting moments.
          </p>

          <label className="upload">
            <input
              type="file"
              accept="video/*"
              onChange={handleVideo}
            />

            <div className="uploadIcon">＋</div>

            <strong>
              {video ? video.name : "Upload your video"}
            </strong>

            <small>
              MP4, MOV or WebM
            </small>
          </label>

          {video && (
            <div className="videoBox">
              <video
                src={video.url}
                controls
                playsInline
              />
            </div>
          )}

          <button
            className="analyze"
            onClick={findBestClips}
            disabled={!video || analyzing}
          >
            {analyzing
              ? "🧠 AI IS ANALYZING..."
              : "🔥 FIND BEST CLIPS"}
          </button>

          {analyzing && (
            <div className="progressBox">
              <div>🎙 Analyzing speech...</div>
              <div>🧠 Understanding context...</div>
              <div>🔥 Finding viral moments...</div>
              <div>✂️ Preparing clips...</div>
            </div>
          )}
        </section>

        {clips.length > 0 && (
          <section className="results">
            <h2>🔥 BEST MOMENTS</h2>

            <p className="subtitle">
              AI found the strongest moments in your video.
            </p>

            <div className="clipList">
              {clips.map((clip) => (
                <div className="clipCard" key={clip.id}>
                  <div className="clipTop">
                    <div>
                      <span className="number">
                        #{clip.id}
                      </span>

                      <span className="time">
                        {clip.start} — {clip.end}
                      </span>
                    </div>

                    <div className="score">
                      {clip.score}/100 🔥
                    </div>
                  </div>

                  <p>{clip.reason}</p>

                  <div className="clipButtons">
                    <button>▶ Preview</button>
                    <button>✂️ Use Clip</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
      }
