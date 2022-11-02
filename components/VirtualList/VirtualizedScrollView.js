import React from 'react';
import { FlatList } from 'react-native';

const VirtualizedScrollView = props => {
  return (
    <FlatList
      {...props}
      data={[]}
      keyExtractor={(e, i) => 'dom' + i.toString()}
      ListEmptyComponent={null}
      renderItem={null}
      ListHeaderComponent={() => (
        <>{props.children}</>
      )}
    />
  );
};

export default VirtualizedScrollView;


{/* <View
style={{
  width: "100%",
  height: "50%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
}}
>
<View
  style={{
    width: "50%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  }}
>
  <View
    style={{
      height: shapeSeat,
      width: shapeSeat,
      backgroundColor: "blue",
    }}
  ></View>
  <Text>Empty</Text>
</View>
<View
  style={{
    width: "50%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "red",
  }}
>
  <View
    style={{
      height: shapeSeat,
      width: shapeSeat,
      backgroundColor: "green",
    }}
  ></View>
  <Text>Selected</Text>
</View>
</View>
<View
style={{
  width: "100%",
  height: "50%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}}
>
<View
  style={{
    width: "50%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  }}
>
  <View
    style={{
      height: shapeSeat,
      width: shapeSeat,
      backgroundColor: "black",
    }}
  ></View>
  <Text>Selecting</Text>
</View>
<View
  style={{
    width: "50%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "red",
  }}
>
  <View
    style={{
      height: shapeSeat,
      width: shapeSeat,
      backgroundColor: "yellow",
    }}
  ></View>
  <Text>Booked</Text>
</View>
</View> */}