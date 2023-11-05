import { Component } from 'react';
import { Statistics } from 'components/Statistics/Statistics';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions';
import { Notification } from 'components/Notification/Notification';

import { Container, Wrapper } from './Feedback.style';

export class Feedback extends Component {
  state = { good: 0, neutral: 0, bad: 0 };

  handleLeaveFeedback = feedbackType => {
    this.setState(prevState => ({
      [feedbackType]: prevState[feedbackType] + 1,
    }));
  };

  countTotalFeedback = () => {
    return this.state.good + this.state.neutral + this.state.bad;
  };

  countPositiveFeedbackPercentage = () => {
    const total = this.countTotalFeedback();
    const positive = this.state.good;
    if (total === 0) {
      return 0;
    }
    return Math.round((positive / total) * 100);
  };

  render() {
    const options = Object.keys(this.state);
    const total = this.countTotalFeedback();
    return (
      <>
        <Container>
          <Wrapper>
            <h2>Please leave feedback</h2>
            <FeedbackOptions
              options={options}
              onLeaveFeedback={this.handleLeaveFeedback}
            ></FeedbackOptions>
          </Wrapper>
          <Wrapper>
            <h2>Statistics</h2>
            {total === 0 ? (
              <Notification message={'There is no feedback'} />
            ) : (
              <Statistics
                good={this.state.good}
                neutral={this.state.neutral}
                bad={this.state.bad}
                total={this.countTotalFeedback()}
                positivePercentage={this.countPositiveFeedbackPercentage()}
              />
            )}
          </Wrapper>
        </Container>
      </>
    );
  }
}
