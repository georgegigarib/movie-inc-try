import React, { useEffect, useRef, useState } from "react";
import { MovieRepository } from "@/domain/Movies/repository/MovieRepository";
import { PropsWithChildren } from "react";
import { Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { getSession } from "@/utils/sessionStorage";
import { Movie } from "@/domain/Movies/model/Movie";
import { RateMovieUseCase } from "@/domain/Movies/useCase/RateMovieUseCase";
import { GetRatedMoviesUseCase } from "@/domain/Movies/useCase/GetRatedMoviesUseCase";
import MovieBox from "@/components/moviebox/MovieBox";
import Animated, { useAnimatedRef, useScrollViewOffset } from "react-native-reanimated";
import { GetNowPlayingMoviesUseCase } from "@/domain/Movies/useCase/GetNowPlayingMoviesUseCase";


const WINDOW_WIDTH = Dimensions.get('window').width;

export default function NowPlaying() {
  const movieRepository = new MovieRepository();
  const rateMovieUseCase = new RateMovieUseCase()
  const getRatedMoviesUseCase = new GetRatedMoviesUseCase()
  const getNowPlayingMoviesUseCase = new GetNowPlayingMoviesUseCase()
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setMovie] = useState<Movie | undefined>(undefined);
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<String>('');

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  // useEffect(() => {
  //   movieRepository.get(533535)
  //     .then(movie => {
  //       setMovie(movie);
  //       setLoading(false);
  //       console.log(movie.posterPath);

  //     })
  //     .catch(err => {
  //       console.error(err);
  //       setError('Could not load movies.');
  //       setLoading(false);
  //     });
  // }, []);

  //   useEffect(() => {
  //     getNowPlayingMoviesUseCase.execute()
  //     .then(movies => {
  //       setMovies(movies);
  //       setLoading(false);
  //       // console.log(movie.posterPath);

  //     })
  //     .catch(err => {
  //       console.error(err);
  //       setError('Could not load movies.');
  //       setLoading(false);
  //     });
  // }, []);

  //     useEffect(() => {
  //   movieRepository.getRecommendations(533535)
  //     .then(movies => {
  //       setMovies(movies);
  //       setLoading(false);
  //       // console.log(movie.posterPath);

  //     })
  //     .catch(err => {
  //       console.error(err);
  //       setError('Could not load movies.');
  //       setLoading(false);
  //     });
  // }, []);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const movies = await getRatedMoviesUseCase.execute();
//         setMovies(movies);
//       } catch (err) {
//         console.error(err);
//         setError('Could not load movies.');
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchMovies();
//   }, []);

// console.log(movies.map(movie => movie.title));

//   useEffect(() => {
//     getOrCreateSessionUseCase.execute()
    
//       .then(response => {
//         setLoading(false);
// console.log(response);

//       })
//       .catch(err => {
//         console.error(err);
//         setError('Could not load movies.');
//         setLoading(false);
//       });
//   }, []);

  // useEffect(() => {
  //   rateMovieUseCase.execute(1311550, 5)
  //     .then(() => {
  //       setLoading(false);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //       setError('Could not load movies.');
  //       setLoading(false);
  //     });
  // }, []);

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ThemedText>Loading...</ThemedText>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.container}>
//         <ThemedText>{error}</ThemedText>
//       </View>
//     );
//   }


  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.moviesContainer}
      >
        {movies.map((movie) => (
          <View key={movie.id} style={styles.movieBox}>
            <MovieBox movie={movie} />
          </View>
        ))}
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  moviesContainer: {
    marginTop: 50,
    marginLeft: 5,
    gap: 5
  },
  movieBox: {
    width: 250,
    marginLeft: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    width: 200,
  },
});