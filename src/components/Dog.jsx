export const Dog = ({ dog }) => {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <img src={dog.url} width="480" alt="dog" />
      <div>
        <p>Name: {dog.breeds[0].name}</p>
        <p> Breed for: {dog.breeds[0].bred_for}</p>
        <p> Temperament: {dog.breeds[0].temperament} </p>
      </div>
    </div>
  );
};
