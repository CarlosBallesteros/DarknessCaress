import React, { Component, PropTypes } from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import Button from './Button';

import { createNewBoard, searchNewGame } from '../../actions/Game/actions';

export default class GameSolicitationNotification extends Component {
  componentWillMount() {
    const { notification } = this.props;
    const userId = notification.userId;
    const firebaseRef = new Firebase(`https://darkness-caress.firebaseio.com/users/${userId}`);//FIXME: Should use the state's one.
    firebaseRef.once("value", snapshot => {
      this.setState({
        opponent: snapshot.val()
      });
    });
  }

  handleAccept() {
    const myUserId = this.props.auth.id;
    const opponentId = this.props.notification.userId;
    const { notificationId } = this.props;
    createNewBoard(myUserId, opponentId);
    this.props.removeNotification(notificationId);
    this.props.navigate('game');
  }

  handleCancel() {
    const opponentId = this.props.notification.userId;
    const { notificationId } = this.props;
    searchNewGame(opponentId);
    this.props.removeNotification(notificationId);
  }

  render(){
    const avatarImg = 'https://edgecast.wizard101.com/image/free/Wizard/C/Duel/pvpicon.gif';
    const { notification } = this.props;
    const opponent = this.state ? this.state.opponent : {};
    const { username,  level, mmr } = opponent;
    const textUsername = "You have recived a game propousal from: " + username;
    const textLevel = "Level: " + level;
    const textMMR = "MMR: " + mmr;
    return(
      <Card>
        <CardHeader
          avatar= {avatarImg}
          title="Match Proposal"
          subtitle={"From "+username}
          actAsExpander={true}
          showExpandableButton={true}
          />
        <CardText expandable={true}>
          <p>{textUsername}</p>
          <ul>
            <li>
              {textLevel}
            </li>
            <li>
              {textMMR}
            </li>
          </ul>
          <div>
            <Button text="Accept" positive={true} callback={ () => this.handleAccept() }/>
            <Button text="Cancel" positive={false} callback={ () => this.handleCancel() }/>
          </div>
        </CardText>
      </Card>
    );
  }
}

GameSolicitationNotification.propTypes = {
  notification: PropTypes.object
}