import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList, TextInput, Alert, ImageBackground } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Filter: undefined;
  Starters: undefined;
  Mains: undefined;
  Desserts: undefined;
  AddRecipe: undefined;
  ManageMenu: undefined; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();


const backgroundImages = {
  starters: require("./assets/backgroundscreens.png"),
  mains: require("./assets/backgroundscreens.png"),
  desserts: require("./assets/backgroundscreens.png"),
};


interface MenuItem {
  id: string;
  name: string;
  course: 'starters' | 'mains' | 'desserts';
  price: number;
}


const initialMenuData: MenuItem[] = [
  // Starters
  { id: '1', name: "Calamari", course: 'starters', price: 85 },
  { id: '2', name: "Tomato Soup", course: 'starters', price: 45 },
  { id: '3', name: "Pumpkin Soup", course: 'starters', price: 50 },
  { id: '4', name: "Garlic Bread", course: 'starters', price: 35 },
  { id: '5', name: "Bruschetta", course: 'starters', price: 65 },
  
  // Mains
  { id: '6', name: "Mac and Cheese", course: 'mains', price: 95 },
  { id: '7', name: "Cottage Pie", course: 'mains', price: 110 },
  { id: '8', name: "Spaghetti Bolognaise", course: 'mains', price: 120 },
  { id: '9', name: "Grilled Chicken", course: 'mains', price: 145 },
  { id: '10', name: "Vegetable Stir Fry", course: 'mains', price: 85 },
  
  // Desserts
  { id: '11', name: "Malva Pudding", course: 'desserts', price: 65 },
  { id: '12', name: "Cheesecake", course: 'desserts', price: 75 },
  { id: '13', name: "Waffles", course: 'desserts', price: 55 },
  { id: '14', name: "Chocolate Mousse", course: 'desserts', price: 60 },
  { id: '15', name: "Fruit Salad", course: 'desserts', price: 45 },
];

// SPLASH SCREEN 
const SplashScreen = ({ navigation }: any) => {
  return (
    <View style={styles.splashContainer}>
      <View style={styles.ombreLayer1} />
      <View style={styles.ombreLayer2} />
      <View style={styles.ombreLayer3} />
      <View style={styles.ombreLayer4} />
      
      <View style={styles.splashContent}>
        <Text style={styles.splashTitle}>lebo eats</Text>
        <Text style={styles.splashSubtitle}>cooking made simple</Text>
        
        <TouchableOpacity
          style={styles.splashButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.splashButtonText}>Let's Get Cooking</Text>
        </TouchableOpacity>
        
        <Text style={styles.splashFooter}>crave it?....lets get it!!</Text>
      </View>
    </View>
  );
};

// HOME SCREEN 
const HomeScreen = ({ navigation }: any) => {
  const [menuItems] = useState<MenuItem[]>(initialMenuData);

  
  const calculateAveragePrice = (course: 'starters' | 'mains' | 'desserts') => {
    const courseItems = menuItems.filter(item => item.course === course);
    if (courseItems.length === 0) return 0;
    
    const total = courseItems.reduce((sum, item) => sum + item.price, 0);
    return Math.round(total / courseItems.length);
  };

  const avgStarters = calculateAveragePrice('starters');
  const avgMains = calculateAveragePrice('mains');
  const avgDesserts = calculateAveragePrice('desserts');

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Complete Menu Overview</Text>
      
      
      <View style={styles.priceSection}>
        <Text style={styles.priceHeader}>Average Prices</Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Starters:</Text>
          <Text style={styles.priceValue}>R{avgStarters}</Text>
        </View>
        
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Mains:</Text>
          <Text style={styles.priceValue}>R{avgMains}</Text>
        </View>
        
        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Desserts:</Text>
          <Text style={styles.priceValue}>R{avgDesserts}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.purpleButton}
        onPress={() => navigation.navigate("Filter")}
      >
        <Text style={styles.buttonText}>View Menu by Course</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.purpleButton}
        onPress={() => navigation.navigate("ManageMenu")} // CHANGED TO NEW SCREEN
      >
        <Text style={styles.buttonText}>Manage Menu Items</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.purpleButton}
        onPress={() => navigation.navigate("AddRecipe")}
      >
        <Text style={styles.buttonText}>Add New Recipe</Text>
      </TouchableOpacity>
    </View>
  );
};

// FILTER SCREEN
const FilterScreen = ({ navigation }: any) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleNavigate = () => {
    if (selectedCategory === "starters") navigation.navigate("Starters");
    else if (selectedCategory === "mains") navigation.navigate("Mains");
    else if (selectedCategory === "desserts") navigation.navigate("Desserts");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Choose a Course</Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select an option..." value="" />
          <Picker.Item label="Starters" value="starters" />
          <Picker.Item label="Mains" value="mains" />
          <Picker.Item label="Desserts" value="desserts" />
        </Picker>
      </View>

      <TouchableOpacity
        style={[
          styles.purpleButton,
          selectedCategory === "" && styles.disabledButton
        ]}
        onPress={handleNavigate}
        disabled={selectedCategory === ""}
      >
        <Text style={styles.buttonText}>Show Options</Text>
      </TouchableOpacity>
    </View>
  );
};

