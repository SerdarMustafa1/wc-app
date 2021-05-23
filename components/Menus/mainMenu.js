import React, { memo, useContext } from "react";

import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Title, Button } from "react-native-paper";
import mainContext from "../../context/mainContext";
import Firebase from "../../Firebase";
import loc from "../../utils/localization";

const ActionMenu = () => {
  const { currentUser } = Firebase.auth();
  const { inHome } = useContext(mainContext);
  const { signOutUser } = useContext(mainContext);

  let _menu = null;

  const setMenuRef = (ref) => {
    _menu = ref;
  };

  const hideMenu = () => {
    _menu.hide();
  };

  const showMenu = () => {
    _menu.show();
  };

  const fullName = currentUser?.displayName;
  const firstName = fullName?.split(" ")[0];

  return (
    <View
      style={{
        width: 400,
        padding: 10,
        borderRadius: 10,
        // backgroundColor: "green",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <Menu
        ref={setMenuRef}
        button={
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Title>Hi, {firstName ? firstName : "User"}</Title>
            <TouchableOpacity onPress={showMenu}>
              <Image
                style={{
                  marginHorizontal: 10,
                  height: 40,
                  width: 40,
                  borderRadius: 30,
                }}
                source={{
                  uri: currentUser.photoURL,
                }}
              />
            </TouchableOpacity>
          </View>
        }
      >
        <MenuItem onPress={() => inHome()}>{loc.t("theme")}</MenuItem>
        <MenuDivider />
        <MenuItem onPress={() => signOutUser()}>
          <Text style={{ fontWeight: "bold" }}>{loc.t("signout")}</Text>
        </MenuItem>
        <MenuItem onPress={hideMenu} disabled>
          Menu item 3
        </MenuItem>
      </Menu>
    </View>
  );
};

export default memo(ActionMenu);
