# Movie Details App

This project is a mobile application developed with **React Native** using **Expo**. The app allows users to view movie details such as the poster, user ratings, actors, and recommended movies. Additionally, users can rate a movie and/or add it to their favorites list.

## Setup

1. **Install dependencies**:

   ```bash
   npm install
   ```

   
2. **Configure environment variables**:

   Create a .env file based on env.example. You will need an API key from [The Movie Database (TMDb)](https://www.themoviedb.org/).

3. **Download Expo Go**:

   Get the Expo Go app on your device from [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) or [Apple App Store](https://apps.apple.com/app/expo-go/id982107779).
   
4. **Run the project**:

   ```bash
   npm start
   ```

5. Scan the QR code in the terminal with Expo Go.

# done!


# Running Tests

1. **Run the project tests with coverage**:

   ```bash
   npm test -- --coverage
   ```

*You can see the coverage by opening index.html on ./coverage

2. **Run the project tests with no coverage**:

   ```bash
   npm test
   ```

# Visual demo
#### Note: These demo gifs are recorded with dark mode on, the app goes white if dark mode is off :-)

| **See what's playing now, details and recommended movies** | **Rate movie**                               | **Add to favorites**                         |
|------------------------------------------------------------|----------------------------------------------|----------------------------------------------|
| <div align="center"><img src="./public/movie-details.gif" width="220" height="450"></div> | <div align="center"><img src="./public/rate-movie.gif" width="220" height="450"></div> | <div align="center"><img src="./public/add-to-favorites.gif" width="220" height="450"></div> |

# Making process

| **Vertical scrolling (didn't like that too much)** | **Changed to horizontal scrolling**  | **Details view**                             |
|----------------------------------------------------------------------|----------------------------------------------|----------------------------------------------|
| <div align="center"><img src="./public/developing-1.gif" width="220" height="450"></div> | <div align="center"><img src="./public/developing.PNG" width="220" height="450"></div> | <div align="center"><img src="./public/developing-2.gif" width="220" height="450"></div> |
