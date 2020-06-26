import React, { useState, useMemo } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    bottom: 15,
    right: 15,
  },
  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 10,
    shadowOpacity: 0.4,
    shadowColor: '#F02A4B',
    // shadowOffset: { height:10 },
  },
  menu: {
    backgroundColor: '#F02A4B',
  },
  secondary: {
    right: 5, //compensate for width difference
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
  },
});

const FloatingButton = () => {
  const [open, setOpen] = useState(false);

  const animation = React.useRef(new Animated.Value(0));
  const toggleMenu = () => {
    const toValue = open ? 0 : 1;

    Animated.spring(animation.current, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();

    setOpen(!open);
  };

  const pinStyle = useMemo(() => {
    return {
      transform: [
        {
          scale: animation.current,
        },
        {
          translateY: animation.current.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -120],
          }),
        },
      ],
    };
  }, []);

  const thumbStyle = useMemo(() => {
    return {
      transform: [
        {
          scale: animation.current,
        },
        {
          translateY: animation.current.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -180],
          }),
        },
      ],
    };
  }, []);

  const heartStyle = useMemo(() => {
    return {
      transform: [
        {
          scale: animation.current,
        },
        {
          translateY: animation.current.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -240],
          }),
        },
      ],
    };
  }, []);

  const rotation = useMemo(() => {
    return {
      transform: [
        {
          rotate: animation.current.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '45deg'],
          }),
        },
      ],
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Animated.View style={[styles.button, styles.secondary, heartStyle]}>
          <Entypo name="heart" size={24} color="#F02A4B" />
        </Animated.View>
      </TouchableOpacity>

      <TouchableOpacity>
        <Animated.View style={[styles.button, styles.secondary, thumbStyle]}>
          <Entypo name="heart" size={24} color="#F02A4B" />
        </Animated.View>
      </TouchableOpacity>

      <TouchableOpacity>
        <Animated.View style={[styles.button, styles.secondary, pinStyle]}>
          <Entypo name="heart" size={24} color="#F02A4B" />
        </Animated.View>
      </TouchableOpacity>

      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Animated.View style={[styles.button, styles.menu, rotation]}>
          <AntDesign name="plus" size={24} color="#fff" />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default FloatingButton;
