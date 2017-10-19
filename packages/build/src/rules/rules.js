function getRule(matcher, ...loaders) {
  return {
    test: matcher,
    use: loaders
  };
}
