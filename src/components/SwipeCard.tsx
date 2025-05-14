import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import type { Profile } from "../data/mockProfiles";

interface SwipeCardProps {
  profile: Profile;
  onSwipe: (direction: "left" | "right") => void;
}

export const SwipeCard = ({ profile, onSwipe }: SwipeCardProps) => {
  const [{ x, y, rotate }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotate: 0,
  }));

  const bind = useDrag(
    ({
      movement: [mx],
      direction: [xDir],
      velocity: [vx],
      cancel,
    }: {
      movement: [number, number];
      direction: [number, number];
      velocity: [number, number];
      cancel: () => void;
    }) => {
      const trigger = vx > 0.2;
      const dir = xDir < 0 ? -1 : 1;

      if (trigger) {
        onSwipe(dir === 1 ? "right" : "left");
        cancel();
      }

      api.start({
        x: trigger ? (200 + window.innerWidth) * dir : mx,
        rotate: mx / 20,
        immediate: false,
      });
    }
  );

  return (
    <animated.div
      {...bind()}
      style={{
        x,
        y,
        rotate,
        touchAction: "none",
      }}
      className="absolute w-full max-w-sm bg-white rounded-xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing"
    >
      <div className="relative aspect-[3/4]">
        <img
          src={profile.avatarUrl}
          alt={profile.username}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">@{profile.username}</h2>
          <div className="flex gap-4 mb-3">
            <span>{profile.followers} followers</span>
            <span>{profile.following} following</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.languages.map((lang) => (
              <span
                key={lang}
                className="px-3 py-1 bg-white/20 rounded-full text-sm"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </animated.div>
  );
};
