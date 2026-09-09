export function HashMap() {
  const loadFactor = 0.75;
  let capacity = 16;

  let buckets = [];

  for (let i = 0; i < capacity; i++) {
    buckets[i] = [];
  }

  function hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % capacity;
    }

    return hashCode;
  }

  function getBucket(key) {
    const hashCode = hash(key);
    const bucket = buckets[hashCode];
    return bucket;
  }

  function entry(key, bucket) {
    for (let e of bucket) {
      if (e.key === key) {
        return e;
      }
    }
    return null;
  }

  function set(key, value) {
    const bucket = getBucket(key);
    const object = entry(key, bucket);

    if (object) {
      object.value = value;
      return;
    }

    bucket.push({ key, value });
  }

  return {
    set,
    buckets,
  };
}
