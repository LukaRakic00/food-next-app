import MealItem from './meal-item';
import classes from './meals-grid.module.css';

interface Meal {
  id: string;
  title: string;
  slug: string;
  image: string;
  summary: string;
  creator: string;
}

interface MealsGridProps {
  meals: Meal[];
}

export default function MealsGrid({ meals }: MealsGridProps) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          {/* Ovde možete dodati dodatni sadržaj za svaku stavku obroka */
            <MealItem {...meal} />
          }
        </li>
      ))}
    </ul>
  );
}
