import React, {useState, useEffect} from 'react';
import {View} from 'react-native';

import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const Post = ({post}) => {
  const [isLiked, setIsLike] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const initNotification = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();

      const token = await messaging().getToken();

      //enregister le token
      await AsyncStorage.setItem('fcm_token', JSON.stringify(token));
      await notifee.requestPermission();
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  React.useEffect(() => {
    initNotification();
  }, []);

  const onDisplayNotification = async (title, body) => {
    try {
      await notifee.displayNotification({
        title: title,
        body: body,
        android: {
          channelId: 'default',
          pressAction: {
            id: 'default',
          },
        },
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  messaging().onMessage(remoteMessage =>
    onDisplayNotification(
      remoteMessage.notification.title,
      remoteMessage.notification.body,
    ),
  );
  messaging().setBackgroundMessageHandler(remoteMessage =>
    onDisplayNotification(
      remoteMessage.notification.title,
      remoteMessage.notification.body,
    ),
  );

  const onLikePressed = () => {
    const amount = isLiked ? -1 : 1;
    setLikesCount(likesCount + amount);
    onDisplayNotification('Liked a post', 'You just liked a post on instagram');

    setIsLike(!isLiked);
  };

  useEffect(() => {
    setLikesCount(post.likes);
  }, []);

  return (
    <View>
      <Header imageUri={post.user.image} name={post.user.name} />
      <Body imageUri={post.image} onLikePressed={onLikePressed} />
      <Footer
        likesCount={likesCount}
        onLikePressed={onLikePressed}
        isLiked={isLiked}
        caption={post.caption}
        postedAt={post.createdAt}
        comments={post.comments}
        name={post.user.name}
        id={post.id}
      />
    </View>
  );
};

export default Post;
