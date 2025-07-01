import { useState } from "react";
import { View, Dimensions, StyleSheet, ActivityIndicator } from "react-native";
import { Box, Text } from "@gluestack-ui/themed";
import { colors } from "../../constants/colors";
import { moderateScale } from "../../utils/responsiveSize";

import LinearGradient from "react-native-linear-gradient";


const PAGE_WIDTH = Dimensions.get('window').width;

import { TouchableOpacity, ScrollView } from "react-native";
import useGetAllTopRanks from "../../hooks/home/get-all-top-ranks";


const ParallaxSlider = () => {
  const [activeTab, setActiveTab] = useState("Earners");
  const { width } = Dimensions.get("window"); // Get screen width
  const { data, isLoading } = useGetAllTopRanks()

  return (
    isLoading ?
      <Box w={'100%'} h={moderateScale(110)} alignContent={'center'} justifyContent={'center'}>
        <ActivityIndicator size="large" color={colors.gray6} />
      </Box>
      : <LinearGradient colors={["black", "black",]} style={styles1.container}>
        {/* Tabs */}
        <View style={styles1.tabContainer}>
          {["Earners", "Referrers"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles1.tab, activeTab === tab && styles1.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles1.tabText, activeTab === tab && styles1.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Table */}
        <ScrollView horizontal style={{ flex: 1, width: "100%" }}>
          <View style={[styles1.table, { width: width - 32 }]}>
            {/* Table Header */}
            <View style={[styles1.row, styles1.header]}>
              <Text style={[styles1.cell, styles1.headerText]}>Rank</Text>
              <Text style={[styles1.cell, styles1.headerText]}>Name</Text>
              <Text style={[styles1.cell, styles1.headerText]}>{activeTab === "Earners" ? "Winning" : "Earn"}</Text>
            </View>

            {/* Table Rows */}
            {activeTab === "Earners" ? data?.data?.data?.topUserranks?.map((item, index) => (
              <View key={index} style={[styles1.row, index % 2 === 0 ? styles1.rowEven : styles1.rowOdd]}>
                <Text style={styles1.cell}>{item.rank}</Text>
                <Text style={styles1.cell}>{item.userDetail.name}</Text>
                <Text style={styles1.cell}>Rs {item.totalWiningAmount.toFixed(2)}</Text>
              </View>
            )) : data?.data?.data?.topReferalUserRanks?.map((item, index) => (
              <View key={index} style={[styles1.row, index % 2 === 0 ? styles1.rowEven : styles1.rowOdd]}>
                <Text style={styles1.cell}>{item.rank}</Text>
                <Text style={styles1.cell}>{item.userDetail.name}</Text>
                <Text style={styles1.cell}>Rs {item.totalEarningAmount.toFixed(2)}</Text>
              </View>
            ))}

          </View>
        </ScrollView>
      </LinearGradient>
  );
};

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: "100%",
  },
  tabContainer: { flexDirection: "row", marginBottom: 10 },
  tab: { flex: 1, padding: 12, alignItems: "center", borderBottomWidth: 2, borderBottomColor: "#ccc" },
  activeTab: { borderBottomColor: colors.gold },
  tabText: { fontSize: 16, color: "white" },
  activeTabText: { fontWeight: "bold", color:colors.gold },
  table: { width: "100%" },
  row: { flexDirection: "row", paddingVertical: 10, borderBottomWidth: 0.2, borderBottomColor: "white" },
  header: { backgroundColor: "black" },
  headerText: { fontWeight: "bold", textAlign: "center", color: "white" },
  cell: { flex: 1, textAlign: "center", fontSize: 14, padding: 5, color: "white" },
  // rowEven: { backgroundColor: "#00008B" },
  rowOdd: { backgroundColor: "black" },
});




export default ParallaxSlider;


