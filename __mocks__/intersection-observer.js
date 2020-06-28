/**
 * Utility function that mocks the `IntersectionObserver` API. Necessary for components that rely
 * on it, otherwise the tests will crash. Recommended to execute inside `beforeEach`.
 * @param {object} intersectionObserverMock - Parameter that is sent to the `Object.defineProperty`
 *      overwrite method. `jest.fn()` mock functions can be passed here if the goal is to not only
 *      mock the intersection observer, but its methods.
 */
export function setupIntersectionObserverMock({
    observe = () => null,
    unobserve = () => null,
    disconnect = () => null,
  } = {}) {
    class IntersectionObserver {
      observe = observe;
      unobserve = unobserve;
      disconnect = disconnect;
    }
    Object.defineProperty(
      window,
      'IntersectionObserver',
      { writable: true, configurable: true, value: IntersectionObserver }
    );
    Object.defineProperty(
      global,
      'IntersectionObserver',
      { writable: true, configurable: true, value: IntersectionObserver }
    );
  }