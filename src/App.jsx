import React, { useEffect, useMemo, useRef, useState } from "react";
import { LazyMotion, domAnimation, motion } from "framer-motion";
import sanaLogo from "./assets/sana-logo.png";
import voiceMp3 from "./assets/voice.mp3";
import {
  BookOpen,
  Building2,
  Crown,
  ExternalLink,
  Eye,
  Globe,
  Headphones,
  HeartHandshake,
  Languages,
  Layers3,
  Link2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Mic2,
  MonitorPlay,
  Pause,
  Play,
  Radio,
  RotateCcw,
  Send,
  ShieldCheck,
  SkipBack,
  SkipForward,
  Sparkles,
  Stars,
  Target,
  Users,
  Volume2,
} from "lucide-react";

const ACCENT = "#E7C56D";
const CTA_DARK = "#16090A";

const OUTER_GRADIENT =
  "bg-[linear-gradient(135deg,rgba(64,14,23,0.97)_0%,rgba(110,27,42,0.95)_36%,rgba(168,44,63,0.93)_72%,rgba(229,191,109,0.88)_100%)]";
const INNER_GRADIENT =
  "bg-[linear-gradient(135deg,rgba(40,8,14,0.98)_0%,rgba(73,13,24,0.96)_40%,rgba(112,24,37,0.94)_72%,rgba(167,54,67,0.90)_100%)]";
const CARD_SURFACE =
  "bg-[linear-gradient(135deg,rgba(69,10,20,0.96)_0%,rgba(92,13,26,0.95)_34%,rgba(117,22,37,0.93)_68%,rgba(63,23,29,0.94)_100%)]";
const CARD_TOP_STRIP =
  "bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.04)_18%,rgba(188,54,73,0.22)_100%)]";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

const pulseGlow = {
  opacity: [0.2, 0.45, 0.2],
  scale: [1, 1.03, 1],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
};

const containerClass =
  "relative z-10 mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-10 xl:px-14";
const glass =
  `border border-rose-200/20 ${OUTER_GRADIENT} md:backdrop-blur-xl backdrop-blur-sm shadow-[0_14px_34px_rgba(84,7,20,0.34)]`;
const softCard = `rounded-[2rem] border border-white/10 ${OUTER_GRADIENT} md:backdrop-blur-xl backdrop-blur-sm shadow-[0_14px_34px_rgba(84,7,20,0.34)]`;
const gradientOuterCard = `rounded-[2rem] border border-white/10 ${OUTER_GRADIENT} md:backdrop-blur-xl backdrop-blur-sm shadow-[0_14px_34px_rgba(84,7,20,0.34)]`;

const navItems = [
  { label: "Rreth nesh", href: "#about" },
  { label: "Veçoritë", href: "#features" },
  { label: "Punimet tona", href: "#portfolio" },
  { label: "Partnerët e suksesit", href: "#partners" },
  { label: "Na kontaktoni", href: "#contact" },
];

const stats = [
  { value: "+100", label: "Gjuhë botërore të synuara" },
  { value: "24/7", label: "Shtrirje globale e vazhdueshme" },
  { value: "114", label: "Sura të plota" },
  { value: "HQ", label: "Cilësi e lartë audio dhe video" },
];

const heroCards = [
  { value: "114", label: "Sura të plota" },
  { value: "30", label: "Pjesë nga Kurani" },
  { value: "Profesionale", label: "Prezantim audio-vizual" },
];

const heroBadges = [
  { icon: Sparkles, title: "Drita dhe bukuria e Kuranit" },
  { icon: Globe, title: "Mesazh për botën" },
];

const identityCards = [
  {
    icon: Users,
    title: "Rreth nesh",
    text: "Sana është një projekt vakëfi që synon të përcjellë kuptimet e Kuranit Fisnik te bota, përmes kanaleve audio dhe vizuale që ndërthurin leximin e bukur me përkthimin e saktë, për të ofruar një përvojë shpirtërore të plotë që e afron Fjalën e Allahut me zemrat në gjuhë të ndryshme të botës.",
  },
  {
    icon: Eye,
    title: "Vizioni",
    text: "Të jemi një platformë globale udhëheqëse në përcjelljen e kuptimeve të Kuranit Fisnik te çdo njeri në gjuhën e tij, me një stil bashkëkohor që ndërthur bukurinë, përsosmërinë dhe teknologjinë moderne.",
  },
  {
    icon: Target,
    title: "Misioni",
    text: "Të ofrojmë përmbajtje kuranore audio-vizuale të përkthyer, që mundëson kuptimin e qartë dhe të lehtë të domethënieve të Kuranit Fisnik dhe kontribuon në përhapjen e udhëzimit dhe njohjen e botës me Fjalën e Allahut në një mënyrë tërheqëse dhe ndikuese.",
  },
];

const features = [
  {
    icon: Languages,
    title: "Përkthime në shumë gjuhë",
    desc: "Përcjellja e kuptimeve të Kuranit Fisnik te popujt në gjuhët e tyre, me një stil të qartë dhe të saktë që ruan domethënien dhe mesazhin.",
  },
  {
    icon: Headphones,
    title: "Përvojë e plotë audio-vizuale",
    desc: "Kanale që bashkojnë leximin prekës me tekstin e përkthyer në një përvojë të qetë, të denjë për madhështinë e Kuranit Fisnik.",
  },
  {
    icon: Globe,
    title: "Shtrirje globale e vazhdueshme",
    desc: "Prani dixhitale dhe satelitore që hap dyert e aksesit në kontinente dhe platforma të ndryshme gjatë gjithë kohës.",
  },
  {
    icon: HeartHandshake,
    title: "Vakëf për hir të Allahut",
    desc: "Një mesazh global thirrës në të mirën, në shpërblimin e të cilit merr pjesë kushdo që kontribuon në përhapjen, mbështetjen ose përfitimin prej tij.",
  },
];

