# Cognitive Return Rate (CRR) Predictor

## Overview

The **Cognitive Return Rate (CRR) Predictor** is a machine learning model built using TensorFlow.js that predicts final grades based on study hours. This project aims to help students understand the relationship between their study time and academic performance.

## 🚀 Features

- **Predictive Modeling**: Trains a model to predict final grades based on study hours.
- **Cognitive Return Rate Calculation**: Calculates the CRR, which is the ratio of predicted score to study hours.
- **Easy Integration**: Can be easily integrated into web applications using TensorFlow.js.

## 📦 Installation

To get started, ensure you have Node.js installed. Then, install TensorFlow.js:

```bash
npm install @tensorflow/tfjs
```

## 🛠️ Usage

### Importing the Functions

You can import the functions from the `analyzer.js` file as follows:

```javascript
import { createAndTrainModel, predictCRR } from "./analyzer.js";
```

### Creating and Training the Model

To create and train the model, use the following code:

```javascript
const model = await createAndTrainModel();
```

### Predicting CRR

To predict the final grade and calculate the CRR for a given number of study hours:

```javascript
const { score, crr } = await predictCRR(model, hours);
console.log(`Predicted Score: ${score}, Cognitive Return Rate: ${crr}`);
```

### Example

Here’s a complete example of how to use the functions:

```javascript
import { createAndTrainModel, predictCRR } from "./analyzer.js";

async function main() {
  const model = await createAndTrainModel();
  const hours = 9; // Example study hours
  const { score, crr } = await predictCRR(model, hours);
  console.log(`Predicted Score: ${score}, Cognitive Return Rate: ${crr}`);
}

main();
```

## 🧪 Testing

To run the tests for the CRR predictor, ensure you have Jest installed:

```bash
npm install --save-dev jest
```

Then, you can run the tests using:

```bash
npx jest
```

The tests will verify that the model correctly predicts scores and calculates the CRR for different study hours.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

Thanks to the TensorFlow.js community for their support and resources!

---

Feel free to explore and enhance your understanding of the relationship between study hours and academic performance with this CRR predictor!
