/**
 * Queue type definition.
 */
export type TSafeQueue<T> = {
    peek: () => T | undefined;
    enqueue: (item: T) => void;
    includes: (item: T) => boolean;
    dequeue: () => T | undefined;
    clear: () => void;
    length: number;
    toArray: () => T[];
}

export type SafeQueueOptions<T> = {
    // TODO: only positive integers type?
    capacity: number;
    initialValues: T[];
}

/**
 * Build default queue options.
 * @returns - The default options.
 */
function buildDefaultOptions<T>(): SafeQueueOptions<T> {
    return {
        capacity: Number.MAX_VALUE,
        initialValues: [],
    };
}

/**
 * Safe queue implementation.
 * @throws {TypeError} if the capacity option is not a positive whole number.
 */
export class SafeQueue<T> implements TSafeQueue<T> {
    private readonly arr: T[];
    private readonly capacity: number;

    constructor(setOptions?: (options: SafeQueueOptions<T>) => void) {
        const options = buildDefaultOptions<T>();

        if (setOptions) {
            setOptions(options);

            if (options.capacity <= 0 || options.capacity % 1 !== 0) {
                throw new TypeError(
                    "Invalid value for capacity. Capacity must be a whole number higher than 0."
                );
            }
        }

        this.arr = [...options.initialValues];
        this.capacity = options.capacity;
    }

    /**
     * Looks at the item at the top of this queue without removing it from the queue.
     * @returns The item at the top of the queue.
     */
    peek(): T | undefined {
        return this.arr[0];
    }
    
    /**
     * Adds an item to the end of this queue.
     * @param item - The item to be added.
     * @throws {RangeError} if the queue has reached its full capacity.
     */
    enqueue(item: T): undefined {
        if (this.length === this.capacity) {
            throw new RangeError("Queue has reached its full capacity.");
        }

        this.arr.push(item);
    }

    /**
     * Determines if an item is in the queue.
     * @param item - the item to be located in the queue.
     * @returns - true if the item is found; otherwise false.
     */
    includes(item: T): boolean {
        return this.arr.includes(item);
    }

    /**
     * Removes the item at the beginning of this queue.
     * @returns the item that was removed.
     */
    dequeue(): T | undefined {
        return this.arr.shift();
    }

    /**
     * Clears the queue.
     */
    clear(): undefined {
        this.arr.length = 0;
    }

    /**
     * Converts the queue to an array.
     * @returns The new array.
     */
    toArray(): T[] {
        return [...this.arr];
    }

    /**
     * Returns the current length of the queue.
     * @returns The current length of the queue.
     */
    get length(): number {
        return this.arr.length;
    }
}

/**
 * Create a queue.
 * @param setOptions - function to override the default queue options.
 * @returns - the queue.
 * @throws {TypeError} if the capacity option is not a positive whole number.
 */
export function createQueue<T>(setOptions?: (options: SafeQueueOptions<T>) => void): SafeQueue<T> {
    return new SafeQueue(setOptions);
}
