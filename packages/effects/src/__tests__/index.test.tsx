/**
 * @file index.test.tsx
 * @description Effects 包测试
 * @author YYC³ Team
 */

import { describe, it, expect } from 'vitest';
import * as Effects from '../index';

describe('@yyc3/effects Package Exports', () => {
  it('should export 3D effects components', () => {
    expect(Effects._3DEffects).toBeDefined();
    expect(Effects.MicroInteractions).toBeDefined();
    expect(Effects.ParallaxScroll).toBeDefined();
  });

  it('should export cyberpunk effects components', () => {
    expect(Effects.ParticleCanvas).toBeDefined();
    expect(Effects.GlitchText).toBeDefined();
    expect(Effects.NeonCard).toBeDefined();
    expect(Effects.CyberpunkWidget).toBeDefined();
  });

  it('should export component types', () => {
    // Types are exported but can't be tested as runtime values
    // We can only verify they exist in the type system
    expect(Effects.ParticleCanvasProps).toBeDefined();
    expect(Effects.GlitchTextProps).toBeDefined();
    expect(Effects.NeonCardProps).toBeDefined();
    expect(Effects.CyberpunkWidgetProps).toBeDefined();
  });

  it('should export all 7 effect components', () => {
    const effectComponents = [
      '_3DEffects',
      'MicroInteractions',
      'ParallaxScroll',
      'ParticleCanvas',
      'GlitchText',
      'NeonCard',
      'CyberpunkWidget',
    ];

    effectComponents.forEach((component) => {
      expect(Effects[component as keyof typeof Effects]).toBeDefined();
    });
  });
});
