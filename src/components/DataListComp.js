import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import EmptyList from "../screens/EmptyList";
import ContactStyle from "../screens/ContactStyle";
import { RFPercentage } from "react-native-responsive-fontsize";
import { AppButton } from "../screens/AppButton";
const DataListComp = ({
  contacts,
  check_history,
  term,
  emptyText,
  _longPressHandler,
  _pressCall,
  history,
  text,
  isdisable,
  onMoreHandler,
}) => {
  return (
    <>
      {(contacts && contacts.length > 0) || !check_history ? (
        <FlatList
          extraData={term}
          data={term ? contacts.slice(0, 3) : contacts}
          keyExtractor={(item) => item.value.key}
          ListHeaderComponent={() => {

            return (
              <View style={{ paddingTop: 5 }}>
                <Text
                  style={{
                    fontFamily: "BurbankBigCondensedBlack",
                    color: "gray",
                    fontSize: RFPercentage(3),
                    textAlign: "center",
                    letterSpacing: 3,
                  }}
                >
                  {contacts.length > 0
                    ? contacts.length + " اتصالات مطابقة مع " + text
                    : null}
                </Text>
              </View>
            );
          }}
          initialNumToRender={contacts.length}
          renderItem={({ item }) => (

            <ContactStyle
              name={item.value.name}
              onPress={() => _pressCall(item.value.phone)}
              phone={item.value.phone + "  " + " التكرارات " + " " + item.count}
              _longPressHandler={() => _longPressHandler(item.phone)}
            />
          )}
          ListEmptyComponent={<EmptyList title={emptyText} />}
        />
      ) : check_history ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => {
            return (
              <View style={{ paddingVertical: 5 }}>
                <Text
                  style={{
                    fontFamily: "BurbankBigCondensedBlack",
                    color: "gray",
                    fontSize: RFPercentage(3),

                    textAlign: "center",
                    letterSpacing: 3,
                  }}
                >
                  عمليات البحث الأخيرة
                </Text>
              </View>
            );
          }}
          data={history.splice(0, 50)}
          keyExtractor={(item) => (item.key ? item.key : "time")}
          renderItem={({ item }) => {
            return (
              <>
                {item.key ? (
                  <ContactStyle
                    name={item.name}
                    onPress={() => _pressCall(item.phone)}
                    phone={item.phone}
                    _longPressHandler={() => _longPressHandler(item.phone)}
                  />
                ) : null}
              </>
            );
          }}
          ListEmptyComponent={<EmptyList title={emptyText} />}
        />
      ) : null}
      {term && contacts.length > 3 ? (
        <View style={{ marginTop: 10, flexL: 1 }}>
          <AppButton
            disable={isdisable}
            title={
              // "راجع " + (contacts.length - 3) + " المزيد من جهات الاتصال"
              "See " + (contacts.length - 3) + "More contacts"
            }
            onPress={onMoreHandler}
          />
        </View>
      ) : null}
    </>
  );
};

export default DataListComp;

const styles = StyleSheet.create({});
