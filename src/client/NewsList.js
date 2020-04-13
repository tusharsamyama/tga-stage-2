/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import PropTypes from 'prop-types';
import NewsItem from './NewsItem';

class NewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPage:1, list: [], count: props.count };

    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
      fetch(`https://hn.algolia.com/api/v1/search?page=${this.state.currentPage}`)
      .then(res => res.json())
      .then(data => {
          this.setState({
              list: data.hits
          })
      });
  }

  loadMore() {
      const newPage = this.state.currentPage + 1;
    fetch(`https://hn.algolia.com/api/v1/search?page=${newPage}`)
    .then(res => res.json())
    .then(data => {
        this.setState({
            list: data.hits,
            currentPage: newPage
        })
    });
  }

  render() {
    let isOdd = false;
    return (
      <div>
          <div className="header">
            Header ..
          </div>
          <div className="hn-list">
            {
                this.state.list.map((item, index) => {
                    isOdd = !isOdd;
                    return <NewsItem data={item} isOdd={isOdd} />
                })
            }
          </div>
        <div className="bottom">
            <button className="load-more" onClick={this.loadMore}>More</button>
        </div>
      </div>
    );
  }
}

export default NewsList;

