import React from "react";
class ClassCom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 2,
    };
  }

  render() {
    return (
      <div>
        <h1>Name = {this.props.name} </h1>
        <h1>Count = {this.state.count}</h1>
        <button
          onClick={() => {
            this.setState({
              count: this.state.count + 1,
            });
          }}
        >
          Counter
        </button>
      </div>
    );
  }
}
export default ClassCom;
