export function withAdaptor<T>(response: (data: T) => object): (target: any, propertyKey: string) => void;
export function withAdaptor(args: (data: Array<any>) => Array<any>): (target: any, propertyKey: string) => void;
export function withAdaptor(object: {
  response: (data: object) => unknown;
  args: (data: Array<any>) => Array<any>;
}): (target: any, propertyKey: string) => void;
export function withAdaptor(fnOrObj: any) {
  return function (target: any, propertyKey: string) {
    let value: any;

    // getter 함수는 메서드가 호출될 때마다 실행됨
    const getter = function () {
      return function (this: any, ...args: any[]) {
        let modifiedArgs = args;
        let responseTransformer = null;

        // 1. 객체인 경우 (세 번째 오버로드)
        if (fnOrObj && typeof fnOrObj === "object") {
          if (fnOrObj.args) modifiedArgs = fnOrObj.args(args);
          if (fnOrObj.response) responseTransformer = fnOrObj.response;
        }
        // 2. 함수인 경우 - 테스트 호출로 구분
        else if (typeof fnOrObj === "function") {
          // 테스트 호출 결과가 배열이면 args 변환기로 간주
          try {
            const testResult = fnOrObj(args);

            if (Array.isArray(testResult)) {
              modifiedArgs = fnOrObj(args);
            } else {
              // 아니면 response 변환기로 간주
              responseTransformer = fnOrObj;
            }
          } catch {
            // 예외가 발생하면 response 변환기로 간주
            responseTransformer = fnOrObj;
          }
        }

        const result = value.apply(this, modifiedArgs); // value에 원래 메서드가 있기 때문에 호출됨

        // 응답 변환
        if (responseTransformer && result && typeof result === "object" && result.data) {
          return {
            ...result,
            data: responseTransformer(result.data),
          };
        }

        return result;
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
