
import * as tf from "@tensorflow/tfjs";

async function runSmokeTest() {
  console.log("TensorFlow.js version:", tf.version.tfjs);

  await tf.ready();

  console.log("Backend:", tf.getBackend());

  const result = tf.tidy(() => {
    const a = tf.tensor2d([
      [1, 2],
      [3, 4],
    ]);

    const b = tf.tensor2d([
      [5, 6],
      [7, 8],
    ]);

    return tf.matMul(a, b);
  });

  const values = await result.array();

  console.log("Matrix multiplication result:", values);

  const expected = [
    [19, 22],
    [43, 50],
  ];

  if (JSON.stringify(values) !== JSON.stringify(expected)) {
    result.dispose();
    throw new Error("TensorFlow.js smoke test failed");
  }

  result.dispose();

  console.log("TensorFlow.js smoke test passed");
}

runSmokeTest().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
