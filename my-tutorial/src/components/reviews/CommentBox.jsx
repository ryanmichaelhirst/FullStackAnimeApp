import React, { Component } from 'react'

export default class CommentBox extends Component {
  state = {
    review: ""
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.review)
    this.setState({ review: "" })
  }
  
  render() {
    return (
      <div className="left-aligned" style={{ marginTop: 15 }}>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.review} 
            onChange={e => this.setState({ review: e.target.value })}
            className="animated-input comment-input"
            placeholder="What're your thoughts?"
          />
          
          <input type="submit" className="comment-button" value="Post Review" />
        </form>
      </div>
    )
  }
}