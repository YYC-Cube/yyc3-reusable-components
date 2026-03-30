import { 
  fadeIn, 
  fadeOut, 
  slideIn, 
  slideOut, 
  scaleIn, 
  scaleOut,
  rotateIn,
  rotateOut,
  bounce
} from '../animations';

describe('animations', () => {
  describe('fadeIn', () => {
    it('should return fadeIn animation config', () => {
      const config = fadeIn();
      expect(config).toBeDefined();
      expect(config.duration).toBeDefined();
      expect(config.ease).toBeDefined();
    });

    it('should accept custom duration', () => {
      const config = fadeIn({ duration: 500 });
      expect(config.duration).toBe(500);
    });

    it('should accept custom easing', () => {
      const config = fadeIn({ ease: 'ease-in' });
      expect(config.ease).toBe('ease-in');
    });
  });

  describe('fadeOut', () => {
    it('should return fadeOut animation config', () => {
      const config = fadeOut();
      expect(config).toBeDefined();
      expect(config.duration).toBeDefined();
    });
  });

  describe('slideIn', () => {
    it('should return slideIn animation config', () => {
      const config = slideIn('left');
      expect(config).toBeDefined();
      expect(config.direction).toBe('left');
    });

    it('should handle all directions', () => {
      const directions = ['left', 'right', 'up', 'down'] as const;
      directions.forEach(direction => {
        const config = slideIn(direction);
        expect(config.direction).toBe(direction);
      });
    });
  });

  describe('slideOut', () => {
    it('should return slideOut animation config', () => {
      const config = slideOut('right');
      expect(config).toBeDefined();
      expect(config.direction).toBe('right');
    });
  });

  describe('scaleIn', () => {
    it('should return scaleIn animation config', () => {
      const config = scaleIn();
      expect(config).toBeDefined();
      expect(config.from).toBeDefined();
      expect(config.to).toBeDefined();
    });

    it('should accept custom scale values', () => {
      const config = scaleIn({ from: 0.5, to: 1.2 });
      expect(config.from).toBe(0.5);
      expect(config.to).toBe(1.2);
    });
  });

  describe('scaleOut', () => {
    it('should return scaleOut animation config', () => {
      const config = scaleOut();
      expect(config).toBeDefined();
    });
  });

  describe('rotateIn', () => {
    it('should return rotateIn animation config', () => {
      const config = rotateIn();
      expect(config).toBeDefined();
      expect(config.degrees).toBeDefined();
    });

    it('should accept custom rotation degrees', () => {
      const config = rotateIn({ degrees: 180 });
      expect(config.degrees).toBe(180);
    });
  });

  describe('rotateOut', () => {
    it('should return rotateOut animation config', () => {
      const config = rotateOut();
      expect(config).toBeDefined();
    });
  });

  describe('bounce', () => {
    it('should return bounce animation config', () => {
      const config = bounce();
      expect(config).toBeDefined();
      expect(config.keyframes).toBeDefined();
    });

    it('should accept custom intensity', () => {
      const config = bounce({ intensity: 0.5 });
      expect(config.intensity).toBe(0.5);
    });
  });
});
