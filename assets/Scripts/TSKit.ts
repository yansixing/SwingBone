

declare global {
    export let logFuncName: (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
}

Object.defineProperty(window, 'logFuncName', {
    configurable: true, get: () => {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            // console.log(params);
            descriptor.value = function () {
                console.log('Excute function:' + propertyKey);
            };
            return descriptor;
        };
    }
});

export default {};