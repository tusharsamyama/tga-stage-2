/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class NewsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { upvote: false, hidden: false };

    this.upvote = this.upvote.bind(this);
    this.hide = this.hide.bind(this);
  }

  upvote() {
    const { created_at_i } = this.props.data;
    localStorage.setItem(created_at_i.toString(),'show');
    this.setState({ upvote: true });
  }

  hide() {
    const { created_at_i } = this.props.data;
    localStorage.setItem(created_at_i.toString(),'hide');
    this.setState({ hide: true });
  }

  render() {
    const { title, num_comments, points, created_at, author, url, created_at_i} = this.props.data;
    let votes = points;
    let visible = title && title.length;
    const domain = url && url.split('/')[2];
    let localVal = localStorage.getItem(created_at_i.toString());
    if (localVal) {
      votes = points+1;
      if(localVal === 'hide') {
        visible = false;
      }
    }
    return ( visible &&
      <div className={`news-item ${this.props.isOdd ? 'odd' : ''}`}>
        <div className="comment-count">{num_comments || 0}</div>
        <div className="vote-count">
          {votes || 0}
          <span className={localVal?'upvoted':''} onClick={this.upvote}><a href="#">▲</a></span>
        </div>
        <div className="details">
          <div className="title"> {title} </div>
          <div className="sub-details">
            <div> ({domain}) </div>
            <div class="author"> by {author} </div>
            <div> { moment(created_at).fromNow() }</div>
            <a href="#" className="hide-link" onClick={this.hide}>[ hide ]</a>
          </div>
        </div>
      </div>
    );
  }
}

NewsItem.propTypes = {
  data: PropTypes.object,
  isOdd: PropTypes.bool
};

export default NewsItem;