const channels = [
  {
    icon: Radio,
    title: "Kanale satelitore dhe radiofonike",
    desc: "Përhapja e kuptimeve të Kuranit Fisnik përmes kanaleve audio dhe vizuale që arrijnë te popuj të ndryshëm në gjuhët e tyre.",
  },
  {
    icon: MonitorPlay,
    title: "Rrjetet sociale dhe faqet e internetit",
    desc: "Një prani dixhitale e përditësuar që e bën më të lehtë aksesin në përmbajtjen kuranore dhe shpërndarjen e saj gjerësisht.",
  },
  {
    icon: Layers3,
    title: "Aplikacione dhe media të ndryshme dixhitale",
    desc: "Një përvojë moderne dhe e larmishme që mundëson ndjekjen e përmbajtjes kuranore në forma që i përshtaten pajisjeve dhe platformave të ndryshme.",
  },
];

const partners = [
  {
    icon: ShieldCheck,
    title: "Institucione fetare dhe organizata islame",
    desc: "Të cilat kanë kontribuar në ofrimin e përkthimeve të miratuara të kuptimeve të Kuranit Fisnik, duke garantuar saktësinë dhe bazën e duhur fetare.",
  },
  {
    icon: Mic2,
    title: "Lexues me zëra të bukur dhe ndikues",
    desc: "Të cilët e kanë pasuruar projektin me recitime të përulura dhe prekëse që arrijnë zemrat me një stil të dashur dhe tërheqës.",
  },
  {
    icon: Headphones,
    title: "Kompani të prodhimit audio dhe teknik",
    desc: "Të cilat kanë ofruar regjistrime me cilësi të lartë dhe përpunim profesional audio-vizual.",
  },
  {
    icon: Users,
    title: "Producentë dhe vullnetarë",
    desc: "Të cilët kanë kontribuar në zhvillimin dhe publikimin e përmbajtjes, në mënyrë që ajo të arrijë te sa më shumë njerëz në mbarë botën.",
  },
];

const impactCards = [
  {
    icon: Globe,
    title: "Shtrirje globale",
    desc: "Mesazhi i Kuranit Fisnik ka arritur në shtëpi në vende të ndryshme të botës, në shumë gjuhë që u flasin njerëzve në gjuhën e tyre amtare.",
  },
  {
    icon: Languages,
    title: "Përkthime të besueshme",
    desc: "Janë ofruar përkthime të sakta të kuptimeve të Kuranit Fisnik nën mbikëqyrjen e institucioneve të besueshme shkencore për të garantuar saktësinë e domethënies.",
  },
  {
    icon: Headphones,
    title: "Përvojë e integruar",
    desc: "Përmbajtje që ndërthur recitimin e përulur me përkthimin vizual për të ofruar një përvojë shpirtërore prekëse dhe të lehtë për t’u kuptuar.",
  },
  {
    icon: Send,
    title: "Mesazh i vazhdueshëm",
    desc: "Projekti kontribuon në përhapjen e udhëzimit dhe njohjen e botës me Fjalën e Allahut në një stil bashkëkohor që arrin te kategori të ndryshme.",
  },
];

