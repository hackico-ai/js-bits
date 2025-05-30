import * as tf from '@tensorflow/tfjs';

// ================================ Design % Implementation =========================================
/**
 * Create and train a model that learns the relationship
 * between study hours and final grade (used for CRR).
 */
export async function createAndTrainModel() {
  const studyHours = tf.tensor1d([1, 2, 3, 4, 5, 6, 7, 8]);
  const grades = tf.tensor1d([45, 50, 60, 64, 70, 72, 80, 88]);

  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

  await model.fit(studyHours, grades, {
    epochs: 200,
    verbose: 0
  });

  return model;
}

/**
 * Predicts final grade and calculates Cognitive Return Rate (CRR).
 * @param {tf.LayersModel} model - Trained model
 * @param {number} hours - Study hours
 * @returns {Promise<{score: number, crr: number}>}
 */
export async function predictCRR(model, hours) {
  const input = tf.tensor1d([hours]);
  const prediction = model.predict(input);
  const value = await prediction.data();
  const score = value[0];
  const crr = score / hours;

  return { score, crr };
}

// ================================ Testing =========================================

import { createAndTrainModel, predictCRR } from './analyzer.js';

describe('Cognitive Return Rate (CRR) Predictor', () => {
  let model;

  beforeAll(async () => {
    model = await createAndTrainModel();
  });

  test('calculates CRR for 9 study hours', async () => {
    const { score, crr } = await predictCRR(model, 9);
    expect(score).toBeGreaterThan(80);
    expect(crr).toBeGreaterThan(8);     // 80 / 9 = 8.89
    expect(crr).toBeLessThan(10);       // Assuming not over-efficient
  });

  test('calculates CRR for 2 study hours', async () => {
    const { score, crr } = await predictCRR(model, 2);
    expect(score).toBeGreaterThan(40);
    expect(crr).toBeGreaterThan(20);    // 50 / 2 = 25
    expect(crr).toBeLessThan(35);
  });
});
