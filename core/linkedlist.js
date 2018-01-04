
class LinkedList {

  // _______________________________________________________ constructor
  // -

  /**
   * Linked List
   * @constructor
   * @param {*} values - List datas
   */
  constructor(...values) {

    this._head = null;
    this._tail = null;
    this._length = 0;

    var len = this._length = values.length;
    var head = null;
    var newNode;
    var i = 0;

    // Equivalent to Array(len)
    if (len === 1) {
      len = values[0];
      head = this._tail = newNode = new LinkedListNode();
      for (i = 1; i < len; ++i) {
        newNode = new LinkedListNode();
        newNode.next = head;
        head.prev = newNode;
        head = newNode;
      }
    }
    // Equivalent to Array(value0, value1, ..., valueN)
    else if (len > 1) {
      i = len - 1;
      head = this._tail = newNode = new LinkedListNode(values[i--]);
      for (; i >= 0; --i) {
        newNode = new LinkedListNode(values[i]);
        newNode.next = head;
        head.prev = newNode;
        head = newNode;
      }
    }

    this._head = head;
  }

  // _______________________________________________________ public
  // -

  /**
   * Get the list head
   */
  get head() { return this._head; }

  /**
   * Get the list tail
   */
  get tail() { return this._tail; }

  /**
   * Get the list length
   */
  get length() { return this._length; }


  /**
   * Appends new elements to the list, and returns the new length of the list.
   * @param {*} values - Elements to insert at the end of the LinkedList.
   */
  push(...args) {

    var numArgs = args.length,
      i = -1,
      arg,
      newNode;

    while (++i < numArgs) {

      arg = args[i];
      newNode = new LinkedListNode(arg);
      newNode.prev = this._tail;

      if (this._tail) {
        this._tail.next = newNode;
      }
      else {
        this._head = newNode;
      }
      this._tail = newNode;
    }
    const array = [];
    array.push();
    this._length += numArgs;
  }

  /**
   * Remove the first element of the list and return it
   */
  shift() {
    if (this._head) {
      const ret   = this._head.data;
      this._head  = this._head.next;
      --this._length;
      this._head === null && (this._tail = null);
      return ret;
    }
    else {
      return undefined;
    }
  }

  /**
   * Remove the last element of the list and return it
   */
  pop() {
    if (this._tail) {
      var ret     = this._tail.data;
      this._tail  = this._tail.prev;
      this._tail.next = null;
      --this._length;
      this._tail === null && (this._head = null);
      return ret;
    }
    else {
      return undefined;
    }
  }

  /**
   * Inserts new elements at the start of an array.
   * @param {*} values - Elements to insert at the start of the LinkedList.
   */
  unshift(...args) {

    var numArgs = args.length,
      i = -1,
      arg,
      newNode;

    while (++i < numArgs) {

      arg = args[i];
      newNode = new LinkedListNode(arg);
      newNode.next = this._head;

      if (this._head) {
        this._head.prev = newNode;
      }
      else {
        this._tail = newNode;
      }
      this._head = newNode;
    }

    this._length += numArgs;

  }

}


class LinkedListNode {

  constructor(data = null) {
    this.next = null;
    this.prev = null;
    this.data = data;
  }
}

export default LinkedList;