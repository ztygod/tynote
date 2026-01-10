import { useEffect, useState } from "react";

export function WelcomeSection() {
  const greeting = getGreeting();
  const userName = "Alex";
  const [isWaving, setIsWaving] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWaving(false);
    }, 1000); // 1秒后停止挥动
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold tracking-tight text-foreground animate-in fade-in duration-1000">
        {greeting} {userName}!{" "}
        <span
          className="inline-block origin-[70%_70%]"
          style={{
            animation: isWaving ? "wave 0.6s ease-in-out 2" : "none",
          }}
        >
          👋
        </span>
      </h1>
      <p className="text-lg text-muted-foreground mt-2">
        今天是个创造的好日子。
      </p>
      <style>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(15deg); }
          50% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
      `}</style>
    </div>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "早上好";
  if (hour < 18) return "下午好";
  return "晚上好";
}
