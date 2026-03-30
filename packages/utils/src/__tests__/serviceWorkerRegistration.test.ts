import { 
  registerServiceWorker,
  unregisterServiceWorker,
  checkServiceWorkerSupport,
  updateServiceWorker
} from '../serviceWorkerRegistration';

describe('serviceWorkerRegistration', () => {
  describe('checkServiceWorkerSupport', () => {
    it('should check if service workers are supported', () => {
      const isSupported = checkServiceWorkerSupport();
      expect(typeof isSupported).toBe('boolean');
    });
  });

  describe('registerServiceWorker', () => {
    beforeEach(() => {
      // Mock service worker
      Object.defineProperty(navigator, 'serviceWorker', {
        value: {
          register: jest.fn(() => Promise.resolve({
            installing: null,
            waiting: null,
            active: null,
          })),
          ready: Promise.resolve({
            active: true,
          }),
          controller: null,
          oncontrollerchange: null,
          onmessage: null,
        },
        writable: true,
      });
    });

    it('should register service worker', async () => {
      const registration = await registerServiceWorker('/sw.js');
      expect(registration).toBeDefined();
    });

    it('should handle registration failure', async () => {
      (navigator.serviceWorker.register as jest.Mock).mockRejectedValueOnce(
        new Error('Registration failed')
      );

      await expect(registerServiceWorker('/sw.js')).rejects.toThrow('Registration failed');
    });

    it('should accept custom options', async () => {
      await registerServiceWorker('/sw.js', { scope: '/app/' });
      expect(navigator.serviceWorker.register).toHaveBeenCalledWith('/sw.js', { scope: '/app/' });
    });
  });

  describe('unregisterServiceWorker', () => {
    beforeEach(() => {
      Object.defineProperty(navigator, 'serviceWorker', {
        value: {
          getRegistration: jest.fn(() => Promise.resolve({
            unregister: jest.fn(() => Promise.resolve(true)),
          })),
          ready: Promise.resolve({}),
        },
        writable: true,
      });
    });

    it('should unregister service worker', async () => {
      const result = await unregisterServiceWorker();
      expect(result).toBe(true);
    });

    it('should handle unregistration failure', async () => {
      (navigator.serviceWorker.getRegistration as jest.Mock).mockRejectedValueOnce(
        new Error('Unregistration failed')
      );

      await expect(unregisterServiceWorker()).rejects.toThrow('Unregistration failed');
    });
  });

  describe('updateServiceWorker', () => {
    beforeEach(() => {
      Object.defineProperty(navigator, 'serviceWorker', {
        value: {
          getRegistration: jest.fn(() => Promise.resolve({
            update: jest.fn(() => Promise.resolve()),
          })),
          ready: Promise.resolve({}),
        },
        writable: true,
      });
    });

    it('should update service worker', async () => {
      await updateServiceWorker();
      expect(navigator.serviceWorker.getRegistration).toHaveBeenCalled();
    });

    it('should handle update failure', async () => {
      (navigator.serviceWorker.getRegistration as jest.Mock).mockRejectedValueOnce(
        new Error('Update failed')
      );

      await expect(updateServiceWorker()).rejects.toThrow('Update failed');
    });
  });
});
