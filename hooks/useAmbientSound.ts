"use client";

import { useRef, useCallback, useState } from "react";

export function useAmbientSound() {
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<AudioNode[]>([]);
  const masterRef = useRef<GainNode | null>(null);
  const [muted, setMuted] = useState(false);

  const start = useCallback(() => {
    if (ctxRef.current) return;

    const ctx = new AudioContext();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 3);
    master.connect(ctx.destination);
    masterRef.current = master;

    // Drone grave (fondation)
    const createDrone = (freq: number, gain: number, detune = 0) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      osc.detune.value = detune;
      g.gain.value = gain;
      osc.connect(g);
      g.connect(master);
      osc.start();
      nodesRef.current.push(osc, g);
      return osc;
    };

    // Reverb simulé via convolver
    const createReverb = async () => {
      const convolver = ctx.createConvolver();
      const len = ctx.sampleRate * 3;
      const buf = ctx.createBuffer(2, len, ctx.sampleRate);
      for (let c = 0; c < 2; c++) {
        const d = buf.getChannelData(c);
        for (let i = 0; i < len; i++) {
          d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.5);
        }
      }
      convolver.buffer = buf;
      return convolver;
    };

    createReverb().then((reverb) => {
      const reverbGain = ctx.createGain();
      reverbGain.gain.value = 0.3;
      reverb.connect(reverbGain);
      reverbGain.connect(master);

      // Drones principaux
      const d1 = createDrone(55, 0.4);       // La grave
      const d2 = createDrone(82.5, 0.25, 5); // Mi avec micro-détune
      const d3 = createDrone(110, 0.15);     // La médium
      const d4 = createDrone(165, 0.08);     // Mi aigu très doux

      // Brancher sur reverb aussi
      [d1, d2, d3, d4].forEach((osc) => {
        const g2 = ctx.createGain();
        g2.gain.value = 0.1;
        osc.connect(g2);
        g2.connect(reverb);
        nodesRef.current.push(g2);
      });

      // LFO pour mouvement subtil
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.08;
      lfoGain.gain.value = 4;
      lfo.connect(lfoGain);
      lfoGain.connect(d2.frequency);
      lfo.start();
      nodesRef.current.push(lfo, lfoGain);
    });
  }, []);

  const toggleMute = useCallback(() => {
    if (!masterRef.current || !ctxRef.current) return;
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (muted) {
      master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.8);
    } else {
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
    }
    setMuted((v) => !v);
  }, [muted]);

  return { start, toggleMute, muted };
}
