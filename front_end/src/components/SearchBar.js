import React, { Component } from "react";

class Searchbar extends Component{

  constructor(props){
    super(props);
    this.state = {
      "query" : ""
    }
  }

  onInputChange(query) {
    this.setState({ query });
    this.props.onSearchTermChange(query);
  }

  render() {
    return (
      <div className="search-bar">
        <input
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)}
        />
      </div>
    );
  }

}

export default Searchbar;