// STARTERS SCREEN 
const StartersScreen = () => {
  const [menuItems] = useState<MenuItem[]>(initialMenuData);
  const starters = menuItems.filter(item => item.course === 'starters');
  
  return (
    <ImageBackground source={backgroundImages.starters} style={styles.container} resizeMode="cover">
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.foodHeaderText}>🍤 Starters</Text>
        <FlatList
          data={starters}
          renderItem={({ item }) => (
            <View style={styles.foodMenuItem}>
              <Text style={styles.foodMenuText}>{item.name}</Text>
              <Text style={styles.priceText}>R{item.price}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ImageBackground>
  );
};

// MAINS SCREEN 
const MainsScreen = () => {
  const [menuItems] = useState<MenuItem[]>(initialMenuData);
  const mains = menuItems.filter(item => item.course === 'mains');
  
  return (
    <ImageBackground source={backgroundImages.mains} style={styles.container} resizeMode="cover">
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.foodHeaderText}>🍝 Mains</Text>
        <FlatList
          data={mains}
          renderItem={({ item }) => (
            <View style={styles.foodMenuItem}>
              <Text style={styles.foodMenuText}>{item.name}</Text>
              <Text style={styles.priceText}>R{item.price}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ImageBackground>
  );
};

// DESSERTS SCREEN
const DessertsScreen = () => {
  const [menuItems] = useState<MenuItem[]>(initialMenuData);
  const desserts = menuItems.filter(item => item.course === 'desserts');
  
  return (
    <ImageBackground source={backgroundImages.desserts} style={styles.container} resizeMode="cover">
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.foodHeaderText}>🍰 Desserts</Text>
        <FlatList
          data={desserts}
          renderItem={({ item }) => (
            <View style={styles.foodMenuItem}>
              <Text style={styles.foodMenuText}>{item.name}</Text>
              <Text style={styles.priceText}>R{item.price}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ImageBackground>
  );
};

// MANAGE MENU SCREEN
const ManageMenuScreen = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuData);
  const [newItemName, setNewItemName] = useState<string>("");
  const [newItemPrice, setNewItemPrice] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<'starters' | 'mains' | 'desserts'>('starters');

  const addMenuItem = () => {
    if (newItemName.trim() && newItemPrice.trim()) {
      const price = parseFloat(newItemPrice);
      if (isNaN(price) || price <= 0) {
        Alert.alert("Error", "Please enter a valid price");
        return;
      }

      const newItem: MenuItem = {
        id: Date.now().toString(),
        name: newItemName.trim(),
        course: selectedCourse,
        price: price,
      };

      setMenuItems([...menuItems, newItem]);
      setNewItemName("");
      setNewItemPrice("");
      Alert.alert("Success!", "Menu item added successfully!");
    } else {
      Alert.alert("Error", "Please fill in all fields");
    }
  };

  const removeMenuItem = (id: string) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Remove", 
          style: "destructive",
          onPress: () => {
            setMenuItems(menuItems.filter(item => item.id !== id));
            Alert.alert("Success!", "Menu item removed successfully!");
          }
        }
      ]
    );
  };

  const getCourseItems = (course: 'starters' | 'mains' | 'desserts') => {
    return menuItems.filter(item => item.course === course);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Manage Menu Items</Text>

      
      <View style={styles.addItemForm}>
        <Text style={styles.formTitle}>Add New Menu Item</Text>
        
        <TextInput
          placeholder="Item name..."
          placeholderTextColor="#999"
          value={newItemName}
          onChangeText={setNewItemName}
          style={styles.input}
        />
        
        <TextInput
          placeholder="Price (e.g., 85)"
          placeholderTextColor="#999"
          value={newItemPrice}
          onChangeText={setNewItemPrice}
          style={styles.input}
          keyboardType="numeric"
        />
        
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedCourse}
            onValueChange={(itemValue) => setSelectedCourse(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Starters" value="starters" />
            <Picker.Item label="Mains" value="mains" />
            <Picker.Item label="Desserts" value="desserts" />
          </Picker>
        </View>

        <TouchableOpacity 
          style={[
            styles.purpleButton, 
            (!newItemName.trim() || !newItemPrice.trim()) && styles.disabledButton
          ]} 
          onPress={addMenuItem}
          disabled={!newItemName.trim() || !newItemPrice.trim()}
        >
          <Text style={styles.buttonText}>Add Menu Item</Text>
        </TouchableOpacity>
      </View>

      
      <View style={styles.menuListSection}>
        <Text style={styles.sectionTitle}>Current Menu Items</Text>
        
        <Text style={styles.courseTitle}>🍤 Starters</Text>
        <FlatList
          data={getCourseItems('starters')}
          style={styles.menuList}
          renderItem={({ item }) => (
            <View style={styles.menuListItem}>
              <View style={styles.menuItemInfo}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={styles.menuItemPrice}>R{item.price}</Text>
              </View>
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => removeMenuItem(item.id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />

        <Text style={styles.courseTitle}>🍝 Mains</Text>
        <FlatList
          data={getCourseItems('mains')}
          style={styles.menuList}
          renderItem={({ item }) => (
            <View style={styles.menuListItem}>
              <View style={styles.menuItemInfo}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={styles.menuItemPrice}>R{item.price}</Text>
              </View>
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => removeMenuItem(item.id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />

        <Text style={styles.courseTitle}>🍰 Desserts</Text>
        <FlatList
          data={getCourseItems('desserts')}
          style={styles.menuList}
          renderItem={({ item }) => (
            <View style={styles.menuListItem}>
              <View style={styles.menuItemInfo}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={styles.menuItemPrice}>R{item.price}</Text>
              </View>
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => removeMenuItem(item.id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

// ADD RECIPE SCREEN 
const AddRecipeScreen = () => {
  const [recipes, setRecipes] = useState<string[]>([
    "Pasta Carbonara",
    "Chocolate Brownie",
  ]);
  const [newRecipe, setNewRecipe] = useState<string>("");

  const addRecipe = () => {
    if (newRecipe.trim()) {
      setRecipes([...recipes, newRecipe]);
      setNewRecipe("");
      Alert.alert("Success!", "Recipe added successfully!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your Recipes</Text>
      
      <FlatList
        data={recipes}
        style={styles.recipeList}
        renderItem={({ item }) => (
          <View style={styles.recipeItem}>
            <Text style={styles.menuText}>📝 {item}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <TextInput
        placeholder="Enter new recipe name..."
        placeholderTextColor="#999"
        value={newRecipe}
        onChangeText={setNewRecipe}
        style={styles.input}
      />
      
      <TouchableOpacity 
        style={[
          styles.purpleButton, 
          !newRecipe.trim() && styles.disabledButton
        ]} 
        onPress={addRecipe}
        disabled={!newRecipe.trim()}
      >
        <Text style={styles.buttonText}>Add Recipe</Text>
      </TouchableOpacity>
    </View>
  );
};

// MAIN APP 
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={{
          headerStyle: { backgroundColor: '#6a0dad' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Filter" component={FilterScreen} />
        <Stack.Screen name="Starters" component={StartersScreen} />
        <Stack.Screen name="Mains" component={MainsScreen} />
        <Stack.Screen name="Desserts" component={DessertsScreen} />
        <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
        <Stack.Screen name="ManageMenu" component={ManageMenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// STYLES SHEET
const styles = StyleSheet.create({
  

  
  priceSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    width: '90%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  priceHeader: {
    color: "#6a0dad",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 10,
  },
  priceLabel: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
  priceValue: {
    color: "#6a0dad",
    fontSize: 18,
    fontWeight: "bold",
  },

  // New Styles for Manage Menu Screen
  addItemForm: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    width: '90%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formTitle: {
    color: "#6a0dad",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  menuListSection: {
    width: '90%',
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#333",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  courseTitle: {
    color: "#6a0dad",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    paddingLeft: 10,
  },
  menuList: {
    width: '100%',
    marginBottom: 10,
  },
  menuListItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
  menuItemPrice: {
    color: "#6a0dad",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 4,
  },
  removeButton: {
    backgroundColor: '#ff4444',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  priceText: {
    color: "#6a0dad",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  },

  // ... (your existing styles remain the same)
  splashContainer: {
    flex: 1,
    position: 'relative',
  },
  ombreLayer1: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#bb8de6ff',
  },
  ombreLayer2: {
    position: 'absolute',
    top: '25%',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#a151c4ff',
  },
  ombreLayer3: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#6A1B9A',
  },
  ombreLayer4: {
    position: 'absolute',
    top: '75%',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#4A148C',
  },
  splashContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    zIndex: 1,
  },
  splashTitle: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  splashSubtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 40,
    fontStyle: 'italic',
  },
  splashButton: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginVertical: 20,
    minWidth: 200,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  splashButtonText: {
    color: "#6a0dad",
    fontSize: 18,
    fontWeight: "bold",
  },
  splashFooter: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    marginTop: 30,
    fontStyle: 'italic',
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  purpleButton: {
    backgroundColor: "#6a0dad",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    minWidth: 200,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerText: {
    color: "#333",
    fontSize: 24,
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "bold",
  },
  pickerContainer: {
    width: "100%",
    borderColor: "#6a0dad",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    height: 50,
  },
  foodHeaderText: {
    color: "#fff",
    fontSize: 28,
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "bold",
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  foodMenuItem: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    width: 250,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  foodMenuText: {
    color: "#333",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    borderColor: "#6a0dad",
    borderWidth: 1,
    borderRadius: 10,
    color: "#333",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  recipeList: {
    width: "100%",
    marginBottom: 20,
  },
  recipeItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    width: 300,
  },
  menuText: {
    color: "#333",
    fontSize: 16,
    textAlign: "center",
  },
});