export default (source: string, destination: string, delay: number) => {
  const response = 50 + Math.floor(Math.random() * 50);
  return new Promise(resolve => setTimeout(() => resolve(response), delay));
};
