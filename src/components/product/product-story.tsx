import { Video } from "@/components/video";

export function ProductStory() {
  return (
    <section className="story" id="story">
      <div>
        <p className="eyebrow">A room of sound</p>
        <h2>Sound that settles<br />naturally into the room</h2>
      </div>
      <Video
        src="/speaker-demo.mp4"
        poster="/speaker-demo-poster.jpg"
        width={1920}
        height={1080}
        loading="lazy"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
    </section>
  );
}
