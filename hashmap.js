function HashMap() {
  const loadFactor = 0.75;
  let capacity = 16;

  let buckets = new Array(capacity);
  buckets.fill([]);

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % capacity;
    }

    return hashCode;
  }
}
