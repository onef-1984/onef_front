export function withQuery(adaptor: (data: any) => any) {
  return function (target: any, propertyKey: string) {
    let value: any;

    // getter 함수는 메서드가 호출될 때마다 실행됨
    const getter = function () {
      return function (this: any, ...args: any[]) {
        // "value"는 실제 원래 메서드 (예: getBookByIsbn)
        const result = value.apply(this, args); // value에 원래 메서드가 있기 때문에 호출됨

        if (!result || !result.data || typeof result !== "object") return result;

        return {
          ...result,
          data: adaptor(result.data), // result.data는 GraphQL 쿼리의 결과
        };
      };
    };

    // setter는 메서드가 할당될 때 호출됨
    const setter = function (newVal: any) {
      value = newVal; // newVal은 실제 메서드 (예: getBookByIsbn)
    };

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}
