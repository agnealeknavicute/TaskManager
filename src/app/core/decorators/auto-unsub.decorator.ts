export function AutoUnsub() {
  return function (constructor: Function) {
    const orig = constructor.prototype.ngOnDestroy;
    constructor.prototype.ngOnDestroy = function () {
      for (let prop in this) {
        const property = this[prop];
        if (property && typeof property.unsubscribe === 'function') {
          property.unsubscribe();
        }
      }
      orig?.apply();
    };
  };
}
