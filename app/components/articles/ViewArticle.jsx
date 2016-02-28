import React from 'react';
import ArticleStore from './../../stores/ArticleStore.jsx';
import {
  Grid,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import auth from './../../services/Authentication';
import ViewArticleChild from './ViewArticleChild.jsx';

function getArticle() {
  return { article: ArticleStore.getArticle() };
}

class ViewArticle extends React.Component {
  constructor(props, context) {
    super(props, context);
    ArticleStore.fetchArticle(props.params.id);
    this.state = {};
    this.state.article = {};
    this.state.loggedIn = auth.loggedIn();
    this._onChange = this._onChange.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
  }

  componentWillMount() {
    ArticleStore.onChange(this._onChange);
  }

  componentWillUnmount() {
    ArticleStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    this.setState(getArticle());
  }

  deleteArticle(articleId) {
    ArticleStore.deleteArticle(articleId, this.props.history);
  }

  render() {
    return (
    <ViewArticleChild loggedIn={this.state.loggedIn} articleId= {this.props.params.id}
       article = {this.state.article} deleteArticle = {this.deleteArticle} />
    );
  }
}

export default ViewArticle;
