export function transformResult<T>(transformer: (result: T) => any) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      // 원본 메서드 호출
      const result = originalMethod.apply(this, args);

      // 응답이 없거나 data가 객체가 아닌 경우
      if (!result.data || typeof result.data !== "object") return result;

      // 결과값 변환
      return {
        ...result,
        data: transformer(result.data),
      };
    };

    return descriptor;
  };
}
