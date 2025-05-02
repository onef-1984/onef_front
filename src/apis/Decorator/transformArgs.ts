export function transformArgs<T extends any[]>(transformer: (args: any[]) => T) {
  return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      // 인자 변환
      const transformedArgs = transformer(args);

      // 변환된 인자로 원본 메서드 호출
      return originalMethod.apply(this, transformedArgs);
    };

    return descriptor;
  };
}
