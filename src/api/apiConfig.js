const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '301e5d6282960fb7173f92c0f8cae939',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig