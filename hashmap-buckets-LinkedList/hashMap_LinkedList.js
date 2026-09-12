import { LinkedList } from './linkedList.js';

function HashMap_LL() {
  const loadFactor = 0.75;
  let capacity = 16;

  let buckets = [];

  function initializeArray() {
    buckets = [];
    for (let i = 0; i < capacity; i++) {
      buckets[i] = LinkedList();
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
    if (hashCode < 0 || hashCode >= buckets.length) {
      throw new Error('Trying to access index out of bounds');
    }
    const bucket = buckets[hashCode];
    return bucket;
  }

  function entry(key, bucket) {
    let temp = bucket.head();
    while (temp !== null) {
      if (temp.key === key) {
        return temp;
      }
      temp = temp.next;
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

    bucket.append(key, value);
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
    let temp = bucket.head();

    while (temp !== null) {
      if (temp.key === key) {
        bucket.remove(bucket.findIndex(key));
        return true;
      }
    }

    return false;
  }

  function length() {
    let size = 0;
    buckets.forEach((el) => {
      size += el.size();
    });
    return size;
  }

  function clear() {
    initializeArray();
  }

  function keys() {
    let keys = [];

    for (let i = 0; i < buckets.length; i++) {
      keys.push(...buckets[i].loopList('key'));
    }

    return keys;
  }

  function values() {
    let values = [];

    for (let i = 0; i < buckets.length; i++) {
      values.push(...buckets[i].loopList('value'));
    }

    return values;
  }

  function entries() {
    let array = [];

    for (const e of buckets) {
      array.push(...e.pairs());
    }
    return array;
  }

  function isLoaderFactorExceeded() {
    const factor = capacity * loadFactor;

    if (length() > factor) {
      expandHashMap();
    }
  }

  function expandHashMap() {
    capacity = capacity * 2;

    let oldMap = [...buckets];

    clear();

    oldMap.forEach((el) => {
      let temp = el.head();
      while (temp !== null) {
        set(temp.key, temp.value);
        temp = temp.next;
      }
    });
  }

  const getHashMap = () => buckets;

  const showAllHashMapLinkedLists = () => {
    for (const e of buckets) {
      console.log(e.toString());
    }
  };

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
    showAllHashMapLinkedLists,
  };
}

const test = HashMap_LL();
