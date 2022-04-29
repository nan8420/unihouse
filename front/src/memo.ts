import {Keyboard} from 'react-native';

const Explain = () => {
  const commetsubmitfun = useCallback(() => {
    ScrollRef.current.scrollToEnd({duration: 10});
    Keyboard.dismis;
  }, []);

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scrollviewcon} ref={ScrollRef}>
        <View style={styles.first}></View>

        {singlePost?.Comments.map(v => (
          <CommentFlat key={v.id} item={v} />
        ))}
      </ScrollView>
      <View style={styles.inputcon}>
        <TextInput
          style={styles.input}
          placeholder="  comment..."
          value={commentinput}
          onChangeText={onChangeCommentinput}></TextInput>
        <Pressable style={styles.send} onPress={commetsubmitfun}>
          <Text style={{color: '#0373fc'}}>post</Text>
        </Pressable>
      </View>
    </View>
  );
};
