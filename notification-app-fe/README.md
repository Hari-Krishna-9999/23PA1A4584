# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Stage 6: Priority Notifications

This frontend project includes Stage 6 logic to compute the top 10 priority notifications efficiently using a Min Heap (priority queue).

### Priority algorithm

- Assign weights by notification type:
  - `Placement` = 3
  - `Result` = 2
  - `Event` = 1
- Compute a score using weight and recency:
  - `score = weight + recency timestamp`
- Maintain a Min Heap of up to 10 notifications.

### Algorithm flow

1. For each incoming notification, compute its score.
2. If heap size is less than 10, insert the notification.
3. If heap size is 10, compare the new score against the smallest score in the heap.
4. If the new score is higher, replace the lowest-priority item.

### Complexity

- Insertion and replacement are `O(log 10)` which is effectively constant time.
- This makes it efficient for continuous notification streams.

### Implementation

See `src/stage6.js` for the Stage 6 priority notification logic.
