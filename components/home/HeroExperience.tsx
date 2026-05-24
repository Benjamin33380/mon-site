"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAmbientSound } from "@/hooks/useAmbientSound";
import MouseParticles from "@/components/home/MouseParticles";

const words = ["Votre", "confort,", "notre", "expertise."];

const PHOTOS = ["/photos/sdb-pyla.jpeg", "/photos/uicauderan.jpeg"];
const SLIDE_INTERVAL = 5000;

function AnimatedTitle() {
  return (
    <h1
      className="text-sm sm:text-base font-medium text-white/70 leading-snug tracking-wide mt-2 w-full flex justify-between"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}

function MuteButton({ muted, onToggle }: { muted: boolean; onToggle: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      onClick={onToggle}
      className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium hover:bg-white/20 transition-colors"
    >
      {muted ? (
        <>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
          Son désactivé
        </>
      ) : (
        <>
          <span className="flex gap-0.5 items-end h-3.5">
            {[1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="w-0.5 bg-cyan-400 rounded-full"
                animate={{ height: ["40%", "100%", "60%", "80%", "40%"] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </span>
          Son ambiant
        </>
      )}
    </motion.button>
  );
}

export default function HeroExperience() {
  const [entered, setEntered] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const { start, toggleMute, muted } = useAmbientSound();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhoto((prev) => (prev + 1) % PHOTOS.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const handleEnter = () => {
    start();
    setEntered(true);
    window.dispatchEvent(new CustomEvent("site:entered"));
  };

  return (
    <>
      {/* Écran d'entrée */}
      <AnimatePresence>
        {!entered && (
          <motion.div
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center cursor-pointer isolate"
            onClick={handleEnter}
          >
            {/* Halo central supprimé */}

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative flex flex-col items-center gap-8 text-center px-6"
            >
              <p className="text-white/30 text-xs uppercase tracking-[0.4em] font-medium">
                Climatisation · Chauffage · PAC
              </p>
              <h1
                className="text-5xl sm:text-7xl font-medium text-white uppercase tracking-[0.35em] mr-[-0.35em]"
              >
                ClimGO
              </h1>
              <div
                className="h-[3px] w-full mt-3 opacity-70 rounded-full"
                style={{ background: "linear-gradient(to right, #002395 33%, #ffffff 33%, #ffffff 66%, #ED2939 66%)" }}
              />

              {/* Bouton pulse */}
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="mt-4 flex flex-col items-center gap-3"
              >
                <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white" />
                </div>
                <span className="text-white/50 text-sm tracking-widest uppercase">
                  Entrer
                </span>
              </motion.div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero principal */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">

        {/* Fond : slideshow des photos */}
        {PHOTOS.map((src, i) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            animate={{ opacity: currentPhoto === i ? 1 : 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              aria-hidden
            />
            {/* Voile sombre pour garder le texte lisible */}
            <div className="absolute inset-0 bg-black/60" />
          </motion.div>
        ))}

        {/* Grille */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />

        <div className="relative flex flex-col items-center text-center px-4">

            {/* ClimGO + slogan centrés */}
            <div className="inline-flex flex-col items-center text-center">

              {/* ClimGO */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={entered ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative"
              >
                <p className="text-white text-5xl sm:text-6xl lg:text-7xl font-medium uppercase tracking-[0.35em] mr-[-0.35em]">
                  ClimGO
                </p>
                {/* Soulignement tricolore */}
                <div
                  className="h-[3px] w-full mt-2 opacity-80 rounded-full"
                  style={{ background: "linear-gradient(to right, #002395 33%, #ffffff 33%, #ffffff 66%, #ED2939 66%)" }}
                />
              </motion.div>

              {/* Slogan — même largeur que ClimGO */}
              {entered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="w-full"
                >
                  <AnimatedTitle />
                </motion.div>
              )}
            </div>

        </div>
      </section>

      {/* Indicateur de scroll */}
      {entered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      )}

      {/* Bouton mute */}
      {entered && <MuteButton muted={muted} onToggle={toggleMute} />}

      {/* Simulation fluide — uniquement sur l'écran d'entrée */}
      {!entered && <MouseParticles />}
    </>
  );
}
