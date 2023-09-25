// console.log('by christ-offert');

class Input {
  constructor() {
    this.inputs = []
  }

  add() {

    window.addEventListener(
      'keydown',
      (e) => {
        this.inputs.push(e.keyCode);
        let res = this.filter();

        if (res) {
          e.preventDefault();
        } 

        this.remove();
      }
    )

    window.addEventListener(
      'contextmenu',
      (e) => {
        e.preventDefault();
      }
    )

  }
  
  remove() {

    window.addEventListener(
      'keyup',
      (e) => {
        let thing = this.inputs.indexOf(e.keyCode);
        if (thing != -1) {
          this.inputs.splice(thing, 1);
        }
      }
    )

  }

  filter() {
    let res = false;

    if (this.inputs.includes(115) || 
        this.inputs.includes(116) ||
        this.inputs.includes(123) ||
        (this.inputs.includes(17) && this.inputs.includes(83)) ||
        (this.inputs.includes(17) && this.inputs.includes(16) && this.inputs.includes(77)) ||
        (this.inputs.includes(17) && this.inputs.includes(16) && this.inputs.includes(67)) ||
        (this.inputs.includes(17) && this.inputs.includes(16) && this.inputs.includes(83)) ||
        (this.inputs.includes(17) && this.inputs.includes(16) && this.inputs.includes(73))
    ) {
      res = true;
    }

    return res;
  }

}

const input = new Input();
input.add();

