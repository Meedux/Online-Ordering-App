import React, {useState, useEffect,} from 'react';
import {Dialogflow_V2} from 'react-native-dialogflow';
import { dialogConfig } from '../app/env';
import {View, Text} from 'react-native';
import {
GiftedChat,
Bubble,
BubbleProps,
Reply,
} from 'react-native-gifted-chat';

const Support = () => {
    const Bot = {
        _id: 4,
        name: 'Mr. Bot',
    };

    const [messages, setMessages] = useState([
        {
          _id: 1,
          text: `Hi! i am your personal assistant from WheyFactory, How can I help You?`,
          createdAt: new Date(),
          user: Bot,
        },
      ]);

    useEffect(() => {
        Dialogflow_V2.setConfiguration(
            dialogConfig.client_email,
          dialogConfig.private_key,
          Dialogflow_V2.LANG_ENGLISH_US,
          dialogConfig.project_id,
        );
    }, []);

    const onSend = (message) => {
        setMessages(previousMessages => {
          return GiftedChat.append(previousMessages, message);
        });
        let msg = message[0].text;
        console.log(message);
        Dialogflow_V2.requestQuery(
          msg,
          result => {
            console.log('result', result);
            handleGoogleResponse(result);
          },
          error => {
            console.log(error);
          },
        );
      };

      const handleGoogleResponse = (result) => {
        let text = result.queryResult.fulfillmentMessages[0].text.text[0];
        sendBotResponse(text);
      };

      

      const sendBotResponse = (text) => {
        let msg = {
            _id: messages.length + 1,
            text,
            createdAt: new Date(),
            user: Bot,
          };
          setMessages(previousMessages => {
            return GiftedChat.append(previousMessages, [msg]);
          });
      };

      const renderBubble = (props) => {
        return (
          <Bubble
            {...props}
            textStyle={{
              right: {color: '#fff', fontSize: 14},
              left: {color: '#fff', fontSize: 14},
            }}
            wrapperStyle={{
              left: {backgroundColor: '#0D1117'},
              right: {backgroundColor: '#0084FF'},
            }}></Bubble>
        );
      };
  return (
    <>
        <View style={{
            backgroundColor: '#0D1117',
            padding: 20,
            marginTop: 30,
        }}>
            <Text style={{
                color: '#fff',
                fontSize: 20,
                textAlign: 'center',
            }}>
                Support Bot
            </Text>
        </View>
        <GiftedChat
        renderBubble={(props) => renderBubble(props)}
        messages={messages}
        onQuickReply={(props) => onQuickReply(props)}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderLoading={() => {
            return (
                <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text>Loading...</Text>
                </View>
            );
        }}
      />
    </>
  )
}

export default Support