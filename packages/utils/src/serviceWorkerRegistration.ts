// Service Worker 注册工具
// Phase 14: PWA离线支持

type Config = {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onError?: (error: Error) => void;
};

export function register(config?: Config) {
  // 检查是否支持Service Worker
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.log('[PWA] Service Worker not supported in this environment');
    return;
  }

  // 检查是否在Figma Make环境
  if (window.location.hostname.includes('figma.com')) {
    console.log('[PWA] Skipping Service Worker registration in Figma environment');
    return;
  }

  // 等待页面加载完成
  window.addEventListener('load', () => {
    const swUrl = `/service-worker.js`;

    if (isLocalhost) {
      // 本地开发环境
      checkValidServiceWorker(swUrl, config);
      navigator.serviceWorker.ready.then(() => {
        console.log(
          '[PWA] This web app is being served cache-first by a service ' +
            'worker. To learn more, visit https://cra.link/PWA'
        );
      });
    } else {
      // 生产环境
      registerValidSW(swUrl, config);
    }
  });
}

function registerValidSW(swUrl: string, config?: Config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log('[PWA] Service Worker registered successfully');

      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }

        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // 新的Service Worker可用
              console.log('[PWA] New content is available; please refresh.');

              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // 首次安装完成
              console.log('[PWA] Content is cached for offline use.');

              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('[PWA] Error during service worker registration:', error);
      if (config && config.onError) {
        config.onError(error);
      }
    });
}

function checkValidServiceWorker(swUrl: string, config?: Config) {
  // 检查Service Worker是否存在
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // Service Worker不存在，unregister
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service Worker存在，注册
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log('[PWA] No internet connection found. App is running in offline mode.');
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
        console.log('[PWA] Service Worker unregistered');
      })
      .catch((error) => {
        console.error('[PWA] Error unregistering service worker:', error.message);
      });
  }
}

// 检查是否在localhost
const isLocalhost =
  typeof window !== 'undefined' &&
  Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
  );

// 请求更新Service Worker
export function checkForUpdates() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.update();
      console.log('[PWA] Checking for updates...');
    });
  }
}

// 跳过等待，立即激活新的Service Worker
export function skipWaiting() {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
  }
}
