"use client";

import { useState } from "react";

// tipuri de date pentru melodie si playlist
interface Song {
  title: string;
  artist: string;
  year: number;
  reason: string;
}

interface Playlist {
  playlist: Song[];
}

export default function Home() {
  // starea textului scris de user
  const [feeling, setFeeling] = useState("");
  // playlist ul generat de claude
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  // true cat timp asteptam raspunsul de la claude
  const [loading, setLoading] = useState(false);
  // link ul catre playlist ul creat in spotify
  const [spotifyUrl, setSpotifyUrl] = useState<string | null>(null);

  // trimite feeling ul la claude si primeste playlist ul
  async function handleSubmit() {
    setLoading(true);
    setPlaylist(null);
    setSpotifyUrl(null);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feeling }),
    });

    const data = await response.json();
    setPlaylist(data);
    setLoading(false);
  }

  // cauta melodiile pe spotify si creeaza playlist ul in contul userului
  async function saveToSpotify() {
  const response = await fetch("/api/spotify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      songs: playlist?.playlist,
      playlistName: "MoodQueue — " + feeling.slice(0, 30),
    }),
  });
  const data = await response.json();
  if (data.error) {
    alert("Eroare Spotify: " + data.error.message);
    return;
  }
  setSpotifyUrl(data.playlistUrl);
}

  return (
    <>
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -40px) scale(1.1); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 30px) scale(0.9); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, 20px) scale(1.05); }
          66% { transform: translate(-30px, -20px) scale(0.95); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes neonPulse {
          0%, 100% { 
            text-shadow: 0 0 7px #f15bb5, 0 0 7px #f15bb5, 0 0 7px #f15bb5;
          }
          50% { 
            text-shadow: 0 0 12px #f15bb5, 0 0 12px #f15bb5, 0 0 12px #f15bb5;
          }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes disco {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }

        /* orburile din fundal */
        .orb1 { animation: float1 8s ease-in-out infinite; }
        .orb2 { animation: float2 10s ease-in-out infinite; }
        .orb3 { animation: float3 12s ease-in-out infinite; }

        /* efecte titlu si carduri */
        .neon-title { animation: neonPulse 2s ease-in-out infinite; }
        .card-animate { animation: cardIn 0.4s ease forwards; }
        .card-glow:hover {
          border-color: #f15bb5;
          box-shadow: 0 0 20px #9b5de533;
        }

        /* butonul principal de generate */
        .btn-disco {
          background: linear-gradient(135deg, #9b5de5, #f15bb5, #9b5de5);
          background-size: 200% 200%;
          animation: disco 3s ease infinite;
          transition: transform 0.1s, box-shadow 0.1s;
        }
        .btn-disco:hover {
          transform: scale(1.03);
          box-shadow: 0 0 30px #f15bb5aa;
        }

        /* linia care trece pe ecran */
        .scanline { animation: scanline 6s linear infinite; }

        /* stelutele din jurul globului disco */
        .sparkle-1 { animation: sparkle 2s ease-in-out infinite 0s; }
        .sparkle-2 { animation: sparkle 2s ease-in-out infinite 0.4s; }
        .sparkle-3 { animation: sparkle 2s ease-in-out infinite 0.8s; }
        .sparkle-4 { animation: sparkle 2s ease-in-out infinite 1.2s; }
        .sparkle-5 { animation: sparkle 2s ease-in-out infinite 1.6s; }

        /* textul cursiv animat */
        .typewriter {
          overflow: hidden;
          white-space: nowrap;
          animation: typewriter 2s steps(12) forwards;
        }

        /* pe full screen steaua e mai mare si mai la dreapta */
        @media (min-width: 1200px) {
          .star-bottom-left {
            bottom: 7% !important;
            left: 6% !important;
            transform: scale(1.8);
          }
        }

        /* butonul de spotify */
        .btn-spotify {
          display: inline-block;
          margin-top: 24px;
          padding: 12px 32px;
          background: #ffadd6;
          color: #5e5b5b;
          border-radius: 50px;
          font-family: var(--font-bebas), sans-serif;
          font-size: 18px;
          letter-spacing: 4px;
          text-decoration: none;
          transition: transform 0.1s, box-shadow 0.1s;
        }
        .btn-spotify:hover {
          transform: scale(1.03);
          box-shadow: 0 0 30px #f15bb588;
        }
      `}</style>

      <main
        style={{
          minHeight: "100vh",
          background: "radial-gradient(ellipse at 20% 50%, #1a0030 0%, #0a0010 40%, #000008 100%)",
          fontFamily: "var(--font-courier), monospace",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* linie subtire care trece pe ecran */}
        <div
          className="scanline"
          style={{
            position: "fixed", top: 0, left: 0, right: 0,
            height: "2px",
            background: "linear-gradient(transparent, #f15bb511, transparent)",
            pointerEvents: "none",
            zIndex: 100,
          }}
        />

        {/* cercuri colorate in fundal */}
        <div className="orb1" style={{
          position: "fixed", top: "10%", left: "5%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, #9b5de533 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div className="orb2" style={{
          position: "fixed", top: "50%", right: "5%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, #f15bb522 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div className="orb3" style={{
          position: "fixed", bottom: "10%", left: "30%",
          width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, #ff006633 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* steaua decorativa din stanga jos */}
        <div className="star-bottom-left" style={{
          position: "fixed", bottom: "3%", left: "2%",
          pointerEvents: "none",
          zIndex: 5,
        }}>
          <svg width="120" height="120" viewBox="0 0 120 120">
            {/* steaua mare alba */}
            <path
              d="M 60 0 C 56 38, 38 56, 20 60 C 38 64, 56 82, 60 120 C 64 82, 82 64, 100 60 C 82 56, 64 38, 60 0 Z"
              fill="#ffffff" opacity="0.9"
            >
              <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
            </path>
            {/* steluta roz */}
            <path
              d="M 50 82 C 49 90, 46 93, 40 95 C 46 97, 49 100, 50 112 C 51 100, 54 97, 60 95 C 54 93, 51 90, 50 76 Z"
              fill="#f15bb5" opacity="0.8"
            >
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin="0.3s" repeatCount="indefinite" />
            </path>
            {/* steluta mov */}
            <path
              d="M 80 5 C 80 11, 76 14, 71 16 C 76 18, 79 21, 81 29 C 83 21, 86 18, 91 16 C 86 14, 83 10, 81 3 Z"
              fill="#9b5de5" opacity="0.8"
            >
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" begin="0.6s" repeatCount="indefinite" />
            </path>
            {/* steluta argintie */}
            <path
              d="M 100 55 C 98 66, 95 69, 91 71 C 95 73, 98 76, 100 87 C 102 76, 105 73, 109 71 C 105 69, 102 66, 100 55 Z"
              fill="#d0d0d0" opacity="0.8"
            >
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin="1s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>

        {/* globul disco din coltul dreapta sus */}
        <div style={{
          position: "fixed", top: "2.2%", right: "0.1%",
          width: 288, height: 288,
          pointerEvents: "none",
          filter: "drop-shadow(0 0 10px #ffffff44) drop-shadow(0 0 40px #f15bb566)",
        }}>
          <svg viewBox="0 0 100 100" width="288" height="288">
            <defs>
              <clipPath id="circle-clip">
                <circle cx="50" cy="50" r="48" />
              </clipPath>
              {/* lumina din stanga sus */}
              <radialGradient id="top-light" cx="28%" cy="25%" r="55%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="35%" stopColor="#ffffff" stopOpacity="0.6" />
                <stop offset="55%" stopColor="#ffffff" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
              {/* intuneric pe margini */}
              <radialGradient id="sphere-dark" cx="50%" cy="50%" r="50%">
                <stop offset="70%" stopColor="#000000" stopOpacity="0" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.5" />
              </radialGradient>
            </defs>

            <circle cx="50" cy="50" r="48" fill="#1a1a1a" />

            {/* grila de patratele care formeaza globul */}
            <g clipPath="url(#circle-clip)">
              {Array.from({ length: 20 }).map((_, row) =>
                Array.from({ length: 20 }).map((_, col) => {
                  const cx = col * 5 - 0.5;
                  const cy = row * 5 - 0.5;
                  const dx = (cx + 2.5 - 50) / 48;
                  const dy = (cy + 2.5 - 50) / 48;
                  const dist = Math.sqrt(dx * dx + dy * dy);
                  if (dist > 1.08) return null;
                  const hdx = dx + 0.22;
                  const hdy = dy + 0.22;
                  const hdist = Math.sqrt(hdx * hdx + hdy * hdy);
                  // patratele din stanga sus sunt mai luminoase
                  const brightness = Math.max(0.25, 1 - hdist * 0.85);
                  const isPink = (row * 3 + col * 2) % 11 === 0;
                  const baseColors = ["#ffffff", "#e8e8e8", "#d0d0d0", "#b8b8b8", "#e0e0e0"];
                  const tileColor = isPink ? "#ffe9f8" : baseColors[(row + col) % baseColors.length];
                  return (
                    <rect
                      key={`${row}-${col}`}
                      x={cx + 0.2} y={cy + 0.2}
                      width={4.4} height={4.4}
                      fill={tileColor}
                      opacity={brightness}
                      rx={0.3}
                    />
                  );
                })
              )}
            </g>

            <circle cx="50" cy="50" r="48" fill="url(#sphere-dark)" clipPath="url(#circle-clip)" />
            <circle cx="50" cy="50" r="48" fill="url(#top-light)" clipPath="url(#circle-clip)" />

            {/* steluta care se misca pe glob */}
            <g clipPath="url(#circle-clip)">
              <circle r="3" fill="#ffffff">
                <animate attributeName="opacity" values="0;0;1;1;1;1;0" dur="5s" repeatCount="indefinite" />
                <animateMotion dur="5s" repeatCount="indefinite" path="M 30 25 C 52 38 68 48 35 75" />
              </circle>
              <circle r="1.5" fill="#ffccee">
                <animate attributeName="opacity" values="0;0;0.8;0.8;0.8;0.8;0" dur="5s" repeatCount="indefinite" />
                <animateMotion dur="5s" repeatCount="indefinite" path="M 30 25 C 52 35 68 50 35 75" />
              </circle>
            </g>
          </svg>
        </div>

        {/* puncte care clipesc in jurul globului */}
        {[
          { top: "3%", right: "32%", className: "sparkle-1" },
          { top: "12%", right: "3%", className: "sparkle-2" },
          { top: "18%", right: "18%", className: "sparkle-3" },
          { top: "6%", right: "14%", className: "sparkle-4" },
          { top: "15%", right: "25%", className: "sparkle-5" },
        ].map((s, i) => (
          <div key={i} className={s.className} style={{
            position: "fixed", top: s.top, right: s.right,
            width: 6, height: 6, borderRadius: "50%",
            background: i % 2 === 0 ? "#f15bb5" : "#ffffff",
            boxShadow: `0 0 8px ${i % 2 === 0 ? "#f15bb5" : "#9b5de5"}`,
            pointerEvents: "none",
          }} />
        ))}

        {/* continutul principal */}
        <div style={{
          maxWidth: 680,
          margin: "0 auto",
          padding: "60px 30px 70px 30px",
          position: "relative",
          zIndex: 10,
        }}>
          {/* header cu titlu si buton spotify */}
          <div style={{ marginBottom: 48, textAlign: "center" }}>
            <p className="typewriter" style={{
              color: "#4a0941",
              letterSpacing: 8,
              fontSize: 40,
              fontFamily: "'Dancing Script', cursive",
            }}>
              feel the music
            </p>
            <h1
              className="neon-title"
              style={{
                fontFamily: "var(--font-bebas), sans-serif",
                fontSize: "clamp(120px, 12vw, 150px)",
                color: "#ffffff",
                letterSpacing: 8,
                lineHeight: 1,
                margin: 0,
                display: "inline-block",
              }}
            >
              MoodQueue
            </h1>
            <div>
              {/* buton de conectare spotify - redirecteaza la oauth */}
              
              <a  href="/api/auth"
                className="btn-spotify"
              >
                ✦ CONNECT SPOTIFY ✦
              </a>
            </div>
          </div>

          {/* zona de input unde userul scrie feeling ul */}
          <div style={{
            background: "linear-gradient(135deg, #ffffff08, #ffffff03)",
            border: "1px solid #9b5de544",
            borderRadius: 16,
            padding: 24,
            backdropFilter: "blur(10px)",
            marginBottom: 24,
          }}>
            <textarea
              value={feeling}
              onChange={(e) => setFeeling(e.target.value)}
              placeholder="how are you feeling?"
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#ffffff",
                fontSize: 16,
                fontFamily: "var(--font-courier), monospace",
                resize: "none",
                height: 120,
                lineHeight: 1.8,
                caretColor: "#f15bb5",
              }}
            />
            {/* linie decorativa */}
            <div style={{
              height: 1,
              background: "linear-gradient(90deg, transparent, #9b5de5, #f15bb5, transparent)",
              marginBottom: 20,
            }} />
            <button
              onClick={handleSubmit}
              disabled={loading || !feeling.trim()}
              className="btn-disco"
              style={{
                width: "100%",
                border: "none",
                borderRadius: 10,
                padding: "16px 0",
                color: "#ffffff",
                fontSize: 18,
                fontFamily: "var(--font-bebas), sans-serif",
                letterSpacing: 6,
                cursor: loading || !feeling.trim() ? "not-allowed" : "pointer",
                opacity: loading || !feeling.trim() ? 0.6 : 1,
              }}
            >
              {loading ? "⟳ GENERATING..." : "✦ GENERATE PLAYLIST ✦"}
            </button>
          </div>

          {/* loading - apare cat timp claude genereaza */}
          {loading && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <p style={{
                color: "#9b5de5",
                fontFamily: "var(--font-courier), monospace",
                fontSize: 14,
                letterSpacing: 4,
                animation: "neonPulse 1s ease-in-out infinite",
              }}>
                the dj is picking the vibes... 
              </p>
            </div>
          )}

          {/* playlist ul generat - apare dupa ce claude raspunde */}
          {playlist && (
            <div>
              <p style={{
                color: "#f15bb5",
                fontFamily: "var(--font-bebas), sans-serif",
                fontSize: 28,
                letterSpacing: 6,
                marginBottom: 20,
                textAlign: "center",
              }}>
                ✦ {playlist.playlist.length} songs for you ✦
              </p>

              {/* buton salvare sau deschidere playlist in spotify */}
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                {spotifyUrl ? (
                  // dupa salvare - link direct catre playlist
                  <a href={spotifyUrl} target="_blank" className="btn-spotify">
                    ✦ OPEN IN SPOTIFY ✦
                  </a>
                ) : (
                  // inainte de salvare - apeleaza saveToSpotify
                  <button
                    onClick={saveToSpotify}
                    className="btn-spotify"
                    style={{ border: "none", cursor: "pointer" }}
                  >
                    ✦ SAVE IN SPOTIFY ✦
                  </button>
                )}
              </div>

              {/* lista de melodii */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {playlist.playlist.map((song, index) => (
                  <div
                    key={index}
                    className="card-animate card-glow"
                    style={{
                      background: "linear-gradient(135deg, #ffffff06, #9b5de508)",
                      border: "1px solid #9b5de522",
                      borderRadius: 12,
                      padding: "16px 20px",
                      display: "flex",
                      gap: 16,
                      alignItems: "flex-start",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                      // fiecare card apare cu o mica intarziere
                      animationDelay: `${index * 0.05}s`,
                      opacity: 0,
                    }}
                  >
                    {/* numarul melodiei */}
                    <span style={{
                      fontFamily: "var(--font-bebas), sans-serif",
                      fontSize: 32,
                      color: "#9b5de544",
                      lineHeight: 1,
                      minWidth: 40,
                    }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div style={{ flex: 1 }}>
                      <p style={{
                        color: "#ffffff",
                        fontSize: 16,
                        fontWeight: 700,
                        margin: "0 0 4px 0",
                        fontFamily: "var(--font-courier), monospace",
                      }}>
                        {song.title}
                      </p>
                      <p style={{
                        color: "#f15bb5",
                        fontSize: 13,
                        margin: "0 0 8px 0",
                        fontFamily: "var(--font-courier), monospace",
                      }}>
                        {song.artist} · {song.year}
                      </p>
                      {/* motivul pentru care claude a ales melodia */}
                      <p style={{
                        color: "#ffffff55",
                        fontSize: 12,
                        margin: 0,
                        fontFamily: "var(--font-courier), monospace",
                        fontStyle: "italic",
                        lineHeight: 1.6,
                      }}>
                        {song.reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}