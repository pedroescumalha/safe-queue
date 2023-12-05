import { describe, it } from "node:test";
import { createQueue } from "./safeQueue";
import assert from "node:assert";

describe(createQueue.name, () => {
    const initialArray = [1, 2];

    describe("capacity", () => {
        it("throws if value is negative", () => {
            assert.throws(() => {
                createQueue<number>((o) => {
                    o.capacity = -2;
                });
            }, {
                name: TypeError.name,
            });
        });

        it("throws if value is not whole", () => {
            assert.throws(() => {
                createQueue<number>((o) => {
                    o.capacity = 3.5;
                });
            }, {
                name: TypeError.name,
            });
        });
    });

    describe("peek", () => {
        it("returns first inserted value in the stack without removing it", () => {
            const stack = createQueue<number>((o) => {
                o.initialValues = initialArray;
            });

            const res = stack.peek();
            const pop = stack.dequeue();

            assert.equal(res, initialArray[0]);
            assert.equal(pop, initialArray[0]);
        });

        it("returns undefined if stack is empty", () => {
            const stack = createQueue<number>();

            const res = stack.peek();

            assert.equal(res, undefined);
        });
    });

    describe("enqueue", () => {
        it("Queues value correctly", () => {
            const stack = createQueue<number>();

            stack.enqueue(1);
            stack.enqueue(2);

            assert.equal(stack.length, 2);
            assert.equal(stack.peek(), 1);
        });

        it("throws if capacity has been reached", () => {
            const stack = createQueue<number>((o) => {
                o.capacity = 1;
            });

            stack.enqueue(1);

            assert.throws(() => {
                stack.enqueue(1);
            }, {
                name: RangeError.name,
            });
        });
    });

    describe("includes", () => {
        it("returns true if the value exists in the stack", () => {
            const stack = createQueue<number>((o) => {
                o.initialValues = initialArray;
            });

            const res = stack.includes(initialArray[0]!);

            assert.equal(res, true);
        });

        it("returns false if the value does not exist in the stack", () => {
            const stack = createQueue<number>((o) => {
                o.initialValues = initialArray;
            });

            const res = stack.includes(47);

            assert.equal(res, false);
        });
    });

    describe("dequeue", () => {
        it("dequeues the first value correctly", () => {
            const stack = createQueue<number>((o) => {
                o.initialValues = initialArray;
            });

            const res = stack.dequeue();

            assert.equal(res, initialArray[0]);
        });

        it("returns undefined if the stack is empty", () => {
            const stack = createQueue<number>();

            const res = stack.dequeue();

            assert.equal(res, undefined);
        });
    });

    describe("clear", () => {
        it("clears the array correctly", () => {
            const stack = createQueue<number>((o) => {
                o.initialValues = initialArray;
            });

            stack.clear();

            assert.equal(stack.peek(), undefined);
            assert.deepEqual(stack.toArray(), []);
        });

        it("doesnt throw if the array is empty", () => {
            const stack = createQueue<number>();

            assert.doesNotThrow(() => {
                stack.clear();
            });
        });
    });

    describe("toArray", () => {
        it("converts stack to new array", () => {
            const stack = createQueue<number>((o) => {
                o.initialValues = initialArray;
            });

            const array = stack.toArray();

            assert.deepEqual(array, initialArray);
            assert.notEqual(array, initialArray);
        });

        it("works with empty array", () => {
            const stack = createQueue<number>();
            const array = stack.toArray();

            assert.deepEqual(array, []);
        });
    });
    
    describe("length", () => {
        it ("returns the length correctly for filled stack", () => {
            const stack = createQueue<number>((o) => {
                o.initialValues = initialArray;
            });

            assert.equal(stack.length, initialArray.length);
        });

        it ("returns the length correctly for empty stack", () => {
            const stack = createQueue<number>();
            assert.equal(stack.length, 0);
        });
    });
});
