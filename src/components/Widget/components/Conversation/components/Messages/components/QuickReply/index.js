import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { PROP_TYPES } from 'constants';
import { insertUserMessage, setQuickReply } from 'actions';

import './styles.scss';

class QuickReply extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  getReplies(replies) {
    let i = 0;
    return replies.map(reply => <li key={i += 1} data-payload={reply.payload}>{reply.title}</li>);
  }

  handleClick(event) {
    const reply = event.target.dataset.payload;
    const title = event.target.textContent;
    const id = this.props.id;
    this.props.chooseReply(reply, title, id);
  }


  render() {
    const reply = this.props.chosenReply(this.props.id);
    if (reply) {
      return (
        <div className={this.props.message.get('sender')}>
          <div className="message-text">{reply}</div>
        </div>);
    }
    return (
      <div className={this.props.message.get('sender')}>
        <div className="message-text">
          <ul role="button" onClick={this.handleClick}>{this.getReplies(this.props.message.get('replies'))}</ul>
        </div>
      </div>);
  }
  }

QuickReply.propTypes = {
  message: PROP_TYPES.QUICK_REPLY
};

const mapStateToProps = state => ({
  chosenReply: id => state.messages.get(id).get('chosenReply')
});

const mapDispatchToProps = dispatch => ({
  chooseReply: (payload, title, id) => {
    dispatch(setQuickReply(id, title));
    dispatch(insertUserMessage(id + 1, payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(QuickReply);
