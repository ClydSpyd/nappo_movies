export const starRating = input =>
<div className="stars">
  <div className={`star ${input/2 >= 1 && 'solid'}`} />
  <div className={`star ${input/2 >= 2 && 'solid'}`} />
  <div className={`star ${input/2 >= 3 && 'solid'}`} />
  <div className={`star ${input/2 >= 4 && 'solid'}`} />
  <div className={`star ${input/2 >= 5 && 'solid'}`} />
</div>