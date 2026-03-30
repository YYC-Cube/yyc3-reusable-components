/**
 * @file animations.test.ts
 * @description 动画配置测试
 */

import {
  easing,
  duration,
  pageTransition,
  cardEnter,
  staggerList,
  modalAnimation,
  sidebarAnimation,
  notificationSlide,
  floatAnimation,
  pulseAnimation,
  shakeAnimation,
  shimmerAnimation,
  liquidFlowAnimation,
  hoverScale,
  buttonTap,
  expandCollapse,
  tabSwitch,
  badgeEnter,
  tooltipEnter,
  dropdownAnimation,
} from '../animations';

describe('animations', () => {
  describe('easing', () => {
    it('should define standard easing functions', () => {
      expect(easing.spring).toBeDefined();
      expect(easing.easeInOut).toBeDefined();
      expect(easing.easeOut).toBeDefined();
      expect(easing.easeIn).toBeDefined();
      expect(Array.isArray(easing.spring)).toBe(true);
      expect(easing.spring.length).toBe(4);
    });
  });

  describe('duration', () => {
    it('should define standard durations', () => {
      expect(duration.instant).toBe(0);
      expect(duration.fast).toBe(150);
      expect(duration.normal).toBe(300);
      expect(duration.slow).toBe(500);
      expect(duration.verySlow).toBe(700);
    });
  });

  describe('pageTransition', () => {
    it('should define page transition animation', () => {
      expect(pageTransition.initial).toBeDefined();
      expect(pageTransition.animate).toBeDefined();
      expect(pageTransition.exit).toBeDefined();
      expect(pageTransition.transition).toBeDefined();
      expect(pageTransition.initial.opacity).toBe(0);
      expect(pageTransition.animate.opacity).toBe(1);
    });
  });

  describe('cardEnter', () => {
    it('should define card enter animation', () => {
      expect(cardEnter.initial).toBeDefined();
      expect(cardEnter.animate).toBeDefined();
      expect(cardEnter.transition).toBeDefined();
      expect(cardEnter.initial.scale).toBe(0.95);
      expect(cardEnter.animate.scale).toBe(1);
    });
  });

  describe('staggerList', () => {
    it('should define stagger list animation', () => {
      expect(staggerList.container).toBeDefined();
      expect(staggerList.item).toBeDefined();
      expect(staggerList.container.animate.transition.staggerChildren).toBeDefined();
    });
  });

  describe('modalAnimation', () => {
    it('should define modal animation variants', () => {
      expect(modalAnimation.backdrop).toBeDefined();
      expect(modalAnimation.modal).toBeDefined();
      expect(modalAnimation.backdrop.initial.opacity).toBe(0);
      expect(modalAnimation.modal.initial.scale).toBe(0.9);
    });
  });

  describe('sidebarAnimation', () => {
    it('should define sidebar slide animation', () => {
      expect(sidebarAnimation.initial).toBeDefined();
      expect(sidebarAnimation.animate).toBeDefined();
      expect(sidebarAnimation.exit).toBeDefined();
      expect(sidebarAnimation.initial.x).toBe(-400);
    });
  });

  describe('notificationSlide', () => {
    it('should define notification slide animation', () => {
      expect(notificationSlide.initial).toBeDefined();
      expect(notificationSlide.animate).toBeDefined();
      expect(notificationSlide.exit).toBeDefined();
      expect(notificationSlide.initial.x).toBe(400);
    });
  });

  describe('floatAnimation', () => {
    it('should define float animation', () => {
      expect(floatAnimation.animate).toBeDefined();
      expect(floatAnimation.animate.y).toBeDefined();
      expect(floatAnimation.animate.transition.repeat).toBe(Infinity);
    });
  });

  describe('pulseAnimation', () => {
    it('should define pulse animation', () => {
      expect(pulseAnimation.animate).toBeDefined();
      expect(pulseAnimation.animate.scale).toBeDefined();
      expect(pulseAnimation.animate.transition.repeat).toBe(Infinity);
    });
  });

  describe('shakeAnimation', () => {
    it('should define shake animation', () => {
      expect(shakeAnimation.animate).toBeDefined();
      expect(shakeAnimation.animate.rotate).toBeDefined();
      expect(Array.isArray(shakeAnimation.animate.rotate)).toBe(true);
    });
  });

  describe('hoverScale', () => {
    it('should define hover scale effect', () => {
      expect(hoverScale.whileHover).toBeDefined();
      expect(hoverScale.whileTap).toBeDefined();
      expect(hoverScale.whileHover.scale).toBe(1.05);
    });
  });

  describe('buttonTap', () => {
    it('should define button tap effect', () => {
      expect(buttonTap.whileTap).toBeDefined();
      expect(buttonTap.whileTap.scale).toBe(0.95);
    });
  });

  describe('expandCollapse', () => {
    it('should define expand/collapse animation', () => {
      expect(expandCollapse.initial).toBeDefined();
      expect(expandCollapse.animate).toBeDefined();
      expect(expandCollapse.exit).toBeDefined();
      expect(expandCollapse.initial.height).toBe(0);
    });
  });

  describe('tabSwitch', () => {
    it('should define tab switch animation', () => {
      expect(tabSwitch.initial).toBeDefined();
      expect(tabSwitch.animate).toBeDefined();
      expect(tabSwitch.exit).toBeDefined();
    });
  });

  describe('dropdownAnimation', () => {
    it('should define dropdown animation', () => {
      expect(dropdownAnimation.initial).toBeDefined();
      expect(dropdownAnimation.animate).toBeDefined();
      expect(dropdownAnimation.exit).toBeDefined();
      expect(dropdownAnimation.initial.scale).toBe(0.95);
    });
  });
});
