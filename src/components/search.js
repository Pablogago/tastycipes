import React from 'react'
import './search.css';


export default class Search extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      query: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({query: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.props.userQuery(this.state.query);
  }

  render() {
    return(
      <div>
      <form className="form-search" onSubmit={this.handleSubmit}>
        <input className="input-search" type="text" placeholder="What you wish for ?" value={this.state.query} onChange={this.handleChange} />
        <button style={{display:"none"}}className="submit-button" type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

