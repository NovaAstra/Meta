import { type Arguments } from "@meta-core/typeable"
import { Pipeline } from "@meta-core/pipeable"

export function unshift<T>(element: T, args: T[]): T[] {
    return element ? [element].concat(args.slice(0, -1)) : args;
}

export abstract class HookFactory<I extends Arguments, O> {
    protected pipeline = new Pipeline<I, O>()

    public call(...args: I): O {
        return this.pipeline.start(args)
    }
}

export class SyncHook<I extends Arguments, O = void> extends HookFactory<I, O> {
    public tap(callback: (...args: I) => O) {
        this.pipeline.use((input, next) => {
            callback(...input)
            return next()
        })
    }
}

// export class SyncBailHook<T, O> extends HookFactory<T, O> {
//     public tap(callback) {
//         this.use((input, next) => {
//             const result = callback(...input)

//             if (result !== undefined) return result;

//             return next()
//         })
//     }
// }

// export class SyncWaterfallHook<T, O> extends HookFactory<T, O> {
//     public tap(callback) {
//         this.use((input, next) => {
//             const result = callback(...input)

//             const nextInput = unshift(result, input)

//             return next(nextInput)
//         })
//     }
// }

// export class SyncLoopHook<T, O> extends HookFactory<T, O> {
//     public tap(callback) {

//     }
// }

// export class AsyncParallelHook<T, O> extends HookFactory<T, O> {
//     public tap(callback) {
//         this.use((input, next) => {
//             callback(...input)

//             next()
//         })
//     }
// }

// export class AsyncParallelBailHook<T, O> extends HookFactory<T, O> {

// }

// export class AsyncSeriesHook<T, O> extends HookFactory<T, O> { }

// export class AsyncSeriesBailHook<T, O> extends HookFactory<T, O> {
//     public tap(callback) {
//         this.use((input, next) => {
//             callback(...input).then(result => result !== undefined ? result : next())
//         })
//     }
// }

// export class AsyncSeriesWaterfallHook<T, O> extends HookFactory<T, O> { }

