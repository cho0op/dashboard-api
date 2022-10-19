const Component = (id: number) => {
    return (target: Function) => {
        target.prototype.id = id;
    };
};

function Method(target: Object, propertyKey: string, propertyDescriptor: PropertyDescriptor) {
    propertyDescriptor.value = function (...args: any[]) {
        return args[0] * 10;
    };
}

function Prop(target: Object, propertyKey: string) {
    let value: number;

    const getter = () => {
        return value;
    };
    const setter = (newValue: number) => {
        value = newValue;
    };

    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter
    });

}

function Param(target: Object, propertyKey: string, index: number) {

}

@Component(5)
export class User {
    @Prop
    id: number;

    updateId(newId: number) {
        this.id = newId;
        return this.id;
    };
}

console.log(new User().id);
