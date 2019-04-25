export default function update () {
  console.log('STATE BEFORE UPDATE', JSON.parse(JSON.stringify(this)));
  // this.state.map((block) => {
  //   if (block.id === this.id) {
  //     return {
  //       id: block.id,
  //       content: this.content,
  //       type: block.type
  //     };
  //   }
  //   return block;
  // });
  const bl = this.state.find((block) => block.id === this.id);
  const index = this.state.indexOf(bl);
  bl.content = this.content;
  this.state.splice(index, 1);
  console.log(bl);
  this.state.splice(index, 0, bl);
  console.log('STATE AFTER UPDATE', this);
}