const portfolioVideos = [
  `${import.meta.env.BASE_URL}videos/v1.mp4`,
  `${import.meta.env.BASE_URL}videos/v2.mp4`,
  `${import.meta.env.BASE_URL}videos/v3.mp4`,
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

function sectionBadge(icon, text, textColor = "text-white") {
  const Icon = icon;
  return (
    <div
      className={`inline-flex max-w-full items-center justify-center gap-3 rounded-full border border-white/25 px-4 py-2 text-xs ${textColor} backdrop-blur-md shadow-[0_0_12px_rgba(255,255,255,0.08)] sm:px-5 sm:py-3 sm:text-sm`}
    >
      <Icon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" style={{ color: ACCENT }} />
      <span className="max-w-[calc(100vw-7rem)] text-center whitespace-normal break-words leading-5 sm:max-w-none sm:leading-normal">
        {text}
      </span>
    </div>
  );
}

function LargeSectionBadge({ icon: Icon, text }) {
  return (
    <div
      className="inline-flex max-w-full items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-base font-bold backdrop-blur-xl shadow-[0_10px_24px_rgba(0,0,0,0.22)] sm:px-8 sm:py-4 sm:text-xl lg:text-2xl"
      style={{ color: ACCENT }}
    >
      <Icon className="h-5 w-5 shrink-0 sm:h-7 sm:w-7" style={{ color: ACCENT }} />
      <span className="truncate">{text}</span>
    </div>
  );
}

function AppStoreIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M9 15.5 14.5 8" />
      <path d="M11 8h4" />
      <path d="M9.5 15.5H15" />
      <path d="M10.5 12h5" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 4.5v15l8.8-7.5L5 4.5Z" />
      <path d="m13.8 12 3.6-3 1.6 1.1c1.2.8 1.2 2.1 0 2.9L17.4 14l-3.6-2Z" />
      <path d="m17.4 9-8.2-3.6" />
      <path d="m17.4 15-8.2 3.6" />
    </svg>
  );
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function HeroAudioPlayer({ isMobile }) {
  const audioRef = useRef(null);
  const blobUrlRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationFrameRef = useRef(null);
  const previousBarsRef = useRef([]);

  const BARS_COUNT = isMobile ? 24 : 48;
  const HALF_BARS = BARS_COUNT / 2;
  const MIN_BAR_HEIGHT = isMobile ? 8 : 10;
  const MAX_BAR_HEIGHT = isMobile ? 22 : 34;

  const idleBars = useMemo(() => {
    const half = Array.from({ length: HALF_BARS }, (_, i) => {
      const t = i / Math.max(1, HALF_BARS - 1);
      return Math.round((isMobile ? 9 : 12) + t * 3);
    });
    return [...half.slice().reverse(), ...half];
  }, [HALF_BARS, isMobile]);

  const [bars, setBars] = useState(idleBars);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    previousBarsRef.current = idleBars;
    setBars(idleBars);
  }, [idleBars]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let cancelled = false;

    const loadAudioAsBlob = async () => {
      try {
        const response = await fetch(voiceMp3, { cache: "force-cache" });
        const blob = await response.blob();
        if (cancelled) return;

        const objectUrl = URL.createObjectURL(blob);
        blobUrlRef.current = objectUrl;
        audio.src = objectUrl;
        audio.load();
      } catch {
        if (!cancelled) {
          audio.src = voiceMp3;
          audio.load();
        }
      }
    };

    loadAudioAsBlob();

    return () => {
      cancelled = true;
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTime = () => setCurrentTime(audio.currentTime || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      previousBarsRef.current = idleBars;
      setBars(idleBars);
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("durationchange", onLoaded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("durationchange", onLoaded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, [idleBars]);

  useEffect(() => {
    if (isMobile && !isPlaying) {
      previousBarsRef.current = idleBars;
      setBars(idleBars);
      return;
    }

    if (!isPlaying) {
      previousBarsRef.current = idleBars;
      setBars(idleBars);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const analyser = analyserRef.current;
    if (!analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const animateBars = () => {
      analyser.getByteFrequencyData(dataArray);

      let total = 0;
      for (let i = 0; i < bufferLength; i += 1) total += dataArray[i];
      const globalEnergy = total / bufferLength / 255;

      const halfBars = Array.from({ length: HALF_BARS }, (_, index) => {
        const start = Math.floor((index / HALF_BARS) * bufferLength);
        const end = Math.floor(((index + 1) / HALF_BARS) * bufferLength);

        let localSum = 0;
        let count = 0;

        for (let i = start; i < end; i += 1) {
          localSum += dataArray[i];
          count += 1;
        }

        const localEnergy = count ? localSum / count / 255 : 0;
        const mixedEnergy = localEnergy * 0.68 + globalEnergy * 0.32;
        const height =
          MIN_BAR_HEIGHT +
          mixedEnergy * (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT);

        return clamp(height, MIN_BAR_HEIGHT, MAX_BAR_HEIGHT);
      });

      const mirroredBars = [...halfBars.slice().reverse(), ...halfBars];

      const animatedBars = mirroredBars.map((value, index) => {
        const previous = previousBarsRef.current[index] ?? idleBars[index];
        return Math.round(previous * 0.55 + value * 0.45);
      });

      previousBarsRef.current = animatedBars;
      setBars(animatedBars);
      animationFrameRef.current = requestAnimationFrame(animateBars);
    };

    animationFrameRef.current = requestAnimationFrame(animateBars);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [HALF_BARS, MAX_BAR_HEIGHT, MIN_BAR_HEIGHT, idleBars, isPlaying, isMobile]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const setupAnalyser = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioContextRef.current) {
      const context = new AudioContextClass();
      const analyser = context.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.92;

      const source = context.createMediaElementSource(audio);
      source.connect(analyser);
      analyser.connect(context.destination);

      audioContextRef.current = context;
      analyserRef.current = analyser;
    }

    if (audioContextRef.current?.state === "suspended") {
      await audioContextRef.current.resume().catch(() => {});
    }
  };

  const progress = useMemo(
    () => (duration ? (currentTime / duration) * 100 : 0),
    [currentTime, duration]
  );

  const togglePlay = async () => {
    const el = audioRef.current;
    if (!el) return;

    await setupAnalyser();

    if (el.paused) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  };

  const seekBy = (delta) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Math.max(
      0,
      Math.min(el.duration || 0, (el.currentTime || 0) + delta)
    );
  };

  const replay = async () => {
    const el = audioRef.current;
    if (!el) return;
    await setupAnalyser();
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  const toggleMute = () => {
    const el = audioRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
  };

  const handleSeek = (event) => {
    const el = audioRef.current;
    if (!el) return;
    const next = Number(event.target.value);
    el.currentTime = next;
    setCurrentTime(next);
  };

  return (
    <div className={`mt-5 rounded-[1.35rem] border border-white/10 ${CARD_SURFACE} p-3 sm:p-4`}>
      <audio
        ref={audioRef}
        preload="metadata"
        onContextMenu={(e) => e.preventDefault()}
      />

      <div className="mb-4 flex h-14 items-end gap-[2px] overflow-hidden rounded-2xl border border-white/10 bg-black/10 px-2 py-3 sm:h-18">
        {bars.map((height, index) => (
          <motion.div
            key={index}
            animate={{ height }}
            transition={{ duration: isMobile ? 0.2 : 0.14, ease: "easeOut" }}
            className="flex-1 self-end rounded-full bg-gradient-to-t from-red-700 via-amber-300 to-rose-500 opacity-95"
            style={{ maxHeight: `${MAX_BAR_HEIGHT}px` }}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label={isPlaying ? "Pauzo" : "Luaj"}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" style={{ color: ACCENT }} />
          ) : (
            <Play className="h-4 w-4" style={{ color: ACCENT }} />
          )}
        </button>

        <button
          type="button"
          onClick={() => seekBy(-10)}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="Kthehu prapa"
        >
          <SkipBack className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={replay}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="Riluaj"
        >
          <RotateCcw className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={() => seekBy(10)}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="Ec përpara"
        >
          <SkipForward className="h-4 w-4" style={{ color: ACCENT }} />
        </button>

        <button
          type="button"
          onClick={toggleMute}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          aria-label="Zëri"
        >
          <Volume2
            className={`h-4 w-4 ${muted ? "opacity-50" : ""}`}
            style={{ color: ACCENT }}
          />
        </button>

        <div className="min-w-[52px] text-xs text-white/75">
          {formatTime(currentTime)}
        </div>

        <div className="relative h-2 w-full flex-1 overflow-visible rounded-full bg-white/10">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-rose-700 via-amber-300 to-red-500"
            style={{ width: `${progress}%` }}
          />
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="audio-range absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent"
            style={{ WebkitAppearance: "none" }}
          />
        </div>
      </div>

      <style>{`
        .audio-range::-webkit-slider-runnable-track { height: 8px; background: transparent; }
        .audio-range::-moz-range-track { height: 8px; background: transparent; }
        .audio-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          margin-top: -3px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.9);
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
        .audio-range::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.9);
          border-radius: 999px;
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
      `}</style>
    </div>
  );
}

function StructuredCard({ icon: Icon, title, desc, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${gradientOuterCard} h-full p-[1px]`}
    >
      <div className={`h-full rounded-[calc(2rem-1px)] border border-white/10 ${CARD_SURFACE} p-4 sm:p-5`}>
        <div className={`flex items-center gap-3 rounded-2xl border border-white/10 ${CARD_TOP_STRIP} px-4 py-3`}>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-rose-500/15">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <h3 className="text-base font-bold leading-7 text-white sm:text-lg lg:text-xl">
            {title}
          </h3>
        </div>
        <div className={`mt-4 rounded-2xl border border-white/10 ${CARD_SURFACE} px-4 py-4 text-sm leading-7 text-white/78 sm:text-base sm:leading-8`}>
          {desc}
        </div>
      </div>
    </motion.div>
  );
}

function IdentityCard({ icon: Icon, title, text, large = false, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${softCard} h-full p-[1px]`}
    >
      <div className={`h-full rounded-[calc(2rem-1px)] border border-white/10 ${CARD_SURFACE} p-4 sm:p-5`}>
        <div className={`flex items-center gap-3 rounded-2xl border border-white/10 ${CARD_TOP_STRIP} px-4 py-3`}>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-rose-500/15">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <div
            className={`rounded-2xl border border-white/10 ${OUTER_GRADIENT} px-4 py-2 font-bold text-white ${
              large ? "text-lg sm:text-xl" : "text-base sm:text-lg"
            }`}
          >
            {title}
          </div>
        </div>
        <div
          className={`mt-4 rounded-2xl border border-white/10 ${CARD_SURFACE} px-4 py-4 text-white/80 ${
            large
              ? "text-base leading-8 sm:text-lg sm:leading-9 lg:text-xl lg:leading-10"
              : "text-base leading-8 sm:text-lg"
          }`}
        >
          {text}
        </div>
      </div>
    </motion.div>
  );
}

function ImpactCard({ icon: Icon, title, desc, isMobile }) {
  return (
    <motion.div
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${softCard} h-full p-[1px]`}
    >
      <div className={`h-full rounded-[calc(2rem-1px)] border border-white/10 ${CARD_SURFACE} p-4 sm:p-5`}>
        <div className={`flex items-center gap-3 rounded-2xl border border-white/10 ${CARD_TOP_STRIP} px-4 py-3`}>
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-yellow-100/10">
            <Icon className="h-5 w-5" style={{ color: ACCENT }} />
          </div>
          <h3 className="text-base font-bold text-white sm:text-lg lg:text-xl">
            {title}
          </h3>
        </div>
        <div className={`mt-4 rounded-2xl border border-white/10 ${CARD_SURFACE} px-4 py-4 text-sm leading-7 text-white/78 sm:text-base sm:leading-8`}>
          {desc}
        </div>
      </div>
    </motion.div>
  );
}

function ProtectedHlsVideoCard({
  video,
  index,
  isMobile,
  videoId,
  registerVideo,
  unregisterVideo,
  requestExclusivePlay,
}) {
  const videoRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;

    registerVideo(videoId, element);

    const onLoaded = () => {
      setDuration(element.duration || 0);
      setIsReady(true);
    };

    const onTimeUpdate = () => setCurrentTime(element.currentTime || 0);

    const onPlay = () => {
      requestExclusivePlay(videoId);
      setIsPlaying(true);
    };

    const onPause = () => setIsPlaying(false);

    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    element.addEventListener("loadedmetadata", onLoaded);
    element.addEventListener("loadeddata", onLoaded);
    element.addEventListener("canplay", onLoaded);
    element.addEventListener("durationchange", onLoaded);
    element.addEventListener("timeupdate", onTimeUpdate);
    element.addEventListener("play", onPlay);
    element.addEventListener("pause", onPause);
    element.addEventListener("ended", onEnded);

    return () => {
      unregisterVideo(videoId);
      element.removeEventListener("loadedmetadata", onLoaded);
      element.removeEventListener("loadeddata", onLoaded);
      element.removeEventListener("canplay", onLoaded);
      element.removeEventListener("durationchange", onLoaded);
      element.removeEventListener("timeupdate", onTimeUpdate);
      element.removeEventListener("play", onPlay);
      element.removeEventListener("pause", onPause);
      element.removeEventListener("ended", onEnded);
    };
  }, [registerVideo, requestExclusivePlay, unregisterVideo, videoId]);

  const progress = useMemo(
    () => (duration ? (currentTime / duration) * 100 : 0),
    [currentTime, duration]
  );

  const playVideo = () => {
    const el = videoRef.current;
    if (!el) return;

    requestExclusivePlay(videoId);
    el.play().catch(() => {});
  };

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;

    if (el.paused) {
      playVideo();
    } else {
      el.pause();
    }
  };

  const replayVideo = () => {
    const el = videoRef.current;
    if (!el) return;

    requestExclusivePlay(videoId);
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  const handleSeek = (e) => {
    const el = videoRef.current;
    if (!el) return;
    const next = Number(e.target.value);
    el.currentTime = next;
    setCurrentTime(next);
  };

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    const next = !el.muted;
    el.muted = next;
    setMuted(next);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 12 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.5, delay: isMobile ? 0 : index * 0.08 }}
      whileHover={isMobile ? {} : { y: -6, scale: 1.01 }}
      className={`${softCard} p-[1px]`}
    >
      <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/30">
        <video
          ref={videoRef}
          src={video}
          className="aspect-video w-full object-cover"
          playsInline
          preload="auto"
          controls={false}
          muted={muted}
          onContextMenu={(e) => e.preventDefault()}
        />

        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/15 transition hover:bg-black/10"
            aria-label="Luaj videon"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md shadow-[0_0_22px_rgba(193,18,31,0.22)] sm:h-18 sm:w-18">
              <Play className="ml-1 h-7 w-7 text-white" />
            </span>
          </button>
        )}

        <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[11px] text-white/80 backdrop-blur-md">
          {isReady ? "Pamja paraprake është gati" : "Po përgatitet parapamja"}
        </div>
      </div>

      <div className={`mt-4 rounded-[1.3rem] border border-white/10 ${CARD_SURFACE} p-3 sm:p-4`}>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={toggleMute}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label="Aktivizo ose çaktivizo zërin"
          >
            <Volume2
              className={`h-4 w-4 ${muted ? "opacity-50" : ""}`}
              style={{ color: ACCENT }}
            />
          </button>

          <button
            type="button"
            onClick={replayVideo}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label="Riluaj"
          >
            <RotateCcw className="h-4 w-4" style={{ color: ACCENT }} />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            aria-label={isPlaying ? "Pauzo" : "Luaj"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" style={{ color: ACCENT }} />
            ) : (
              <Play className="h-4 w-4" style={{ color: ACCENT }} />
            )}
          </button>

          <div className="min-w-[52px] text-xs text-white/75">
            {formatTime(currentTime)}
          </div>

          <div className="relative h-2 w-full flex-1 overflow-visible rounded-full bg-white/10">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-rose-700 via-amber-300 to-red-500"
              style={{ width: `${progress}%` }}
            />
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="video-range absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent"
            />
          </div>
        </div>
      </div>

      <style>{`
        .video-range::-webkit-slider-runnable-track { height: 8px; background: transparent; }
        .video-range::-moz-range-track { height: 8px; background: transparent; }
        .video-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          margin-top: -3px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.9);
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
        .video-range::-moz-range-thumb {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.9);
          border-radius: 999px;
          background: ${ACCENT};
          box-shadow: 0 0 0 3px rgba(255,255,255,0.08);
        }
      `}</style>
    </motion.div>
  );
}

export default function QuranTranslationLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const videoElementsRef = useRef({});

  const registerVideo = (videoId, element) => {
    videoElementsRef.current[videoId] = element;
  };

  const unregisterVideo = (videoId) => {
    delete videoElementsRef.current[videoId];
  };

  const requestExclusivePlay = (activeVideoId) => {
    Object.entries(videoElementsRef.current).forEach(([videoId, element]) => {
      if (videoId !== String(activeVideoId) && element && !element.paused) {
        element.pause();
      }
    });
  };

  return (
    <LazyMotion features={domAnimation}>
      <div
        dir="ltr"
        className="relative min-h-screen overflow-hidden bg-transparent text-white selection:bg-[#C1121F]/40 selection:text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(193,18,31,0.28),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(231,197,109,0.16),transparent_22%),radial-gradient(circle_at_20%_80%,rgba(127,29,29,0.18),transparent_24%),linear-gradient(180deg,#040102_0%,#110306_36%,#22070D_64%,#070103_100%)]" />

        {!isMobile && (
          <>
            <motion.div
              className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-rose-600/20 blur-3xl"
              animate={pulseGlow}
            />
            <div className="absolute inset-0 opacity-[0.06]">
              <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:44px_44px]" />
            </div>
          </>
        )}

        <div className={containerClass}>
          <header className="pt-4 sm:pt-6">
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className={`mx-auto flex items-center justify-between gap-3 rounded-[1.5rem] px-3 py-3 sm:rounded-[2rem] sm:px-4 ${glass}`}
            >
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-amber-200/20 bg-white/10 shadow-[0_0_16px_rgba(193,18,31,0.22)] sm:h-16 sm:w-16">
                  <img
                    src={sanaLogo}
                    alt="Logo e kanaleve kuranore Sana"
                    className="h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div className="truncate text-sm font-bold tracking-wide sm:text-xl">
                  Kanalet Kuranore Sana
                </div>
              </div>

              <nav className="hidden items-center gap-3 md:flex">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 transition hover:border-amber-300/40 hover:bg-white/10 hover:text-amber-100"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 md:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </motion.div>

            {menuOpen && (
              <div className={`mt-3 rounded-[1.4rem] p-3 md:hidden sm:rounded-[1.6rem] sm:p-4 ${glass}`}>
                <div className="grid gap-2">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 sm:text-base"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </header>

          <section className="relative grid min-h-[auto] items-center gap-10 py-10 sm:gap-12 sm:py-14 lg:min-h-[84vh] lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
            <div className="order-1 lg:order-1">
              <motion.div
                custom={0}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs backdrop-blur-xl shadow-[0_8px_20px_rgba(0,0,0,0.25)] sm:text-sm"
                style={{ color: ACCENT }}
              >
                <Stars className="h-4 w-4" style={{ color: ACCENT }} />
                <span>Sana... mesazh për botët</span>
              </motion.div>

              <motion.h1
                custom={1}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="text-3xl font-black leading-[1.25] sm:text-5xl lg:text-7xl"
              >
                <span className="block bg-gradient-to-r from-[#FAE7AF] via-amber-200 to-rose-200 bg-clip-text text-transparent">
                  Kanalet Kuranore Sana
                </span>
              </motion.h1>

              <motion.p
                custom={2}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8 lg:text-xl"
              >
                Kanale audio-vizuale për përkthimin e kuptimeve të Kuranit Fisnik në të gjitha gjuhët botërore - vakëf për hir të Allahut.
              </motion.p>

              <motion.div
                custom={3}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4"
              >
                <a
                  href="#features"
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl border px-6 py-3.5 text-sm font-bold shadow-[0_12px_30px_rgba(110,8,25,0.34)] transition hover:scale-[1.02] sm:px-7 sm:py-4 sm:text-base"
                  style={{
                    backgroundColor: CTA_DARK,
                    borderColor: "rgba(243,231,179,0.18)",
                    color: ACCENT,
                  }}
                >
                  <Sparkles
                    className="h-5 w-5 transition group-hover:rotate-12"
                    style={{ color: ACCENT }}
                  />
                  Zbulo platformën
                </a>

                <a
                  href="https://www.youtube.com/@SANA-Shqip"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-amber-300/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/15 sm:px-7 sm:py-4 sm:text-base"
                >
                  <Play className="h-5 w-5" />
                  Vizitoni kanalin tonë
                </a>
              </motion.div>

              <motion.div
                custom={4}
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4"
              >
                {stats.map((item, i) => (
                  <motion.div
                    key={item.label}
                    animate={isMobile ? {} : { y: [0, -4, 0] }}
                    transition={
                      isMobile
                        ? {}
                        : {
                            duration: 4 + i,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }
                    }
                    className={`rounded-3xl border border-white/10 ${OUTER_GRADIENT} p-3 text-center backdrop-blur-md shadow-[0_10px_24px_rgba(84,7,20,0.24)] sm:p-4`}
                  >
                    <div className="text-xl font-black sm:text-2xl" style={{ color: ACCENT }}>
                      {item.value}
                    </div>
                    <div className="mt-2 text-xs text-white/70 sm:text-sm">{item.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, rotate: isMobile ? 0 : -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 relative lg:order-2"
            >
              <motion.div
                animate={isMobile ? {} : { y: [0, -10, 0] }}
                transition={isMobile ? {} : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className={`relative mx-auto max-w-2xl p-[1px] ${softCard}`}
              >
                <div className="rounded-[calc(2rem-1px)] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.10),rgba(255,255,255,0.03))] p-4 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs text-white/60 sm:text-sm">Gjuha aktuale</p>
                      <h3 className="mt-1 text-xl font-bold sm:text-2xl">
                        Kurani në gjuhën shqipe
                      </h3>
                    </div>
                    <div className="w-fit rounded-2xl border border-rose-300/20 bg-rose-600/20 px-4 py-2 text-xs text-amber-100 sm:text-sm">
                      Transmetim i drejtpërdrejtë
                    </div>
                  </div>

                  <div className={`mt-6 rounded-[1.4rem] border border-white/10 ${CARD_SURFACE} p-4 sm:mt-8 sm:p-6`}>
                    <div className="mb-4 flex items-start gap-3 text-sm text-white/80 sm:items-center sm:text-base">
                      <Headphones className="mt-0.5 h-5 w-5 shrink-0 text-amber-200 sm:mt-0" />
                      <span>Dëgjoni recitimin me paraqitje vizuale të kuptimeve të Kuranit Fisnik</span>
                    </div>

                    {!isMobile && (
                      <div className="space-y-3">
                        {[65, 88, 42].map((w, idx) => (
                          <motion.div
                            key={idx}
                            animate={{ width: [`${w - 14}%`, `${w}%`, `${w - 8}%`] }}
                            transition={{
                              duration: 3 + idx,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="h-3 rounded-full bg-gradient-to-r from-rose-700 via-amber-300 to-red-500"
                          />
                        ))}
                      </div>
                    )}

                    <div className="mt-6 grid grid-cols-1 gap-2 text-center sm:mt-8 sm:grid-cols-3 sm:gap-3">
                      {heroCards.map((item) => (
                        <div
                          key={item.label}
                          className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-xl shadow-[0_10px_24px_rgba(0,0,0,0.22)] sm:p-4"
                        >
                          <div className="text-sm font-bold sm:text-lg" style={{ color: ACCENT }}>
                            {item.value}
                          </div>
                          <div className="mt-1 break-words text-[11px] leading-4 text-white/60 sm:text-xs sm:leading-5">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <HeroAudioPlayer isMobile={isMobile} />
                  </div>
                </div>
              </motion.div>

              <div className="mx-auto mt-5 grid max-w-2xl gap-3 sm:mt-6 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
                {heroBadges.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="w-full rounded-[1.4rem] border border-white/15 bg-white/10 px-5 py-4 text-center backdrop-blur-xl shadow-[0_10px_24px_rgba(0,0,0,0.22)] sm:min-w-[220px] sm:w-auto sm:rounded-[1.6rem]"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <Icon className="h-5 w-5 shrink-0" style={{ color: ACCENT, opacity: 0.9 }} />
                        <div className="text-sm font-bold text-white sm:text-base">{item.title}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </section>

          <section id="about" className="py-4 lg:py-8">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-8 text-center"
            >
              <LargeSectionBadge icon={BookOpen} text="Identitet global kuranor" />
            </motion.div>

            <div className="space-y-6">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.16 }}
                custom={0}
                variants={fadeUp}
              >
                <IdentityCard {...identityCards[0]} large isMobile={isMobile} />
              </motion.div>

              <div className="grid gap-6 lg:grid-cols-2">
                {identityCards.slice(1).map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.16 }}
                    custom={i + 1}
                    variants={fadeUp}
                  >
                    <IdentityCard {...card} isMobile={isMobile} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-8 lg:py-12">
            <div className="mb-6 text-center">
              <LargeSectionBadge icon={Building2} text="Zbatim dhe mbikëqyrje" />
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              className={`relative overflow-hidden p-5 sm:p-6 md:p-10 ${gradientOuterCard}`}
            >
              {!isMobile && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(193,18,31,0.18),transparent_28%),radial-gradient(circle_at_80%_80%,rgba(231,197,109,0.16),transparent_32%)]" />
              )}

              <div className="relative z-10">
                <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
                  <div className={`rounded-[1.8rem] border border-white/10 ${CARD_SURFACE} p-4 sm:p-6`}>
                    <div className={`h-full rounded-2xl border border-white/10 ${CARD_SURFACE} p-4 sm:p-5`}>
                      <h2 className="text-2xl font-black sm:text-3xl lg:text-4xl">
                        Partneritet ekzekutiv i besueshëm
                      </h2>
                      <p className="mt-5 text-base leading-8 text-white/75 sm:text-lg">
                        Projekti{" "}
                        <span className="font-bold text-white">Kanalet Kuranore Sana</span>{" "}
                        zbatohen nga{" "}
                        <span className="font-bold" style={{ color: ACCENT }}>
                          Kompania Saudito-Jordaneze e Transmetimit Satelitor (Jasco)
                        </span>{" "}
                        – Amman, Jordani, me përvojë udhëheqëse në fushën e prodhimit dhe transmetimit mediatik.
                      </p>
                    </div>
                  </div>

                  <div className={`rounded-[1.8rem] border border-white/10 ${CARD_SURFACE} p-4 sm:p-6`}>
                    <div className={`flex h-full flex-col justify-center rounded-2xl border border-white/10 ${CARD_SURFACE} p-4 sm:p-5`}>
                      <div className="text-sm text-white/60">Faqja zyrtare</div>
                      <div className="mt-2 text-xl font-bold sm:text-2xl">Jasco Media City</div>
                      <a
                        href="https://jascomediacity.net/"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex w-fit items-center gap-2 rounded-2xl border border-amber-300/25 bg-rose-600/15 px-5 py-3 text-sm text-amber-100 transition hover:bg-rose-600/25 sm:text-base"
                      >
                        Vizitoni faqen e Jasco
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="features" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Sparkles, "Veçoritë e platformës")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                Sana... mesazh për botët
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                Një platformë kuranore që përdor mjetet më moderne për të përcjellë kuptimet e Kuranit Fisnik te mbarë bota, me një stil që bashkon bazën e saktë fetare me teknologjitë moderne.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {features.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section className="py-10 lg:py-14">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Send, "Mjetet e publikimit dhe shtrirjes")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">Kanale të shumta pranie</h2>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-3">
              {channels.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="portfolio" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Crown, "Punimet tona")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">Shembuj nga Punimet tona</h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                Recitime të bukura kuranore dhe përkthim i kuptimeve të ajeteve të Kuranit Fisnik në gjuhë të ndryshme të botës - Sana... mesazh për botët.
              </p>
            </motion.div>

            <div className="grid gap-5 lg:grid-cols-3">
              {portfolioVideos.map((video, i) => (
                <ProtectedHlsVideoCard
                  key={video}
                  video={video}
                  index={i}
                  isMobile={isMobile}
                  videoId={i}
                  registerVideo={registerVideo}
                  unregisterVideo={unregisterVideo}
                  requestExclusivePlay={requestExclusivePlay}
                />
              ))}
            </div>
          </section>

          <section className="py-12 lg:py-16">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Globe, "Ndikimi i projektit")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">
                Ndikimi i projektit dhe përhapja e tij në mbarë botën
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                Një mesazh global kuranor që ofroi përkthime të besueshme, dha një përvojë prekëse dhe ndihmoi që kuptimet e Kuranit Fisnik të arrijnë në shtëpi anembanë botës.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {impactCards.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <ImpactCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="partners" className="py-12 lg:py-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.16 }}
              variants={fadeUp}
              className="mb-10 text-center"
            >
              {sectionBadge(Users, "Partnerët e suksesit")}
              <h2 className="mt-5 text-2xl font-black sm:text-4xl lg:text-5xl">Sukses i krijuar nga bashkëpunimi</h2>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                Projekti e arriti suksesin falë bashkëpunimit me një grup institucionesh të dalluara, përfshirë organizata fetare, mediatike, prodhuese dhe vullnetarë.
              </p>
            </motion.div>

            <div className="grid gap-5 md:grid-cols-2">
              {partners.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={i}
                  variants={fadeUp}
                  className="h-full"
                >
                  <StructuredCard {...item} isMobile={isMobile} />
                </motion.div>
              ))}
            </div>
          </section>

          <section id="contact" className="py-8 lg:py-12">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <div className="text-center">
                <div
                  className="inline-flex max-w-full items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-base font-semibold backdrop-blur-xl shadow-[0_10px_24px_rgba(0,0,0,0.22)] sm:px-7 sm:py-4 sm:text-lg"
                  style={{ color: ACCENT }}
                >
                  <Sparkles className="h-5 w-5 shrink-0" style={{ color: ACCENT }} />
                  <span>Na kontaktoni</span>
                </div>

                <p className="mx-auto mt-5 max-w-4xl text-base leading-8 text-white/75 sm:text-lg">
                  Sana është një mesazh global thirrës në të mirën dhe jemi të lumtur të komunikojmë me ju, të pranojmë pyetjet, sugjerimet dhe partneritetet tuaja në çdo kohë, në mënyrë të qartë dhe të drejtpërdrejtë.
                </p>
              </div>

              <div
                className={`mt-8 rounded-[2rem] p-4 sm:p-6 md:p-8 ${gradientOuterCard}`}
              >
                <div className={`rounded-[2rem] border border-white/10 ${CARD_SURFACE} p-4 sm:p-6`}>
                  <div className={`rounded-[1.5rem] border border-white/10 ${CARD_SURFACE} p-4 sm:p-5`}>
                    <div className="mb-4 text-xl font-bold sm:text-2xl">Na kontaktoni</div>
                    <div className="space-y-3 text-white/75">
                      <div className={`rounded-2xl border border-white/10 ${CARD_SURFACE} px-4 py-3 text-sm sm:text-base`}>
                        Ekipi ynë do të jetë i lumtur t’ju ndihmojë dhe t’ju përgjigjet sa më shpejt.
                      </div>
                      <a
                        href="mailto:snachannel159@gmail.com"
                        className="flex items-center justify-center gap-3 rounded-2xl border border-amber-300/25 bg-rose-600/15 px-4 py-3 text-center text-sm font-semibold text-amber-100 transition hover:bg-rose-600/25 sm:text-base"
                      >
                        <Mail className="h-4 w-4" style={{ color: ACCENT }} />
                        Dërgo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <footer className="pb-8 pt-4 sm:pb-10">
            <div className={`rounded-[2rem] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 ${glass}`}>
              <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr_1fr]">
                <div
                  className={`rounded-[1.8rem] border border-white/10 p-4 text-center sm:p-6 ${INNER_GRADIENT} flex h-full flex-col items-center justify-center`}
                >
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/10 shadow-[0_0_18px_rgba(255,255,255,0.06)] backdrop-blur-md sm:h-24 sm:w-24">
                    <img
                      src={sanaLogo}
                      alt="Logo e Sana"
                      className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="mt-4">
                    <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-white/90 sm:px-5 sm:text-sm">
                      Kanalet Kuranore Sana
                    </span>
                  </div>

                  <div className="mt-4 text-2xl font-black sm:text-3xl" style={{ color: ACCENT }}>
                    Sana... mesazh për botët
                  </div>

                  <p className={`mx-auto mt-4 max-w-[30rem] rounded-[1.4rem] border border-white/10 ${CARD_SURFACE} px-4 py-4 text-sm leading-7 text-white/78 sm:px-5 sm:text-base sm:leading-8`}>
                    Kanale audio-vizuale për përkthimin e kuptimeve të Kuranit Fisnik në të gjitha gjuhët botërore, në një projekt vakëfi që bashkon bukurinë e paraqitjes, saktësinë e domethënies dhe frymën e mesazhit.
                  </p>
                </div>

                <div className={`rounded-[1.6rem] border border-white/10 ${OUTER_GRADIENT} p-4 sm:p-5 flex flex-col items-center justify-center text-center`}>
                  <div className="mb-5 flex flex-col items-center justify-center gap-4 text-lg font-bold text-white sm:text-xl">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_10px_24px_rgba(84,7,20,0.24)]">
                      <MessageCircle className="h-6 w-6" style={{ color: ACCENT }} />
                    </div>
                    <span>Detajet tona</span>
                  </div>

                  <div className="w-full space-y-4 text-white/72">
                    <a
                      href="mailto:snachannel159@gmail.com"
                      className={`flex items-center justify-center gap-3 break-all rounded-2xl border border-white/10 ${CARD_SURFACE} px-4 py-3 text-sm transition hover:bg-white/10 sm:text-base`}
                    >
                      <Mail className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                      snachannel159@gmail.com
                    </a>

                    <div className={`flex items-center justify-center gap-3 rounded-2xl border border-white/10 ${CARD_SURFACE} px-4 py-3 text-sm sm:text-base`}>
                      <MapPin className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
                      Amman - Jordani
                    </div>
                  </div>

                  <div className={`mt-6 w-full rounded-[1.4rem] border border-white/10 ${CARD_SURFACE} p-4`}>
                    <a
                      href="https://www.facebook.com/profile.php?id=61586776012201"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] hover:bg-white/10"
                    >
                      <Globe className="h-4 w-4" style={{ color: ACCENT }} />
                      Na ndiqni në Facebook
                    </a>

                    <p className="mt-4 text-center text-sm leading-6 text-white/70">
                      Nisni udhëtimin tuaj kuranor tani
                    </p>
                  </div>
                </div>

                <div className={`rounded-[1.8rem] border border-white/10 ${OUTER_GRADIENT} p-4 backdrop-blur-md sm:p-5 flex flex-col items-center justify-center text-center`}>
                  <div className="mb-5 flex flex-col items-center justify-center gap-4 text-lg font-bold text-white sm:text-xl">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_10px_24px_rgba(84,7,20,0.24)]">
                      <Link2 className="h-6 w-6" style={{ color: ACCENT }} />
                    </div>
                    <span>Lidhjet e aplikacionit tonë</span>
                  </div>

                  <div className={`w-full rounded-[1.4rem] border border-white/10 ${CARD_SURFACE} p-4`}>
                    <p className="mb-4 text-sm leading-7 text-white/65">
                      Shkarkoni aplikacionin dhe filloni të ndiqni përmbajtjen kuranore me lehtësi përmes platformave zyrtare.
                    </p>

                    <div className="grid gap-3 md:grid-cols-2">
                      <a
                        href="https://play.google.com/store/apps/details?id=com.sana_all&pcampaignid=web_share"
                        target="_blank"
                        rel="noreferrer"
                        className={`group rounded-[1.3rem] border border-white/10 ${OUTER_GRADIENT} p-4 transition hover:-translate-y-0.5 hover:brightness-110`}
                      >
                        <div className="flex items-center justify-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-rose-500/15 text-white">
                            <GooglePlayIcon />
                          </div>
                          <span className="whitespace-nowrap text-sm font-bold text-white sm:text-base">
                            Google Play
                          </span>
                        </div>
                      </a>

                      <a
                        href="https://apps.apple.com/us/app/sana-tv-%D8%B3%D9%86%D8%A7/id6742054715"
                        target="_blank"
                        rel="noreferrer"
                        className={`group rounded-[1.3rem] border border-white/10 ${OUTER_GRADIENT} p-4 transition hover:-translate-y-0.5 hover:brightness-110`}
                      >
                        <div className="flex items-center justify-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-yellow-100/10 text-white">
                            <AppStoreIcon />
                          </div>
                          <span className="text-sm font-bold text-white sm:text-base">
                            App Store
                          </span>
                        </div>
                      </a>
                    </div>

                    <div className={`mt-5 rounded-[1.4rem] border border-white/10 ${CARD_SURFACE} p-4`}>
                      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/65">
                        <span>⭐ 4.9 vlerësim</span>
                        <span>🌍 100+ vende</span>
                      </div>

                      <a
                        href="https://www.youtube.com/@SANA-Shqip"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-amber-300/25 bg-rose-600/15 py-3 text-sm font-bold text-amber-100 transition hover:scale-[1.01] hover:bg-rose-600/25"
                      >
                        <Sparkles className="h-4 w-4" />
                        Fillo tani
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-5 text-center text-xs text-white/55 sm:text-sm">
                Të gjitha të drejtat e rezervuara © Kanalet Kuranore Sana.
              </div>
            </div>
          </footer>
        </div>
      </div>
    </LazyMotion>
  );
}
