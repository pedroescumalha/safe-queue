# Safe Queue

Safe Queue is a TypeScript library providing a type-safe implementation of a queue data structure. It ensures compile-time safety, preventing common errors associated with incorrect queue usage.

## Installation

Install the library via npm:

```bash
npm install safe-queue
```

## Usage

### Import the library

```typescript
import { createQueue } from 'safe-queue';
```

### Create a new queue

```typescript
// Create a queue of numbers
const numberQueue = createQueue<number>();

// Create a queue of strings
const stringQueue = createQueue<string>();
```

### Options

```typescript
const numberQueue = createQueue<number>((options) => {
    options.capacity = 50;
    options.initialValues = [1, 2];
});
```

When creating a queue, there's two options that can be set:
- `capacity`: The maximum value of elements the queue can hold. A `TypeError` will be thrown if this value is not a whole positive integer. The default value is `Number.MAX_VALUE`.
- `initialValues`: Initialize a new queue with a copy of the values specified in this field. The default value is `[]`.

### Available operations

```typescript
// Add elements onto the queue
numberQueue.enqueue(42);
numberQueue.enqueue(10);

// Remove elements from the queue
const poppedElement = numberQueue.dequeue();
console.log(poppedElement); // Output: 10

// Check queue size
const size = numberQueue.length;
console.log(size); // Output: 1

// Peek the next element
const peekedElement = numberQueue.peek();
console.log(peekedElement); // Output: 42 

// Check if a certain element is present in the queue
const isElementPresentInTheQueue = numberQueue.includes(25);
console.log(isElementPresentInTheQueue); // Output: false 

// Clear the queue
numberQueue.clear();
```

## Contributing

We welcome contributions! To contribute to Safe Queue, follow these steps:

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/safe-queue.git`
3. Create a new branch: `git checkout -b your-feature`
4. Make your changes and commit them: `git commit -m 'Add your feature'`
5. Push to the branch: `git push origin your-feature`
6. Submit a pull request

Please ensure that your code adheres to the existing coding standards and includes tests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
