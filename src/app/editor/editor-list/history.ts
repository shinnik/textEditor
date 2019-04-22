

class HistoryNode {

  data; next; prev;

  constructor (data: {block_id: string, block_type: string, block_content: string, anchor: number, mutation: string}) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

export class StateHistory {

  currentState; head; tail; current;

  constructor(state) {
    this.currentState = [];
    this.head = null;
    this.tail = null;
    this.current = null;
    this.push(state);
  }

  private applyChanges (data, source) {
    // const changeType = this.determineChangeType(data.id, source);
    const changeType = this.determineChangeType2(data.mutation, source);
    const { anchor, ...block } = data;
    console.log(changeType);
    if (changeType === 'update') {
      const blockToUpdate = this.currentState.filter((obj) => obj.id === data.id)[0];
      console.log('BTU', blockToUpdate);
      const place = this.currentState.indexOf(blockToUpdate);
      const copy = { ...blockToUpdate };
      this.currentState.splice(place, 1);
      copy.content = data.content;
      this.currentState.splice(place, 0, copy);
    } else if (changeType === 'delete') {
      this.currentState.splice(anchor + 1, 1);
    } else if (changeType === 'add') {
      this.currentState.splice(anchor + 1, 0, block);
    }
  }

  private determineChangeType2(mutationType, source) {
    console.log('MUTATION TYPE', mutationType, 'SOURCE', source);
    if (mutationType === 'add' && source === 'undo') {
      return 'delete';
    } else if (mutationType === 'add' && (source === 'redo' || source === 'new')) {
      return 'add';
    } else if (mutationType === 'delete' && source === 'undo') {
      return 'add';
    } else if (mutationType === 'delete' && (source === 'redo' || source === 'new')) {
      return 'delete';
    } else {
      return 'update';
    }
  }

  // private determineChangeType(blockID, source) {
  //   // debugger;
  //   const nodes = this.findNodes(blockID);
  //   // console.log(nodes.length);
  //   const nodesCount = nodes.length || 0;
  //   if (nodesCount > 1) {
  //     return 'update';
  //   } else if (nodesCount === 1 && (source === 'redo' || source === 'new')) {
  //     return 'update';
  //   } else if (nodesCount === 1 && source === 'undo') {
  //     return 'delete';
  //   } else if (nodesCount === 0)  {
  //     return 'add';
  //   }
  // }

  private findNodes(nodeID) {
    let cur = this.current;
    const nodes = [];
    // debugger;
    // console.log(nodeID);
    if (cur) {
      while (cur) {
        if (cur.data.id === nodeID) {
          nodes.push(cur);
        }
        cur = cur.prev;
      }
    }
    // console.log('NODES', nodes);
    return nodes;
  }

  private remove(node) {
    if ((node === this.head) && (node === this.tail)) {
      this.head = null;
      this.tail = null;
    } else if (node === this.head) {
      this.head.prev.next = null;
      this.head = this.head.prev;
    } else if (node === this.tail) {
      this.tail.next.prev = null;
      this.tail = this.tail.next;
    } else {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }
  }

  private removeDeprecatedNodes() {
    while (this.head !== this.current) {
      this.remove(this.head);
    }
  }

  update(id: string, content: string, mutation: string) {
    // console.log(id, this.currentState);
    const blockToUpdate = this.currentState.filter((block) => block.id === id)[0];
    const copy = {...blockToUpdate, content: content, mutation: mutation};
    // console.log('COPY', copy);
    this.push(copy);
  }

  redo () {
    if (this.current.next) {
      // apply next node
      this.applyChanges(this.current.next.data, 'redo');
      this.current = this.current.next;
    }
  }

  undo () {
    console.log('UNDO', this.current);
    if (this.current.prev) {
      this.applyChanges(this.current.data, 'undo');
      this.current = this.current.prev;
    }
  }

  push (data) {
    const node =  new HistoryNode(data);
    // this.removeDeprecatedNodes();
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.head;
      this.head.next = node;
      this.head = node;
    }
    this.applyChanges(data, 'new');
    this.current = this.head;
  }


}
