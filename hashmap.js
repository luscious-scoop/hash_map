export function HashMap() {
  const loadFactor = 0.75;
  let capacity = 16;

  let buckets = [];

  function initializeArray() {
    for (let i = 0; i < capacity; i++) {
      buckets[i] = [];
    }
  }
  initializeArray();

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
      console.log(`I am old value : ${object.value}`);

      object.value = value;
      console.log(`I am new value : ${object.value}`);
      return;
    }

    bucket.push({ key, value });
    isLoaderFactorExceeded();
  }

  function get(key) {
    const bucket = getBucket(key);

    const object = entry(key, bucket);
    if (!object) {
      return object;
    }
    return object.value;
  }

  function has(key) {
    const bucket = getBucket(key);

    const object = entry(key, bucket);
    if (!object) {
      return false;
    }
    return true;
  }

  function remove(key) {
    const bucket = getBucket(key);

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);

        return true;
      }
    }

    return false;
  }

  function length() {
    return buckets.flat().length;
  }

  function clear() {
    initializeArray();
  }

  function keys() {
    return buckets.flat().map((e) => e.key);
  }

  function values() {
    return buckets.flat().map((e) => e.value);
  }

  function entries() {
    return buckets.flat().map((e) => [e.key, e.value]);
  }

  function isLoaderFactorExceeded() {
    const factor = capacity * loadFactor;

    if (length() > factor) {
      expandHashMap();
    }
  }

  function expandHashMap() {
    capacity = capacity * 2;

    let oldMap = buckets.flat();

    initializeArray();

    oldMap.forEach((el) => {
      set(el.key, el.value);
    });
  }

  const getHashMap = () => buckets;

  return {
    set,
    getHashMap,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
  };
}
