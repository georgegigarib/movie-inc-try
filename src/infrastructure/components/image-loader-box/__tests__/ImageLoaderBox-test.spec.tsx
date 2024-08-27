import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import ImageWithLoader from '@/src/infrastructure/components/image-loader-box/ImageLoaderBox';

jest.useFakeTimers();

describe('ImageWithLoader', () => {
  it('shows loading indicator initially', () => {
    const { getByTestId, toJSON } = render(
      <ImageWithLoader source={{ uri: 'https://example.com/image.jpg' }} testID="image-loader" />
    );
    expect(getByTestId('image-loader')).toBeTruthy();
    expect(getByTestId('loading-container')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('shows error message if loading times out', async () => {
    const { getByTestId, toJSON } = render(
      <ImageWithLoader source={{ uri: 'https://example.com/image.jpg' }} testID="image-loader" />
    );

    act(() => {
      jest.advanceTimersByTime(15000);
    });

    await waitFor(() => {
      expect(getByTestId('image-loader')).toBeTruthy();
      expect(getByTestId('error-container')).toBeTruthy();
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('shows image and hides loading indicator when image loads', async () => {
    const { getByTestId, queryByTestId, toJSON } = render(
      <ImageWithLoader source={{ uri: 'https://example.com/image.jpg' }} testID="image-loader" />
    );

    act(() => {
      const image = getByTestId('image-loader-image');
      fireEvent(image, 'load');
      jest.advanceTimersByTime(700);
    });

    await waitFor(() => {
      expect(queryByTestId('loading-container')).toBeNull();
      expect(getByTestId('image-loader-image')).toBeTruthy();
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it('shows error message if image fails to load', async () => {
    const { getByTestId, queryByTestId, toJSON } = render(
      <ImageWithLoader source={{ uri: 'https://example.com/image.jpg' }} testID="image-loader" />
    );

    act(() => {
      const image = getByTestId('image-loader-image');
      fireEvent(image, 'error');
    });

    await waitFor(() => {
      expect(queryByTestId('loading-container')).toBeNull();
      expect(getByTestId('error-container')).toBeTruthy();
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
