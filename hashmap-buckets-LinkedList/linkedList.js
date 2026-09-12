import { Node } from './node.js';

export function LinkedList() {
  let _head = null;

  let _tail = null;

  const append = (key, value) => {
    let node = new Node(key, value);
    if (!_head) {
      _head = node;
      _tail = _head;
    } else {
      _tail.next = node;
      _tail = _tail.next;
    }
  };

  const toString = () => {
    if (!_head) {
      return '';
    }
    let temp = _head;
    let string = '';
    while (temp !== null) {
      string += `( Key: ${temp.key} , Value :${temp.value} ) -> `;
      temp = temp.next;
      if (!temp) {
        string += temp;
      }
    }
    return string;
  };

  const head = () => {
    if (!_head) {
      return null;
    }
    return _head;
  };

  const tail = () => {
    if (!_tail) {
      return undefined;
    }
    return _tail.value;
  };

  const getNode = (index) => {
    if (index < 0) {
      return undefined;
    }
    let temp = _head;
    let count = 0;

    while (temp !== null) {
      if (count >= index && temp !== null) {
        return temp;
      }
      temp = temp.next;
      count++;
    }
    return undefined;
  };

  const at = (index) => {
    let node;
    node = getNode(index);
    if (!node) {
      return node;
    }
    return node.value;
  };

  const size = () => {
    let temp = _head;
    let count = 0;

    while (temp !== null) {
      temp = temp.next;
      count++;
    }
    return count;
  };

  const contains = (value) => {
    let temp = _head;

    while (temp !== null) {
      if (value === temp.value) {
        return true;
      }
      temp = temp.next;
    }
    return false;
  };

  const findIndex = (key) => {
    let temp = _head;
    let count = 0;

    while (temp !== null) {
      if (key === temp.key) {
        return count;
      }
      temp = temp.next;
      count++;
    }
    return -1;
  };

  const prepend = (value) => {
    let node = new Node(value);
    let prevHead;
    if (!_head) {
      _head = node;
    } else {
      prevHead = _head;
      _head = node;
      _head.next = prevHead;
    }
  };

  const pop = () => {
    if (!_head) {
      return undefined;
    }
    let oldHeadValue = _head.value;
    let newHead = _head.next;
    _head = newHead;
    return oldHeadValue;
  };

  const createNodes = (array) => {
    return array.map((el) => new Node(el));
  };

  const insertAt = (index, ...values) => {
    if (index === 0) {
      values.reverse().forEach((el) => {
        prepend(el);
      });
      return;
    }

    if (index < 0 || index > size() - 1) {
      throw new RangeError('index out of bound');
    }
    let nodes = createNodes(Array.from(values));

    let value = getNode(index - 1);
    let i = 0;
    while (value !== null && i < nodes.length) {
      let prev = value.next;

      value.next = nodes[i];
      value.next.next = prev;

      value = value.next;

      i++;
    }
    if (value.next === null) {
      _tail = value;
    }
  };

  const remove = (index) => {
    if (index < 0 || index > size()) {
      throw new RangeError('index out of bound');
    }
    if (index === 0) {
      pop();
      return;
    }
    let prev = getNode(index - 1);

    prev.next = prev.next.next ?? null;

    if (prev.next === null) {
      _tail = prev;
    }
  };

  const loopList = (param) => {
    let temp = _head;
    let array = [];
    while (temp !== null) {
      array.push(temp[param]);

      temp = temp.next;
    }

    return array;
  };

  function pairs() {
    let entries = [];

    let temp = _head;
    while (temp !== null) {
      entries.push([temp.key, temp.value]);
      temp = temp.next;
    }

    return entries;
  }

  return {
    append,
    toString,
    head,
    tail,
    at,
    size,
    contains,
    findIndex,
    prepend,
    pop,
    insertAt,
    remove,
    loopList,
    pairs,
  };
}
