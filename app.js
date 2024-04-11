function serialize(numbers) {
  const counts = new Map();
  for (const num of numbers) {
    counts.set(num, (counts.get(num) || 0) + 1);
  }

  const encodedCounts = [];
  for (const [num, count] of counts.entries()) {
    if (count === 1) {
      encodedCounts.push(num);
    } else {
      encodedCounts.push(count, num);
    }
  }

  encodedCounts.sort((a, b) => a - b);

  return encodedCounts.join(",");
}

function deserialize(serialized) {
  const numbers = [];
  const encodedCounts = serialized.split(",");

  for (let i = 0; i < encodedCounts.length; i++) {
    const count = parseInt(encodedCounts[i]);
    if (isNaN(count)) {
      throw new Error("Invalid serialized string");
    }

    if (count === 1) {
      numbers.push(parseInt(encodedCounts[++i]));
    } else {
      const num = parseInt(encodedCounts[i]);
      for (let j = 0; j < count; j++) {
        numbers.push(num);
      }
    }
  }

  return numbers;
}

const originalArray = [1, 1, 2, 2, 3, 3];
const serializedString = serialize(originalArray);
const compressionRatio = originalArray.length / serializedString.length;

console.log(`Original array: ${originalArray}`);
console.log(`Serialized string: ${serializedString}`);
console.log(`Compression ratio: ${compressionRatio.toFixed(2)}%`);

const deserializedString = deserialize(serializedString);
const compressionRatioDeserialized =
  originalArray.length / deserializedString.length;
console.log(`Original array: ${originalArray}`);
console.log(`Deserialized string: ${deserializedString}`);
console.log(`Compression ratio: ${compressionRatio.toFixed(2)}%`);
