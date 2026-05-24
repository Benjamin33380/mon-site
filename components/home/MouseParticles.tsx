"use client";

import { useEffect, useRef } from "react";
import { initFluid } from "smokey-fluid-cursor";

export default function MouseParticles() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    initFluid({
      id:                   "smokey-fluid-canvas",
      simResolution:        128,
      dyeResolution:        1024,
      densityDissipation:   0.95,
      velocityDissipation:  0.97,
      pressure:             0.8,
      pressureIteration:    20,
      curl:                 45,
      splatRadius:          0.25,
      splatForce:           9000,
      shading:              true,
      colorUpdateSpeed:     10,
      transparent:          true,
    });
  }, []);

  return (
    <canvas
      id="smokey-fluid-canvas"
      className="fixed inset-0 w-screen h-screen pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
}
