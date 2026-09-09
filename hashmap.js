function HashMap() {
  const loadFactor = 0.75;
  let capacity = 16;

  let buckets = new Array(capacity);
  buckets.fill([]);

  console.log(buckets.length);
}
HashMap();
