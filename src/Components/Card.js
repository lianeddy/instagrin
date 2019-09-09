import React, { Component } from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Left, Body} from 'native-base';
export default class CardImage extends Component {
  render() {
    return (
        <Card>
        <CardItem>
          <Left>
            <Thumbnail source={{uri: this.props.userPhoto}} />
            <Body>
              <Text>{this.props.username}</Text>
              <Text note>Instagrin User</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image source={{uri: this.props.imageURL}} style={{height: 500, width: null, flex: 1}}/>
        </CardItem>
        <CardItem>
              <Text>{this.props.caption}</Text>
        </CardItem>
      </Card>
    );
  }
}