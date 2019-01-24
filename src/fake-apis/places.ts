export default (location: string, delay: number) => {
  const createPlace = () =>
    Math.random()
      .toString(36)
      .substring(7);

  const response: {
    name: string;
    link: string;
  }[] = [];
  for (let i = 0; i < 5; ++i) {
    response.push({
      link: '#',
      name: createPlace(),
    });
  }
  return new Promise(resolve => setTimeout(() => resolve(response), delay));
};
